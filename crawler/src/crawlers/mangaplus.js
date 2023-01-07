const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down');
const { executablePath } = require('puppeteer');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    // until i can figure out how their api works, we will have to do with using puppeteer
    // slower, but works
    const browser = await puppeteer.launch({
        executablePath: executablePath()
    });
    const page = await browser.newPage();
    await page.goto('https://mangaplus.shueisha.co.jp/manga_list/all');

    await page.waitForSelector('.AllTitle-module_image_JIEI9', {
        visible: true
    });

    await scrollPageToBottom(page);

    const list = await page.evaluate(() => {
        let newArray = [];
        // this will probably need changing often
        const divs = document.querySelectorAll('.AllTitle-module_allTitle_1CIUC');

        divs.forEach(div => {
           newArray.push({
              title: div.querySelector('.AllTitle-module_title_20PzS').innerText,
              site: 'mangaplus',
              url: 'https://mangaplus.shueisha.co.jp/titles/' + div.querySelector('.AllTitle-module_image_JIEI9').src.split('/title/')[1].split('/')[0].toLowerCase().replaceAll(' ', '-'),
           });
        });
    
        return newArray;
    });
    
    await browser.close();

    return list;
};
