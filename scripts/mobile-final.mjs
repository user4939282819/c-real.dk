import { chromium, devices } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('screenshots/final', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['Pixel 7'] });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
let bytes = 0;
page.on('response', async (r) => { try { const h = r.headers()['content-length']; if (h) bytes += +h; } catch {} });

const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

const t0 = Date.now();
await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
console.log('load event:', Date.now() - t0, 'ms (4x CPU throttle)');
await page.waitForTimeout(6000);
console.log('transferred by first paint+6s:', (bytes / 1024 / 1024).toFixed(2), 'MB');

// Clean frame measurement: no screenshots during the scroll.
await page.evaluate(() => {
  window.__f = []; let last = performance.now();
  const t = (n) => { window.__f.push(n - last); last = n; requestAnimationFrame(t); };
  requestAnimationFrame(t);
});
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let i = 1; i <= 50; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), (h / 50) * i);
  await page.waitForTimeout(240);
}
const perf = await page.evaluate(() => {
  const f = window.__f.filter((x) => x > 0 && x < 3000).sort((a, b) => a - b);
  return {
    fps: +(1000 / (f.reduce((a, b) => a + b, 0) / f.length)).toFixed(1),
    p95: +f[Math.floor(f.length * 0.95)].toFixed(0),
    worst: +f[f.length - 1].toFixed(0),
    over50ms: f.filter((x) => x > 50).length,
    frames: f.length,
  };
});
console.log('scroll frame pacing:', JSON.stringify(perf));

// Map facade present on mobile, no Google request made.
const googleHits = [];
page.on('request', (r) => { if (r.url().includes('google.com')) googleHits.push(r.url().slice(0, 50)); });
await page.locator('#find-os').scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
console.log('map facade visible:', await page.getByRole('button', { name: 'Vis kort' }).isVisible());
await page.screenshot({ path: 'screenshots/final/map-facade.png' });
await page.getByRole('button', { name: 'Vis kort' }).click();
await page.waitForTimeout(3000);
console.log('iframe after tap:', await page.locator('#find-os iframe').count());
await page.screenshot({ path: 'screenshots/final/map-loaded.png' });

// Sticky deck on a phone.
await page.evaluate(() => { const s = document.querySelector('#tilgang'); window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY + 1400); });
await page.waitForTimeout(1200);
const deck = await page.evaluate(() =>
  Array.from(document.querySelectorAll('#tilgang .sticky')).map((c) => {
    const r = c.getBoundingClientRect();
    return { t: c.querySelector('h3')?.textContent, top: Math.round(r.top), stuck: Math.abs(r.top - parseFloat(getComputedStyle(c).top)) < 2 };
  })
);
console.log('card deck on phone:', deck.map((d) => `${d.t}@${d.top}${d.stuck ? '*' : ''}`).join('  '));
await page.screenshot({ path: 'screenshots/final/deck-mobile.png' });

console.log('errors:', errors.length ? JSON.stringify(errors.slice(0, 5)) : 'none');
await browser.close();
