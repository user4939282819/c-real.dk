import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
const WIDTH = Number(process.argv[3] ?? 1440);
const HEIGHT = Number(process.argv[4] ?? 900);

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });

// Let the preloader finish and webfonts settle before judging anything.
await page.waitForTimeout(4200);

const screens = 9;
for (let i = 0; i < screens; i++) {
  await page.evaluate((n) => window.scrollTo(0, n * window.innerHeight * 0.92), i);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}.png` });
}

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1400);
await page.screenshot({ path: `${OUT}/99-footer.png` });

console.log('page height:', await page.evaluate(() => document.body.scrollHeight));
console.log('errors:', errors.length ? JSON.stringify(errors, null, 2) : 'none');

await browser.close();
