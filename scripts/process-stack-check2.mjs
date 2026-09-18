import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

const top = await page.locator('#tilgang').evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
// Land just past the intro block, at the start of the first card's track.
await page.evaluate((y) => window.scrollTo(0, y + 380), top);
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/a-card1-settled.png` });

// One viewport further: still within card 1's ~108vh track, near its end -> card 2 should be arriving/covering.
await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.0));
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/b-card2-covering.png` });

await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.0));
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/c-card2-settled-or-card3.png` });

await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.0));
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/d-card3-projektering.png` });

const videoState = await page.evaluate(() => {
  const vids = Array.from(document.querySelectorAll('#tilgang video'));
  return vids.map((v) => ({ src: v.currentSrc.split('/').pop(), paused: v.paused, readyState: v.readyState, rectTop: Math.round(v.getBoundingClientRect().top) }));
});
console.log('videos in #tilgang:', JSON.stringify(videoState, null, 2));

await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.0));
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/e-card4-realisering.png` });

await browser.close();
