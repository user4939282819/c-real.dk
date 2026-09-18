import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

// Skip link: focus it via Tab from the top of the page.
await page.keyboard.press('Tab');
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/skip-link.png`, clip: { x: 0, y: 0, width: 500, height: 120 } });

// Scroll down to trigger the bubble.
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.2));
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/bubble-collapsed.png` });

await page.locator('button[aria-label="Tal med en investeringsrådgiver"]').click();
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/bubble-open.png` });

// Dossier section.
const dossier = page.locator('#udbud');
await dossier.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/dossier-top.png` });
await page.mouse.wheel(0, 500);
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/dossier-form.png` });

console.log('errors:', errors.length ? JSON.stringify(errors, null, 2) : 'none');
await browser.close();
