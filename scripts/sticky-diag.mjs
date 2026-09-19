import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4500);
const chain = await page.evaluate(() => {
  const start = document.querySelector('#tilgang .sticky');
  const out = [];
  let el = start;
  while (el && el !== document.documentElement.parentNode) {
    const cs = getComputedStyle(el);
    out.push({
      el: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.split(/\s+/).slice(0, 3).join('.') : ''),
      position: cs.position,
      overflow: `${cs.overflowX}/${cs.overflowY}`,
      transform: cs.transform,
      filter: cs.filter,
      clipPath: cs.clipPath,
      contain: cs.contain,
      willChange: cs.willChange,
      display: cs.display,
      height: cs.height,
    });
    el = el.parentElement;
  }
  return out;
});
for (const c of chain) console.log(JSON.stringify(c));
await browser.close();
