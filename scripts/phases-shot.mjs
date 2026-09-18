import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

const section = page.locator('#investeringstyper');
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);

const rows = section.locator('a[href="#kontakt"]');
const count = await rows.count();
for (let i = 0; i < count; i++) {
  await rows.nth(i).hover();
  await page.waitForTimeout(4200);
  await section.screenshot({ path: `${OUT}/phase-${i + 1}.png` });
}

console.log('rows:', count, 'errors:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
