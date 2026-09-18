import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

await page.locator('#find-os').scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/map-colored.png` });

await browser.close();
