import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots/stack';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4500);

// --- 1. playbackRate on the three ambient films -------------------------
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);
const heroRate = await page.evaluate(() => {
  const v = document.querySelector('section#top video');
  return v ? { src: v.currentSrc.split('/').pop(), rate: v.playbackRate } : null;
});
console.log('HERO video:', JSON.stringify(heroRate));

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2));
await page.waitForTimeout(1800);
const collageRate = await page.evaluate(() =>
  Array.from(document.querySelectorAll('video'))
    .map((v) => ({ src: v.currentSrc.split('/').pop(), rate: v.playbackRate }))
);
console.log('videos at collage scroll:', JSON.stringify(collageRate));

// --- 2. Vores tilgang: does it appear promptly? -------------------------
const secBox = await page.locator('#tilgang').boundingBox();
const pageTop = await page.evaluate(() => window.scrollY);
const sectionTop = secBox.y + pageTop;
console.log(`#tilgang starts at y=${Math.round(sectionTop)}, height=${Math.round(secBox.height)}`);

// Scroll to just past the section heading and confirm a card is on screen.
await page.evaluate((y) => window.scrollTo(0, y), sectionTop + 500);
await page.waitForTimeout(1200);
const promptly = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll('#tilgang h3'));
  return cards.map((h) => {
    const card = h.closest('.sticky');
    const r = card.getBoundingClientRect();
    const cs = getComputedStyle(card);
    return { title: h.textContent, top: Math.round(r.top), opacity: cs.opacity, position: cs.position };
  });
});
console.log('cards shortly after heading:', JSON.stringify(promptly, null, 1));
await page.screenshot({ path: `${OUT}/tilgang-entry.png` });

// --- 3. Walk the stack and prove each card sits on top of the last ------
const steps = 8;
for (let i = 0; i <= steps; i++) {
  const y = sectionTop + 300 + (secBox.height - 600) * (i / steps);
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(700);

  const state = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#tilgang .sticky'));
    return cards.map((c) => {
      const r = c.getBoundingClientRect();
      const h = c.querySelector('h3');
      return {
        t: h ? h.textContent : '?',
        top: Math.round(r.top),
        z: getComputedStyle(c).zIndex,
        stuck: Math.abs(r.top - parseFloat(getComputedStyle(c).top)) < 2,
      };
    });
  });
  // Which card owns the centre of the screen?
  const owner = await page.evaluate(() => {
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    const card = el && el.closest('#tilgang .sticky');
    const h = card && card.querySelector('h3');
    return h ? h.textContent : el ? el.tagName + '.' + el.className.slice(0, 40) : 'none';
  });
  console.log(`step ${i}: centre owned by "${owner}" | ${state.map((s) => `${s.t}@${s.top}${s.stuck ? '*' : ''}`).join('  ')}`);
  await page.screenshot({ path: `${OUT}/stack-${String(i).padStart(2, '0')}.png` });
}

console.log('errors:', errors.length ? JSON.stringify(errors.slice(0, 5)) : 'none');
await browser.close();
