const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const sleep = require('../util/sleep');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    // azuki has no api, unfortunately
    const browser = await puppeteer.launch();

    // todo: automate this
    let currentPages = 4;
    let newArray = [];

    const page = await browser.newPage();

    for (let i = 0; i < currentPages; i++) {
        await sleep();
        await page.goto('https://read.mangaplanet.com/browse?page=' + (i + 1));

        const list = await page.evaluate(() => {
            const divs = document.querySelectorAll('.linkbox');
            let array = [];

            divs.forEach(div => {
               array.push({
                  title: div.querySelector('h3').innerText,
                  site: 'mangaplanet',
                  url: div.querySelector('a').href
               });
            });
            return array;
        });
        newArray = newArray.concat(list);
    }

    await browser.close();

    return newArray;
};
