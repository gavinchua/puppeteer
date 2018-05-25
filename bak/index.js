const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    try {
        // Open page.
        await page.goto('https://secure.directasia.com/motor/quote/start');
    }
    catch (error) {
        console.log(error);
        browser.close();
    }

    // Show search form.
    //await page.click('.home-hero-section .btn-global');


    try {
        // Submit the form.
        const searchForm = await page.$('.form-horizontal');

        //await page.waitFor(3000);
        await page.select('select[name=vehicleMake]', '2');
        //await page.type('#vehicleMake', 'Audi');

        //await searchForm.evaluate(searchForm => searchForm.submit());

        await page.evaluate(() => {
            document.querySelector('.btn-success').click();
        });
    }
    catch (error) {
        console.log(error);
        //browser.close();
    }
    

    // Keep the browser open.
    // browser.close();
  })();