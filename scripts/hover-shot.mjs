import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

// Hero primary and glass buttons, mid-sweep and settled.
const primary = page.locator('#top a[href="#projekter"]').first();
const box = await primary.boundingBox();
await primary.hover();
await page.waitForTimeout(250);
await page.screenshot({ path: `${OUT}/cta-mid.png`, clip: { x: box.x - 40, y: box.y - 30, width: 560, height: box.height + 60 } });
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/cta-settled.png`, clip: { x: box.x - 40, y: box.y - 30, width: 560, height: box.height + 60 } });

await browser.close();
console.log('done');
