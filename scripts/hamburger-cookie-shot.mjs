import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

await page.screenshot({ path: `${OUT}/hamburger-closed.png`, clip: { x: 260, y: 10, width: 130, height: 70 } });
await page.locator('button[aria-label="Åbn menu"]').click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/hamburger-open.png`, clip: { x: 260, y: 10, width: 130, height: 70 } });
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/menu-full.png` });

await page.locator('button[aria-label="Luk menu"]').click();
await page.waitForTimeout(900);

// Cookie bubble at bottom-left.
await page.screenshot({ path: `${OUT}/cookie-bubble.png`, clip: { x: 0, y: 744, width: 200, height: 100 } });

console.log('errors:', errors.length ? JSON.stringify(errors, null, 2) : 'none');
await browser.close();
