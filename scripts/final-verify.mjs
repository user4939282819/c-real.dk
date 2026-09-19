import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const OUT = 'screenshots/verify';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4500);

// Section reveals: are wrapped sections actually reaching opacity 1?
const startUrl = page.url();
await page.locator('#find-os').scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/location.png` });

const btn = page.getByRole('button', { name: /Kopiér adresse/ });
console.log('copy button visible:', await btn.isVisible());
await btn.click();
await page.waitForTimeout(900);
const clip = await page.evaluate(() => navigator.clipboard.readText());
console.log('clipboard after click:', JSON.stringify(clip));
console.log('url unchanged after click:', page.url() === startUrl);
await page.screenshot({ path: `${OUT}/location-copied.png` });

// Sticky scene column in Investeringstyper should now pin too.
const invSticky = await page.evaluate(() => {
  const el = Array.from(document.querySelectorAll('div')).find((d) => d.className && typeof d.className === 'string' && d.className.includes('lg:sticky'));
  return el ? getComputedStyle(el).position : 'not found';
});
console.log('InvestmentTypes scene column position:', invSticky);

console.log('console errors:', errors.length ? JSON.stringify(errors.slice(0, 6)) : 'none');
await browser.close();
