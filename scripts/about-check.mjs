import { chromium, devices } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('screenshots/about', { recursive: true });

async function run(label, opts) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const failed = [];
  page.on('requestfailed', (r) => failed.push(r.url().split('/').pop() + ' :: ' + r.failure()?.errorText));
  page.on('response', (r) => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url().split('/').pop()); });

  await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(4000);
  await page.locator('#om').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);

  const state = await page.evaluate(() => {
    const sec = document.querySelector('#om');
    const imgs = Array.from(sec.querySelectorAll('img'));
    // Walk up from the section collecting anything that could hide it.
    const chain = [];
    let el = sec;
    while (el && el !== document.body) {
      const cs = getComputedStyle(el);
      chain.push({ el: el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''), opacity: cs.opacity, visibility: cs.visibility, display: cs.display, transform: cs.transform.slice(0, 30), h: Math.round(el.getBoundingClientRect().height) });
      el = el.parentElement;
    }
    return {
      imgs: imgs.map((i) => {
        const r = i.getBoundingClientRect();
        const wrap = i.parentElement.getBoundingClientRect();
        return {
          file: i.currentSrc.split('/').pop(),
          complete: i.complete,
          natural: i.naturalWidth + 'x' + i.naturalHeight,
          box: Math.round(r.width) + 'x' + Math.round(r.height),
          wrapBox: Math.round(wrap.width) + 'x' + Math.round(wrap.height),
          opacity: getComputedStyle(i.parentElement).opacity,
        };
      }),
      chain,
    };
  });
  console.log(`\n===== ${label} =====`);
  console.log('images:', JSON.stringify(state.imgs, null, 1));
  console.log('ancestor chain:', JSON.stringify(state.chain, null, 1));
  console.log('failed/4xx:', failed.length ? JSON.stringify(failed.slice(0, 5)) : 'none');
  await page.screenshot({ path: `screenshots/about/${label}.png`, fullPage: false });
  await browser.close();
}

await run('mobile', { ...devices['Pixel 7'] });
await run('desktop', { viewport: { width: 1440, height: 900 } });
