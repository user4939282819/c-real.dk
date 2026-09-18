import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 3,
});
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'commit', timeout: 60000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/preloader-mid.png` });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/preloader-end.png` });
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/hero-nav.png` });

const info = await page.evaluate(() => {
  const isClipped = (el) => {
    let p = el.parentElement;
    while (p) {
      const cs = getComputedStyle(p);
      if (cs.overflowX === 'hidden' || cs.overflow === 'hidden') return true;
      p = p.parentElement;
    }
    return false;
  };
  const viewport = window.innerWidth;
  const offenders = [];
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if ((r.right > viewport + 2 || r.left < -2) && !isClipped(el)) {
      offenders.push({
        tag: el.tagName,
        id: el.id,
        cls: typeof el.className === 'string' ? el.className.slice(0, 100) : '',
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  });
  return {
    innerWidth: window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
    offenders: offenders.slice(0, 20),
  };
});

console.log(JSON.stringify(info, null, 2));
console.log('errors:', errors.length ? JSON.stringify(errors) : 'none');

await browser.close();
