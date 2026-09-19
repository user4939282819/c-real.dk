import { chromium, devices } from 'playwright';

async function run(label, opts) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(4000);

  // Scroll the whole page slowly enough that every observer gets a chance.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y <= h; y += Math.round(vh * 0.5)) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(260);
  }
  await page.waitForTimeout(1200);

  // Anything still transparent, or an image that never loaded.
  const bad = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('section, section *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) return;
      const op = +getComputedStyle(el).opacity;
      if (op < 0.99) {
        const sec = el.closest('section');
        out.push({ kind: 'transparent', op: +op.toFixed(2), sec: sec?.id || '?', tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 44) });
      }
    });
    document.querySelectorAll('img').forEach((i) => {
      if (i.getBoundingClientRect().width > 60 && (!i.complete || i.naturalWidth === 0)) {
        out.push({ kind: 'image-not-loaded', file: (i.currentSrc || i.src).split('/').pop(), sec: i.closest('section')?.id || '?' });
      }
    });
    return out;
  });
  console.log(`\n=== ${label} ===`);
  console.log(bad.length ? JSON.stringify(bad, null, 1) : 'all sections revealed, all images loaded');
  await browser.close();
}

await run('MOBILE (Pixel 7)', { ...devices['Pixel 7'] });
await run('DESKTOP 1440', { viewport: { width: 1440, height: 900 } });
