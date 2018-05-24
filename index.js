const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://aviva.com.sg');
    // other actions...
    await browser.close();
});