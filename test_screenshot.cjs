const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ 
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  await page.mouse.click(640, 360, { button: 'right' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_main.png' });
  console.log('Main menu screenshot saved');
  const viewItem = page.locator('li.has-submenu').first();
  await viewItem.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot_sub.png' });
  console.log('Submenu screenshot saved');
  await browser.close();
})();
