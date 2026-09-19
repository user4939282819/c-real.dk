import { chromium, devices } from 'playwright';

async function check(label, ctxOpts, throttle) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  if (throttle) {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });
  }
  await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(6000);

  // Hero: sample how evenly the video clock advances against the wall clock.
  const hero = await page.evaluate(async () => {
    const v = document.querySelector('section#top video');
    if (!v) return 'not found';
    const s = [];
    for (let i = 0; i < 20; i++) {
      s.push({ t: v.currentTime, w: performance.now() });
      await new Promise((r) => setTimeout(r, 150));
    }
    const ratios = [];
    for (let i = 1; i < s.length; i++) {
      const dv = s[i].t - s[i - 1].t, dw = (s[i].w - s[i - 1].w) / 1000;
      if (dw > 0) ratios.push(dv / dw);
    }
    ratios.sort((a, b) => a - b);
    return {
      rate: v.playbackRate,
      duration: +v.duration.toFixed(1),
      medianSpeed: +ratios[Math.floor(ratios.length / 2)].toFixed(2),
      stalls: ratios.filter((r) => r < 0.5).length,
    };
  });
  console.log(`${label} hero:`, JSON.stringify(hero));

  const all = await page.evaluate(() =>
    Array.from(document.querySelectorAll('video')).map((v) => ({ src: v.currentSrc.split('/').pop(), rate: v.playbackRate }))
  );
  const slowed = all.filter((v) => v.rate !== 1);
  console.log(`${label} videos not at normal speed:`, slowed.length ? JSON.stringify(slowed) : 'none');
  await browser.close();
}

await check('DESKTOP', { viewport: { width: 1440, height: 900 } }, 0);
await check('MOBILE ', { ...devices['Pixel 7'] }, 4);
