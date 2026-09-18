import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
await page.goto('http://localhost:5173/', { waitUntil: 'commit', timeout: 60000 });
await page.waitForTimeout(1600);
await page.screenshot({ path: `${OUT}/preloader-mid.png` });
await page.waitForTimeout(2600);
await page.screenshot({ path: `${OUT}/hero-nav.png` });
await browser.close();
