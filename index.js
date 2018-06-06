const puppeteer = require('puppeteer');
//const faker = require('faker');

(async () => {
    const browser = await puppeteer.launch({
        //devtools: true,
        headless: false,
        timeout: 0,
        //slowMo: 100 // slow down by 100ms
    });

    const page = await browser.newPage();

    try {
        // Open page.
        await page.goto('https://uat.login.aviva.com.sg/gi/travel/#/getQuote');
        //await page.goto('http://localhost:3001/#/getQuote');
    } catch (error) {
        console.log(error);
        browser.close();
    }

    console.log('Page 1 loading ...');

    await page.waitFor(2000);

    await page.evaluate(() => {
        document.querySelector('#cover_Group').click();
    });

    await page.evaluate(() => {
        document.querySelector('#region_P').click();
    });

    await page.evaluate(() => {
        document.querySelector('#cover_type_S').click();
    });

    await page.type('#end-date', '30-Jun-2018');

    await page.evaluate(() => {
        document.querySelector('#tcc_check').click();
    });

    await page.type('#personalNric', 'S0081443A');

    await page.waitFor(2000);

    await page.click('button[ng-click="checkTccElgible(\'mainAssured\')"]');

    await page.waitFor(2000);

    await page.evaluate(() => {
        document.querySelector('button[ng-click="getPremium();"]').click();
    });

    console.log('Page 2 loading ...');

    await page.waitFor(2000);

    await page.evaluate(() => {
        document.querySelector('.plan_table tbody tr:first-child .btn').click();
    });

    console.log('Page 3 loading ...');

    await page.waitFor(2000);

    await page.evaluate(() => {
        document.querySelector('.btn').click();
    });

    console.log('Page 4 loading ...');

    await page.waitFor(2000);

    await page.select('select[name="salutation"]', 'Mr');

    await page.type('input[name="familyName"]', 'Tan');

    await page.type('input[name="givenName"]', 'Tony');

    await page.type('details-basic-personal[type="\'mainAssured\'"] input[ng-model="who.birth.date"]', '1');

    await page.type('details-basic-personal[type="\'mainAssured\'"] input[ng-model="who.birth.month"]', '7');

    await page.type('details-basic-personal[type="\'mainAssured\'"] input[ng-model="who.birth.year"]', '1984');

    await page.evaluate(() => {
        document.querySelector('details-basic-personal[type="\'mainAssured\'"] .a-radio__input[value="M"]').click();
    });

    await page.type('input[name="mobile"]', '97917204');

    await page.type('input[name="email"]', 'gavin_chua@aviva-asia.com');

    await page.waitFor(2000);

    await page.type('input[name="postalCode"]', '179942');

    await page.waitFor(5000);

    await page.click('a[ng-click="$event.preventDefault();getAddress(mainAssured.addresses[0])"]');

    console.log('Get Address button click ...');

    await page.type('#nric_travellers_0', 'S5190290D');

    await page.type('details-basic-personal[type="\'travellers\'"] input[name="familyName0"]', 'Lim');

    await page.type('details-basic-personal[type="\'travellers\'"] input[name="givenName0"]', 'Sharon');

    await page.type('details-basic-personal[type="\'travellers\'"] input[ng-model="who.birth.date"]', '2');

    await page.type('details-basic-personal[type="\'travellers\'"] input[ng-model="who.birth.month"]', '8');

    await page.type('details-basic-personal[type="\'travellers\'"] input[ng-model="who.birth.year"]', '1986');

    await page.evaluate(() => {
        document.querySelector('details-basic-personal[type="\'travellers\'"] .a-radio__input[value="F"]').click();
    });

    await page.waitFor(8000);

    await page.evaluate(() => {
        document.querySelector('.btn').click();
    });

    console.log('Last button click ...');

    console.log('Page 5 loading ...');

    await page.waitFor(2000);
})();