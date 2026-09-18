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
await page.screenshot({ path: `${OUT}/hero-fullbleed.png` });

const heroVideo = await page.evaluate(() => {
  const v = document.querySelector('#top video');
  return v ? { paused: v.paused, readyState: v.readyState, currentTime: v.currentTime } : null;
});
console.log('hero video:', JSON.stringify(heroVideo));

await page.locator('#track-record').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/track-record-photo.png` });

await page.locator('#projekter').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/projects-carousel.png` });

await page.locator('#udbud').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/dossier-smaller.png` });

await page.locator('#kontakt').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/contact-smaller.png` });

// VideoFeature mute state on load.
const testimonialVideo = await page.evaluate(() => {
  const v = document.querySelector('video[loop][playsinline]');
  return null;
});
await page.locator('main > div').first().scrollIntoViewIfNeeded().catch(() => {});
const videos = await page.evaluate(() => Array.from(document.querySelectorAll('video')).map((v) => ({ src: v.currentSrc, muted: v.muted, paused: v.paused })));
console.log('all videos:', JSON.stringify(videos, null, 2));

console.log('errors:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
