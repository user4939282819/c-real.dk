import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

const targets = ['#om', '#investeringstyper', '#projekter', '#team', '#kontakt'];
for (const id of targets) {
  await page.locator(`nav a[href="${id}"], header a[href="${id}"]`).first().click();
  await page.waitForTimeout(1800); // let Lenis settle
  const info = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const r = el.getBoundingClientRect();
    const h1 = el.querySelector('h1, h2');
    const h1r = h1 ? h1.getBoundingClientRect() : null;
    return { sectionTop: r.top, h1Top: h1r ? h1r.top : null, scrollY: window.scrollY };
  }, id);
  console.log(id, JSON.stringify(info));
}

await browser.close();
