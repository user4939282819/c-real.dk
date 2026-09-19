import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const w of [360, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(3500);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  const res = await page.evaluate(() => {
    const iw = window.innerWidth;
    document.documentElement.style.overflowX = 'visible';
    document.body.style.overflowX = 'visible';
    const docW = document.documentElement.scrollWidth;

    const clipsX = (el) => {
      const o = getComputedStyle(el).overflowX;
      return o === 'hidden' || o === 'clip' || o === 'scroll' || o === 'auto';
    };
    const out = [];
    document.querySelectorAll('*').forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width === 0 || b.right <= iw + 1) return;
      // Ignore anything an ancestor already clips horizontally.
      let p = el.parentElement, clipped = false;
      while (p && p !== document.documentElement) { if (clipsX(p)) { clipped = true; break; } p = p.parentElement; }
      if (clipped) return;
      const sec = el.closest('section');
      out.push({
        right: Math.round(b.right),
        w: Math.round(b.width),
        tag: el.tagName.toLowerCase(),
        sec: sec?.id || (el.closest('footer') ? 'FOOTER' : el.closest('nav') ? 'NAV' : '?'),
        cls: String(el.className).slice(0, 60),
      });
    });
    document.documentElement.style.overflowX = '';
    document.body.style.overflowX = '';
    // Deepest offenders first, dedup by class+right.
    const seen = new Set();
    return { iw, docW, out: out.filter((o) => { const k = o.cls + o.right; if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => b.right - a.right).slice(0, 12) };
  });

  console.log(`\n===== viewport ${res.iw}px -> unclipped document ${res.docW}px =====`);
  for (const o of res.out) console.log(`  right=${String(o.right).padStart(5)} w=${String(o.w).padStart(5)}  [${o.sec}] ${o.tag}.${o.cls}`);
  await ctx.close();
}
await browser.close();
