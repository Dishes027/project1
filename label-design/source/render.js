const { chromium } = require('playwright');
(async () => {
  const [,, hash = '', out = 'preview.png', scale = '1.5'] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 420, height: 583 }, deviceScaleFactor: +scale });
  await p.goto('file://' + __dirname + '/label.html' + hash);
  await p.waitForFunction(() => document.title === 'ready', null, { timeout: 30000 });
  await p.waitForTimeout(300);
  const box = await p.locator('#lbl').boundingBox();
  await p.screenshot({ path: out, clip: box, omitBackground: true });
  await b.close();
})();
