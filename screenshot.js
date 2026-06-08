const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set viewport to exactly 1080x1350 (4:5 Instagram portrait)
    await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
    
    const filePath = path.resolve(__dirname, 'prodaja-drone-kreativa.html');
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });
    
    // Hide controls panel
    await page.evaluate(() => {
        const controls = document.getElementById('controls');
        if (controls) controls.style.display = 'none';
    });

    // Screenshot just the creative container
    const element = await page.$('.creative-container');
    await element.screenshot({
        path: path.resolve(__dirname, 'prodaja_drone_kreativa.png'),
        type: 'png'
    });
    
    console.log('Screenshot saved as prodaja_drone_kreativa.png');
    await browser.close();
})();
