import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const OUT = 'screenshots/round';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(); // no --autoplay-policy flag: match a real visitor
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4500);

// 1. Film below the hero: must be PLAYING on its own, no click.
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.95));
await page.waitForTimeout(2500);
const auto = await page.evaluate(() => {
  const v = document.querySelector('video[src*="CHS-lang"]');
  return v ? { paused: v.paused, muted: v.muted, t: +v.currentTime.toFixed(2) } : 'NOT FOUND';
});
console.log('film WITHOUT any click:', JSON.stringify(auto));
console.log('play buttons on page:', await page.getByRole('button', { name: /Se filmen/ }).count());
await page.screenshot({ path: `${OUT}/film-autoplay.png` });

// A gesture anywhere should lift the sound.
await page.mouse.click(30, 400);
await page.waitForTimeout(900);
const afterGesture = await page.evaluate(() => {
  const v = document.querySelector('video[src*="CHS-lang"]');
  return { paused: v.paused, muted: v.muted, volume: v.volume };
});
console.log('film after ANY page gesture:', JSON.stringify(afterGesture));

// 2. Investeringstyper: one scene box per row.
await page.locator('#investeringstyper').scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
const boxes = await page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll('#investeringstyper a'));
  return rows.map((r) => {
    const h = r.querySelector('h3');
    const img = r.querySelector('img');
    const b = img ? img.getBoundingClientRect() : null;
    return { row: h?.textContent, hasImage: !!img, w: b ? Math.round(b.width) : 0, h: b ? Math.round(b.height) : 0 };
  });
});
console.log('rows and their own boxes:', JSON.stringify(boxes, null, 1));
await page.screenshot({ path: `${OUT}/investeringstyper.png`, fullPage: false });

// 3. Makroanalyse now a video.
await page.locator('#tilgang').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.evaluate(() => {
  const s = document.querySelector('#tilgang');
  window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY + 700);
});
await page.waitForTimeout(2000);
const makro = await page.evaluate(() => {
  const v = Array.from(document.querySelectorAll('#tilgang video')).map((x) => ({ src: x.currentSrc.split('/').pop(), paused: x.paused, rate: x.playbackRate }));
  return v;
});
console.log('Vores tilgang videos:', JSON.stringify(makro));
await page.screenshot({ path: `${OUT}/makroanalyse.png` });

console.log('errors:', errors.length ? JSON.stringify(errors.slice(0, 6)) : 'none');
await browser.close();
