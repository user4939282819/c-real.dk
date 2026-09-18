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

await page.locator('#projekter').scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/projects-cards.png` });

await page.locator('#udbud').scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/dossier-hero.png` });

console.log('errors:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
