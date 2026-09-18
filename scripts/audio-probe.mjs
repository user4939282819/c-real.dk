import { chromium } from 'playwright';
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
await page.goto('about:blank');
for (const src of ['http://localhost:5173/video/homepage.mp4', 'https://c-real.dk/wp-content/uploads/2026-05-27-CHS-lang.mp4']) {
  const r = await page.evaluate(async (s) => {
    const v = document.createElement('video');
    v.src = s; v.muted = false; v.volume = 1; v.preload = 'auto';
    document.body.appendChild(v);
    await new Promise((res) => { v.onloadedmetadata = res; v.onerror = res; setTimeout(res, 15000); });
    try { await v.play(); } catch (e) { return { s, error: String(e) }; }
    await new Promise((res) => setTimeout(res, 4000));
    return { s, duration: v.duration, currentTime: v.currentTime, audioDecodedBytes: v.webkitAudioDecodedByteCount, videoDecodedBytes: v.webkitVideoDecodedByteCount, audioTracks: v.audioTracks ? v.audioTracks.length : 'n/a', muted: v.muted, volume: v.volume };
  }, src);
  console.log(JSON.stringify(r));
}
await browser.close();
