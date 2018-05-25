const puppeteer = require('puppeteer');
const faker = require('faker');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        timeout: 0
    });
    const page = await browser.newPage();

    try {
        // Open page.
        await page.goto('https://secure.directasia.com/travel/quote/start');
    }
    catch (error) {
        console.log(error);
        browser.close();
    }

    // Show search form.
    //await page.click('.home-hero-section .btn-global');


    try {
        // Submit the form.
        //const searchForm = await page.$('.form-horizontal');

        //await page.waitFor(3000);
        //await page.select('select[name=vehicleMake]', '2');
        //await page.type('#vehicleMake', 'Audi');

        //await searchForm.evaluate(searchForm => searchForm.submit());

        await page.evaluate(() => {
            // Type of policy
            document.querySelector('#PolicyTypeIdAnchor div.col-md-6 > span.col-md-6:nth-child(2) input[type="radio"]').click();

            // Who are you travelling with?
            document.querySelector('#ParticipantTypeIdAnchor div.col-md-6 > span.col-md-6:nth-child(1) input[type="radio"]').click();
        });

        // Where are you travelling to?
        await page.select('select[name=DestinationCountryId]', '2');

        // Click Calculate Premium
        await page.evaluate(() => {
            document.querySelector('.btn-success').click();
        });

        // Next page
        await page.waitForNavigation({
            waitUntil: 'load'
        });
        console.log('Page2 loaded ...');

        // Wait 1s
        await page.waitFor(1000);

        // Select plan
        await page.evaluate(() => {
            document.querySelector('input[data-ng-dynamic-name="ddd0"]').click();
        });

        await page.evaluate(() => {
            document.querySelector('.da-override-btn-sne').click();
        });

        // Wait 1s
        await page.waitFor(1000);

        // await page.type('#PrimaryEmailAddress', faker.internet.email());
        // await page.type('#PrimaryEmailAddressReenter', faker.internet.email());
        await page.type('#PrimaryEmailAddress', 'Eladio.Jakubowski@gmail.com');
        await page.type('#PrimaryEmailAddressReenter', 'Eladio.Jakubowski@gmail.com');
        console.log('Email entered ...');

        // Wait 2s
        await page.waitFor(2000);

        // Click Continue
        // await page.evaluate(() => {
        //     document.querySelector('.da-override-btn-fwd').click();
        // });
        const form = await page.$('form[name="frmPartialSave"]');
        await form.evaluate(form => form.submit());
        console.log('Quote submitted ...');
    }
    catch (error) {
        console.log(error);
        //browser.close();
    }


    // Keep the browser open.
    // browser.close();
})();