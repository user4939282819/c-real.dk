import { chromium, devices } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['Pixel 7'] });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(4000);

const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let i = 1; i <= 30; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), (h / 30) * i);
  await page.waitForTimeout(260);
}
await page.waitForTimeout(1500);

const rows = await page.evaluate(() =>
  Array.from(document.querySelectorAll('img'))
    .filter((i) => i.complete && i.naturalWidth > 0 && i.getBoundingClientRect().width > 80)
    .map((i) => {
      const r = i.getBoundingClientRect();
      const srcAR = i.naturalWidth / i.naturalHeight;
      const boxAR = r.width / r.height;
      // With object-cover, the fraction of the source actually visible.
      const visible = srcAR > boxAR ? boxAR / srcAR : srcAR / boxAR;
      return {
        file: i.currentSrc.split('/').pop(),
        src: `${i.naturalWidth}x${i.naturalHeight}`,
        box: `${Math.round(r.width)}x${Math.round(r.height)}`,
        srcAR: +srcAR.toFixed(2),
        boxAR: +boxAR.toFixed(2),
        keptPct: Math.round(visible * 100),
      };
    })
    .sort((a, b) => a.keptPct - b.keptPct)
);
const seen = new Set();
console.log('MOBILE crop audit (how much of each photo survives object-cover):');
for (const r of rows) {
  if (seen.has(r.file)) continue;
  seen.add(r.file);
  const flag = r.keptPct < 60 ? '  <-- SEVERE CROP' : '';
  console.log(`  ${String(r.keptPct).padStart(3)}%  ${r.file.padEnd(28)} src ${r.src.padEnd(10)} box ${r.box.padEnd(9)}${flag}`);
}
await browser.close();
