import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

await page.locator('#team').scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/team-arrows-desktop.png` });

// Confirm arrow positions are vertically centred on the portraits, not buried below the text block.
const rects = await page.evaluate(() => {
  const region = document.querySelector('#team [role="region"]');
  const prev = region.querySelector('button[aria-label="Forrige"]');
  const next = region.querySelector('button[aria-label="Næste"]');
  const img = region.querySelector('img');
  return {
    prev: prev.getBoundingClientRect(),
    next: next.getBoundingClientRect(),
    imgCenterY: img.getBoundingClientRect().top + img.getBoundingClientRect().height / 2,
  };
});
console.log('prev button:', JSON.stringify({ top: rects.prev.top, left: rects.prev.left }));
console.log('next button:', JSON.stringify({ top: rects.next.top, right: rects.next.right }));
console.log('portrait vertical centre:', rects.imgCenterY);

await browser.close();
