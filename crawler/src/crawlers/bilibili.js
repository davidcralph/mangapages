const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const scrollPageToBottom = require('puppeteer-autoscroll-down');
const sleep = require('../util/sleep');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    // until i can figure out how their api works, we will have to do with using puppeteer
    // slower, but works
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.bilibilicomics.com/genre');

    await scrollPageToBottom(page);
    await sleep();
    await scrollPageToBottom(page);

    const list = await page.evaluate(() => {
        let newArray = [];
        // this will probably need changing often
        const divs = document.querySelectorAll('.text-info-section');

        divs.forEach(div => {
           newArray.push({
              title: div.querySelector('.manga-title').innerText,
              site: 'bilibili',
              url: div.querySelector('a').href,
           });
        });
    
        return newArray;
    });
    
    await browser.close();

    return list;
};
