import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['Pixel 7'] });
const page = await context.newPage();

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

const cdp = await context.newCDPSession(page);
// 4x slowdown approximates a mid-range Android phone, a realistic worst case.
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3600); // let the preloader finish

// Confirm Lenis did not initialize on a touch-emulated context.
const lenisActive = await page.evaluate(() => window.matchMedia('(pointer: coarse)').matches);
console.log('pointer: coarse detected (Lenis should be off):', lenisActive);

// Drive a real, sustained scroll for several seconds and record every frame's timing.
const result = await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  const samples = [];
  let last = performance.now();
  let raf = 0;
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      samples.push(now - last);
      last = now;
      const t = (now - start) / 4000;
      window.scrollTo(0, Math.min(total, t * total));
      if (now - start < 4000) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        resolve(undefined);
      }
    };
    raf = requestAnimationFrame(tick);
  });

  const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
  const longFrames = samples.filter((s) => s > 50).length; // >50ms = sub-20fps, visible jank
  const worst = Math.max(...samples);
  return { frameCount: samples.length, avgFrameMs: avg, longFrames, worstFrameMs: worst };
});

console.log('frames captured:', result.frameCount);
console.log('avg frame time (ms):', result.avgFrameMs.toFixed(1), ' -> ~', (1000 / result.avgFrameMs).toFixed(1), 'fps avg');
console.log('frames over 50ms (visible jank):', result.longFrames);
console.log('worst single frame (ms):', result.worstFrameMs.toFixed(1));
console.log('console/page errors:', errors.length ? JSON.stringify(errors) : 'none');

await browser.close();
