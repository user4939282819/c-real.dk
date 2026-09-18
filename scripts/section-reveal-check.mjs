import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

// Catch a section mid-entrance (partially scrolled into view) to show the rise/scale.
const about = page.locator('#om');
await about.scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy(0, -260));
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/about-mid-enter.png` });

await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/about-settled.png` });

const dossier = page.locator('#udbud');
await dossier.scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy(0, -300));
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/dossier-mid-enter.png` });

console.log('errors:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
