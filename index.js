const puppeteer = require('puppeteer');
//const faker = require('faker');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        timeout: 0
    });
    const page = await browser.newPage();

    try {
        // Open page.
        await page.goto('https://uat.login.aviva.com.sg/gi/travel/#/getQuote');
        //await page.goto('http://localhost:3001/#/getQuote');
    }
    catch (error) {
        console.log(error);
        browser.close();
    }

    // await page.waitForNavigation({
    //     timeout: 0
    // });
    console.log('Page1 loaded ...');

    await page.evaluate(() => {
        document.querySelector('#cover_Family').click();
    });

    await page.evaluate(() => {
        document.querySelector('#region_P').click();
    });

    await page.evaluate(() => {
        document.querySelector('#cover_type_S').click();
    });

    await page.type('#end-date', '31-May-2018');

    await page.evaluate(() => {
        document.querySelector('#tcc_check').click();
    });

    await page.type('#personalNric', 'S0081443A');

    await page.click('button[ng-click="checkTccElgible(\'mainAssured\')"]');

    await page.waitFor(1000);

    await page.evaluate(() => {
        document.querySelector('button[ng-click="getPremium();"]').click();
    });

    // await page.waitForNavigation({
    //     waitUntil: 'load'
    // });
    console.log('Page2 loaded ...');

    await page.waitFor(1000);

    await page.evaluate(() => {
        document.querySelector('.plan_table .bottomborder td:nth-child(3) a').click();
    });

    // await page.waitForNavigation({
    //     waitUntil: 'load'
    // });
    console.log('Page3 loaded ...');
})();