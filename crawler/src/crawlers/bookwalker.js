const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const sleep = require('../util/sleep');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async (novel) => {
    // bookwalker also has no api, unfortunately
    // it also has 40 pages! do you have any idea how long it takes to load all this?
    const browser = await puppeteer.launch();

    // todo: automate this
    let currentPages = 40;
    let newArray = [];

    let baseUrl = 'https://global.bookwalker.jp/categories/2/?np=0&page=';
    if (novel === true) {
        baseUrl = 'https://global.bookwalker.jp/categories/3/?np=0&page=';
        currentPages = 7;
    }

    const page = await browser.newPage();
    for (let i = 0; i < currentPages; i++) {
        await sleep();
        await page.goto(baseUrl + (i + 1));

        const list = await page.evaluate(() => {
            const titles = document.querySelectorAll('.a-tile-ttl a');
            let array = [];

            titles.forEach(title => {
               array.push({
                  title: title.innerText,
                  site: 'bookwalker',
                  url: title.href
               });
            });
            return array;
        });
        newArray = newArray.concat(list);
    }

    await browser.close();

    return newArray;
};
