const puppeteer = require('puppeteer');

const test = async () => {
    
    for (let i = 0; i < 10; i++) {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--no-sandbox"]
        })
        const page = await browser.newPage();
        await page.goto('http://35.225.124.231:3000/');
        await page.type('.form-control', 'print(1)');       
        await page.click('.btn-primary');
        await page.waitForTimeout(1000)
        await browser.close();
        //await page.screenshot({path: "ejemplo.png"});    
    }

   
}

test()