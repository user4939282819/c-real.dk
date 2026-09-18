import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4200);

const top = await page.locator('#tilgang').evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
await page.evaluate((y) => window.scrollTo(0, y + 380), top);
await page.waitForTimeout(700);

// Dense sweep: half-viewport steps across the whole 4-card stack, checking
// for any frame where the page background shows through at the card's
// vertical centre (a gap) instead of a card.
const results = [];
for (let i = 0; i <= 10; i++) {
  const bg = await page.evaluate(() => {
    const el = document.elementFromPoint(720, 450);
    return el ? getComputedStyle(el).backgroundColor : null;
  });
  results.push({ step: i, bg });
  await page.screenshot({ path: `${OUT}/sweep-${String(i).padStart(2, '0')}.png` });
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.5));
  await page.waitForTimeout(500);
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
