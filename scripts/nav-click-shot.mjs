import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

await page.locator('header a[href="#om"]').first().click();
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/om.png` });

await page.locator('a[href="#investeringstyper"]').first().click();
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/investeringstyper.png` });

await browser.close();
