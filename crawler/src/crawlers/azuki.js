const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const sleep = require('../util/sleep');
const { executablePath } = require('puppeteer');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    // azuki has no api, unfortunately
    const browser = await puppeteer.launch({
        executablePath: executablePath()
    });

    // todo: automate this
    let currentPages = 4;
    let newArray = [];

    const page = await browser.newPage();

    for (let i = 0; i < currentPages; i++) {
        await sleep();
        await page.goto('https://www.azuki.co/series/' + (i + 1));

        const list = await page.evaluate(() => {
            const titles = document.querySelectorAll('.a-card-link');
            let array = [];

            titles.forEach(title => {
               array.push({
                  title: title.innerText,
                  site: 'azuki',
                  url: 'https://www.azuki.co/series/' + title.innerText.toLowerCase().replaceAll(' ', '-').replace(/[^a-zA-Z ]/g, '')
               });
            });
            return array;
        });
        newArray = newArray.concat(list);
    }

    await browser.close();

    return newArray;
};
