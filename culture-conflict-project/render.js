// Render index.html to a single JPG (A4-width, 2x scale)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const scale = Number(process.argv[2] || 2);
  const out = process.argv[3] || 'งานส่งครั้งที่4_ศุภณัฐ_2610111102112.jpg';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1240, height: 1600 }, deviceScaleFactor: scale });
  await page.goto('file://' + path.join(__dirname, 'index.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, out), fullPage: true, type: 'jpeg', quality: 92 });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('height', h);
  await browser.close();
})();
