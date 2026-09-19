import { webkit, devices } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('screenshots/safari', { recursive: true });

const browser = await webkit.launch();
const ctx = await browser.newContext({ ...devices['iPhone 14'] });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(5000);

const vh = await page.evaluate(() => window.innerHeight);
const omTop = await page.evaluate(() => document.querySelector('#om').getBoundingClientRect().top + window.scrollY);

// Scroll down the way a person does, in viewport-ish steps, and watch #om.
for (let y = 0; y < omTop + 2200; y += Math.round(vh * 0.6)) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(450);
}

const state = await page.evaluate(() => {
  const sec = document.querySelector('#om');
  return {
    sectionH: Math.round(sec.getBoundingClientRect().height),
    imgs: Array.from(sec.querySelectorAll('img')).map((i) => {
      const r = i.getBoundingClientRect();
      const w = i.parentElement.getBoundingClientRect();
      return {
        file: (i.currentSrc || i.src).split('/').pop(),
        complete: i.complete,
        natural: i.naturalWidth + 'x' + i.naturalHeight,
        imgBox: Math.round(r.width) + 'x' + Math.round(r.height),
        wrapBox: Math.round(w.width) + 'x' + Math.round(w.height),
        wrapOpacity: getComputedStyle(i.parentElement).opacity,
        wrapTransform: getComputedStyle(i.parentElement).transform,
      };
    }),
  };
});
console.log('WEBKIT / iPhone 14');
console.log(JSON.stringify(state, null, 1));
console.log('errors:', errors.length ? JSON.stringify(errors.slice(0, 5)) : 'none');

await page.evaluate((y) => window.scrollTo(0, y - 60), omTop);
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/safari/om-top.png' });
await page.evaluate((y) => window.scrollTo(0, y + 1100), omTop);
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/safari/om-bottom.png' });
await browser.close();
