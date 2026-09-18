import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
const WIDTH = Number(process.argv[3] ?? 1440);
const HEIGHT = Number(process.argv[4] ?? 900);

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

// Walk the whole document so every section is judged the way a visitor sees it.
const total = await page.evaluate(() => document.body.scrollHeight);
const step = Math.round(HEIGHT * 0.92);
const screens = Math.ceil(total / step);
for (let i = 0; i < screens; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * step);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}.png` });
}

console.log('page height:', total, 'screens:', screens);
console.log('errors:', errors.length ? JSON.stringify(errors, null, 2) : 'none');

await browser.close();
