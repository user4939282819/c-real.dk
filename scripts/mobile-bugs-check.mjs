import { chromium, devices } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['iPhone 13'] });
const page = await context.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'commit', timeout: 60000 });

// Catch the preloader mid-animation.
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/preloader-mid.png` });
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/preloader-end.png` });

await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/hero-nav.png` });

// Horizontal overflow diagnostics.
const overflow = await page.evaluate(() => {
  const docWidth = document.documentElement.scrollWidth;
  const viewport = window.innerWidth;
  const offenders = [];
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > viewport + 2 || r.left < -2) {
      offenders.push({
        tag: el.tagName,
        cls: (el.className && typeof el.className === 'string') ? el.className.slice(0, 90) : '',
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  });
  return { docWidth, viewport, offenders: offenders.slice(0, 15) };
});

console.log('document.scrollWidth:', overflow.docWidth, ' window.innerWidth:', overflow.viewport);
console.log('elements overflowing viewport:', JSON.stringify(overflow.offenders, null, 2));
console.log('errors:', errors.length ? JSON.stringify(errors) : 'none');

await browser.close();
