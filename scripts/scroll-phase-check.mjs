import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

// Move the mouse well away from the row list so only scroll drives the active phase.
await page.mouse.move(5, 5);

const section = page.locator('#investeringstyper');
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);

const readActive = () => page.evaluate(() => {
  const sticky = document.querySelector('#investeringstyper .lg\\:sticky');
  return sticky ? sticky.textContent : null;
});

console.log('at section start:', await readActive());

// Scroll down through the row list in steps, without ever moving the mouse over a row.
for (let i = 0; i < 6; i++) {
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(500);
  console.log(`after scroll step ${i + 1}:`, await readActive());
}

await browser.close();
