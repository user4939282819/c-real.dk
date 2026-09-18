import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('crash', () => errors.push('PAGE CRASHED'));
page.on('requestfailed', (r) => errors.push('REQUEST FAILED: ' + r.url() + ' ' + r.failure()?.errorText));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

await page.locator('#find-os').scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);

const link = page.getByRole('link', { name: 'Åbn i Apple Maps' });
const href = await link.getAttribute('href');
console.log('href:', href);

// Click and see what happens (don't wait for navigation to succeed, just observe).
try {
  await Promise.all([
    page.waitForEvent('popup', { timeout: 3000 }).catch(() => null),
    link.click(),
  ]);
} catch (e) {
  console.log('click threw:', e.message);
}

await page.waitForTimeout(1500);
console.log('page url after click:', page.url());
console.log('page closed?', page.isClosed());
console.log('errors:', errors.length ? JSON.stringify(errors, null, 2) : 'none');

await browser.close();
