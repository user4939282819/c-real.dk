import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const URL = process.argv[2];
const OUT = process.argv[3] ?? 'reference';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3000);

// Scroll through once so lazy content and scroll animations have fired.
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 600) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(250);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1200);

const height = await page.evaluate(() => document.body.scrollHeight);
const screens = Math.ceil(height / 900);
for (let i = 0; i < screens; i++) {
  await page.evaluate((n) => window.scrollTo(0, n * 900), i);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}.png` });
}

// Structural + style facts rather than raw markup.
const facts = await page.evaluate(() => {
  const fonts = new Set();
  const colors = new Set();
  const bgs = new Set();
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    fonts.add(cs.fontFamily.split(',')[0].replace(/"/g, '').trim());
    if (cs.color) colors.add(cs.color);
    if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bgs.add(cs.backgroundColor);
  });
  const headings = [...document.querySelectorAll('h1,h2,h3')].map((h) => {
    const cs = getComputedStyle(h);
    return { tag: h.tagName, text: h.textContent.trim().slice(0, 80), size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing, lh: cs.lineHeight };
  });
  const sections = [...document.querySelectorAll('section, [data-framer-name]')].slice(0, 60).map((s) => ({
    name: s.getAttribute('data-framer-name') || s.tagName,
    h: Math.round(s.getBoundingClientRect().height),
    bg: getComputedStyle(s).backgroundColor,
  }));
  const imgs = [...document.querySelectorAll('img')].map((i) => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight, alt: i.alt })).slice(0, 40);
  const videos = [...document.querySelectorAll('video')].map((v) => v.currentSrc || v.src);
  return { height: document.body.scrollHeight, fonts: [...fonts], colors: [...colors].slice(0, 30), bgs: [...bgs].slice(0, 30), headings, sections, imgs, videos };
});

writeFileSync(`${OUT}/facts.json`, JSON.stringify(facts, null, 2));
console.log('screens:', screens, 'height:', height);
await browser.close();
