import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(4000);
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= h; y += 600) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(180); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);

const r = await page.evaluate(() => {
  const iw = window.innerWidth;
  const out = { tapTargets: [], textOverflow: [], tinyText: [] };

  // Tap targets under the 44px accessibility minimum.
  document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
    const b = el.getBoundingClientRect();
    if (b.width === 0 || b.height === 0) return;
    if (getComputedStyle(el).display === 'none') return;
    if (b.height < 40 || b.width < 40) {
      out.tapTargets.push({ h: Math.round(b.height), w: Math.round(b.width), tag: el.tagName.toLowerCase(), txt: (el.textContent || '').trim().slice(0, 26), cls: String(el.className).slice(0, 40) });
    }
  });

  // Text wider than its own container (a real word-break / min-width problem).
  document.querySelectorAll('h1,h2,h3,h4,p,span,dd,dt,li,figcaption').forEach((el) => {
    if (el.children.length > 0) return;
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
      out.textOverflow.push({ over: el.scrollWidth - el.clientWidth, sec: el.closest('section')?.id || '?', txt: (el.textContent || '').trim().slice(0, 34) });
    }
  });

  // Body copy below 13px is hard to read on a phone.
  document.querySelectorAll('p, li, dd, dt').forEach((el) => {
    if (el.children.length > 0) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs && fs < 13 && (el.textContent || '').trim().length > 12) {
      out.tinyText.push({ px: fs, sec: el.closest('section')?.id || '?', txt: (el.textContent || '').trim().slice(0, 34) });
    }
  });
  const dedup = (a, k) => { const s = new Set(); return a.filter((x) => { const v = k(x); if (s.has(v)) return false; s.add(v); return true; }); };
  out.tapTargets = dedup(out.tapTargets, (x) => x.cls + x.txt).slice(0, 10);
  out.textOverflow = dedup(out.textOverflow, (x) => x.txt).slice(0, 10);
  out.tinyText = dedup(out.tinyText, (x) => x.txt).slice(0, 10);
  return { iw, ...out };
});

console.log('--- tap targets under 40px ---');
console.log(r.tapTargets.length ? JSON.stringify(r.tapTargets, null, 1) : 'none');
console.log('--- text overflowing its container ---');
console.log(r.textOverflow.length ? JSON.stringify(r.textOverflow, null, 1) : 'none');
console.log('--- body text under 13px ---');
console.log(r.tinyText.length ? JSON.stringify(r.tinyText, null, 1) : 'none');
await browser.close();
