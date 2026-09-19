import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const w of [360, 390, 430]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(4000);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(160); }
  await page.waitForTimeout(900);

  const r = await page.evaluate(() => {
    const clipped = [];
    const overlaps = [];
    const label = (el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 34)}`;
    const secOf = (el) => el.closest('section')?.id || (el.closest('footer') ? 'FOOTER' : '?');

    // 1. Content cut off by a hidden-overflow box.
    document.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.overflowY !== 'hidden' && cs.overflow !== 'hidden') return;
      if (el.scrollHeight - el.clientHeight > 10 && el.clientHeight > 40) {
        // Ignore intentional media crops and marquees.
        if (el.querySelector(':scope > img, :scope > video')) return;
        clipped.push({ over: el.scrollHeight - el.clientHeight, sec: secOf(el), el: label(el) });
      }
    });

    // 2. Text blocks overlapping links/buttons.
    const texts = [...document.querySelectorAll('p, h1, h2, h3')].filter((e) => (e.textContent || '').trim().length > 14);
    const hits = [...document.querySelectorAll('a, button')];
    const inter = (a, b) => !(a.right <= b.left + 2 || a.left >= b.right - 2 || a.bottom <= b.top + 2 || a.top >= b.bottom - 2);
    for (const t of texts) {
      const tb = t.getBoundingClientRect();
      if (tb.width === 0 || tb.height === 0) continue;
      if (t.closest('a, button')) continue;
      for (const c of hits) {
        if (c.contains(t) || t.contains(c)) continue;
        const cb = c.getBoundingClientRect();
        if (cb.width === 0 || cb.height === 0) continue;
        if (getComputedStyle(c).opacity === '0') continue;
        if (inter(tb, cb)) {
          overlaps.push({ sec: secOf(t), text: (t.textContent || '').trim().slice(0, 30), over: label(c) });
        }
      }
    }
    const dedup = (a, k) => { const s = new Set(); return a.filter((x) => { const v = k(x); if (s.has(v)) return false; s.add(v); return true; }); };
    return {
      clipped: dedup(clipped, (x) => x.sec + x.el).slice(0, 8),
      overlaps: dedup(overlaps, (x) => x.sec + x.text + x.over).slice(0, 8),
    };
  });

  console.log(`\n===== ${w}px =====`);
  console.log('content clipped by a fixed-height box:', r.clipped.length ? JSON.stringify(r.clipped, null, 1) : 'none');
  console.log('text overlapped by a link/button:', r.overlaps.length ? JSON.stringify(r.overlaps, null, 1) : 'none');
  await ctx.close();
}
await browser.close();
