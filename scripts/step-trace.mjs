import { chromium, devices } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['Pixel 7'] });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(4000);
const omTop = await page.evaluate(() => document.querySelector('#om').getBoundingClientRect().top + window.scrollY);

console.log(' scrollY | wrapper(op,top) | img1(op,top) | img2(op,top)');
for (let y = omTop - 900; y <= omTop + 600; y += 100) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const sec = document.querySelector('#om');
    const wrapper = sec.parentElement; // SectionReveal motion.div
    const kids = Array.from(sec.querySelector('div').children);
    const f = (el) => `${(+getComputedStyle(el).opacity).toFixed(2)},${Math.round(el.getBoundingClientRect().top)}`;
    return { w: f(wrapper), a: f(kids[0]), c: f(kids[2]) };
  });
  console.log(`${String(y).padStart(8)} | ${r.w.padStart(14)} | ${r.a.padStart(12)} | ${r.c.padStart(12)}`);
}
await browser.close();
