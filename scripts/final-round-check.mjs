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

// 1. Projects grid with animation.
await page.locator('#projekter').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/projects-grid.png` });

// 2. VideoFeature: poster/play state, then click to start with sound.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.mouse.wheel(0, 750);
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/video-poster-state.png` });

const beforeClick = await page.evaluate(() => {
  const v = document.querySelector('video');
  return v ? { muted: v.muted, paused: v.paused } : null;
});
console.log('video before click:', JSON.stringify(beforeClick));

const playBtn = page.locator('button[aria-label]').filter({ hasText: '' }).first();
await page.getByRole('button', { name: 'Se filmen med lyd' }).click();
await page.waitForTimeout(1000);
const afterClick = await page.evaluate(() => {
  const v = document.querySelector('video');
  return v ? { muted: v.muted, paused: v.paused, currentTime: v.currentTime, volume: v.volume } : null;
});
console.log('video after click (should be muted:false, playing):', JSON.stringify(afterClick));
await page.screenshot({ path: `${OUT}/video-playing-with-sound.png` });

// 3. New video in Collage.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/collage-new-video.png` });

const collageVideoSrc = await page.evaluate(() => {
  const vids = Array.from(document.querySelectorAll('video'));
  return vids.map((v) => v.currentSrc.split('/').pop());
});
console.log('all video src on page at this scroll:', JSON.stringify(collageVideoSrc));

console.log('errors:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
