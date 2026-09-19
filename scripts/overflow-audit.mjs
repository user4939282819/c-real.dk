import { chromium, webkit } from 'playwright';

const WIDTHS = [320, 360, 390, 412, 430];

async function audit(engine, name) {
  const browser = await engine.launch();
  console.log(`\n########## ${name} ##########`);
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
    await page.waitForTimeout(3500);

    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= h; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const r = await page.evaluate(() => {
      const iw = window.innerWidth;
      const clipSupported = CSS.supports('overflow', 'clip');
      // What the page would do with no root clipping at all.
      const htmlPrev = document.documentElement.style.overflowX;
      const bodyPrev = document.body.style.overflowX;
      document.documentElement.style.overflowX = 'visible';
      document.body.style.overflowX = 'visible';
      const unclippedW = document.documentElement.scrollWidth;
      const offenders = [];
      document.querySelectorAll('*').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.width > 0 && b.right > iw + 1) {
          const sec = el.closest('section');
          offenders.push({ right: Math.round(b.right), w: Math.round(b.width), sec: sec?.id || el.tagName.toLowerCase(), cls: String(el.className).slice(0, 46) });
        }
      });
      document.documentElement.style.overflowX = htmlPrev;
      document.body.style.overflowX = bodyPrev;
      return {
        iw,
        clipSupported,
        clippedW: document.documentElement.scrollWidth,
        unclippedW,
        top5: offenders.sort((a, b) => b.right - a.right).slice(0, 5),
      };
    });

    const bad = r.clippedW > r.iw;
    console.log(`\n  ${w}px | clip supported: ${r.clipSupported} | doc ${r.clippedW} ${bad ? '<-- OVERFLOWS' : 'ok'} | without root clip: ${r.unclippedW}${r.unclippedW > r.iw ? ' <-- would break' : ''}`);
    for (const o of r.top5) console.log(`      right=${String(o.right).padStart(5)} w=${String(o.w).padStart(5)}  ${o.sec.padEnd(18)} ${o.cls}`);
    await ctx.close();
  }
  await browser.close();
}

await audit(chromium, 'CHROMIUM');
await audit(webkit, 'WEBKIT (Safari)');
