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

const section = page.locator('#find-os');
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/before.png` });

const google = page.getByRole('link', { name: 'Åbn i Google Maps' });
await google.hover();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/hover-google.png` });

const apple = page.getByRole('link', { name: 'Åbn i Apple Maps' });
await apple.hover();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/hover-apple.png` });

// Full page after hovering, to see if layout broke elsewhere.
await page.mouse.move(10, 10);
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/after-fullpage.png`, fullPage: false });

console.log('errors:', errors.length ? JSON.stringify(errors, null, 2) : 'none');
await browser.close();
