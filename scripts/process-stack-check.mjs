import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

await page.locator('#tilgang').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/stack-1-makro.png` });

// Scroll through the stack track to see the second card cover the first.
const section = page.locator('#tilgang');
const box = await section.boundingBox();
await page.mouse.wheel(0, box.height * 0.55);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/stack-2-mikro-covering.png` });

await page.mouse.wheel(0, box.height * 0.55);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/stack-3-projektering.png` });

const videoState = await page.evaluate(() => {
  const v = document.querySelector('#tilgang video');
  return v ? { src: v.currentSrc, paused: v.paused, readyState: v.readyState } : null;
});
console.log('projektering video (current sticky card):', JSON.stringify(videoState));

await page.mouse.wheel(0, box.height * 0.6);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/stack-4-realisering.png` });

// Collage + Expertise videos.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const collageSection = page.locator('main > div').nth(1);
await page.mouse.wheel(0, 900);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/collage-video.png` });

const allVideos = await page.evaluate(() => Array.from(document.querySelectorAll('video')).map((v) => ({ src: v.currentSrc.split('/').pop(), paused: v.paused, readyState: v.readyState })));
console.log('all videos on page:', JSON.stringify(allVideos, null, 2));
console.log('errors:', errors.length ? JSON.stringify(errors) : 'none');

await browser.close();
