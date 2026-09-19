import { chromium, devices } from 'playwright';
import { mkdirSync } from 'node:fs';
const OUT = 'screenshots/mobile';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['Pixel 7'] });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); // mid-range phone

await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(6000);

const vp = await page.evaluate(() => ({
  innerW: window.innerWidth,
  docW: document.documentElement.scrollWidth,
  bodyW: document.body.scrollWidth,
  docH: document.documentElement.scrollHeight,
}));
console.log('viewport/overflow:', JSON.stringify(vp), vp.docW > vp.innerW ? '<-- HORIZONTAL OVERFLOW' : 'no overflow');

// Which elements stick out past the right edge?
const wide = await page.evaluate(() => {
  const w = window.innerWidth;
  const out = [];
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > w + 1) {
      out.push({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 60), right: Math.round(r.right) });
    }
  });
  return out.slice(0, 8);
});
console.log('elements past right edge:', JSON.stringify(wide, null, 1));

// How many videos exist, how many are playing / how heavy.
const vids = await page.evaluate(() =>
  Array.from(document.querySelectorAll('video')).map((v) => ({
    src: v.currentSrc.split('/').pop(),
    paused: v.paused,
    preload: v.preload,
    rate: v.playbackRate,
  }))
);
console.log('videos on page:', JSON.stringify(vids, null, 1));
console.log('total videos:', vids.length, '| playing:', vids.filter((v) => !v.paused).length);

await page.screenshot({ path: `${OUT}/01-hero.png` });

// --- scroll the whole page, measure frame pacing -----------------------
await page.evaluate(() => {
  window.__frames = [];
  let last = performance.now();
  const tick = (t) => { window.__frames.push(t - last); last = t; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});

const h = vp.docH;
const shots = ['02-video', '03-collage', '04-invest', '05-tilgang', '06-team', '07-footer'];
for (let i = 1; i <= 24; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), (h / 24) * i);
  await page.waitForTimeout(320);
  if (i % 4 === 0) await page.screenshot({ path: `${OUT}/${shots[i / 4 - 1]}.png` });
}

const perf = await page.evaluate(() => {
  const f = window.__frames.filter((x) => x > 0 && x < 2000);
  f.sort((a, b) => a - b);
  const avg = f.reduce((a, b) => a + b, 0) / f.length;
  return {
    frames: f.length,
    avgMs: +avg.toFixed(1),
    fps: +(1000 / avg).toFixed(1),
    p95Ms: +f[Math.floor(f.length * 0.95)].toFixed(1),
    worstMs: +f[f.length - 1].toFixed(1),
    longFrames: f.filter((x) => x > 50).length,
  };
});
console.log('frame pacing (4x CPU throttle):', JSON.stringify(perf));

const after = await page.evaluate(() => ({ docW: document.documentElement.scrollWidth, innerW: window.innerWidth }));
console.log('overflow after full scroll:', JSON.stringify(after), after.docW > after.innerW ? '<-- OVERFLOW' : 'ok');
console.log('errors:', errors.length ? JSON.stringify(errors.slice(0, 8)) : 'none');
await browser.close();
