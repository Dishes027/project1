const { chromium } = require('playwright');
(async () => {
  const [,, out = 'hero.png', scale = '1'] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: +scale });
  await p.goto('file://' + __dirname + '/hero.html');
  await p.waitForLoadState('networkidle');
  await p.waitForTimeout(1500);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1000, height: 1000 } });
  await b.close();
})();
