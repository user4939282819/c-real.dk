import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

await page.mouse.wheel(0, 750);
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/before-click.png` });

const before = await page.evaluate(() => {
  const v = document.querySelector('video[src*="CHS-lang"]');
  return v ? { muted: v.muted, paused: v.paused, currentTime: v.currentTime } : 'NOT FOUND';
});
console.log('testimonial video BEFORE click:', JSON.stringify(before));

await page.getByRole('button', { name: 'Se filmen med lyd' }).click();
await page.waitForTimeout(1200);

const after = await page.evaluate(() => {
  const v = document.querySelector('video[src*="CHS-lang"]');
  return v ? { muted: v.muted, paused: v.paused, currentTime: v.currentTime, volume: v.volume } : 'NOT FOUND';
});
console.log('testimonial video AFTER click (expect muted:false, paused:false):', JSON.stringify(after));
await page.screenshot({ path: `${OUT}/after-click.png` });

await browser.close();
