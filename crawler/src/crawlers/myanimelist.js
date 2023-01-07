const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const sleep = require('../util/sleep');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    // MAL api is garbage/non-existant
    const browser = await puppeteer.launch({
        headless: false
    });

    // todo: automate this
    let currentPages = 10;
    let newArray = [];

    const page = await browser.newPage();

    for (let i = 0; i < currentPages; i++) {
        await sleep();
        await page.goto('https://myanimelist.net/store/search?keyword=&p=' + (i + 1));

        const list = await page.evaluate(() => {
            const items = document.querySelectorAll('.item');
            let array = [];

            items.forEach(item => {
               try {
                array.push({
                    title: item.querySelector('.title').innerText,
                    site: 'myanimelist',
                    url: item.href
                 });
               } catch (e) {
                   // do nothing
               }
            });
            return array;
        });
        newArray = newArray.concat(list);
    }

    await browser.close();

    return newArray;
};
