import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'commit', timeout: 60000 });

for (const ms of [500, 1200, 1900, 2600]) {
  await page.waitForTimeout(ms === 500 ? 500 : 700);
  await page.screenshot({ path: `${OUT}/preloader-${ms}.png` });
}

await browser.close();
