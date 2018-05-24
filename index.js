const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://banheng.com.sg/');
    await page.screenshot({path: './img/example.png'});
  
    await browser.close();
  })();