const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const sleep = require('../util/sleep');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    // todo: automate this
    let currentPages = 4;
    let newArray = [];

    const page = await browser.newPage();

    for (let i = 0; i < currentPages; i++) {
        await sleep();
        await page.goto(`https://www.lezhinus.com/en/general?page=${i + 1}&sub_tags=all`);

        const list = await page.evaluate(() => {
            const items = document.querySelectorAll('.lzComic__item');
            let array = [];

            items.forEach(item => {
               try {
                array.push({
                    title: item.querySelector('.lzComic__title').innerText,
                    site: 'lezhinus',
                    url: item.querySelector('.lzComic__link').href
                 });
               } catch (e) {
                   // do nothing
               }
            });
            return array;
        });
        console.log(list)
        newArray = newArray.concat(list);
    }

    await browser.close();

    return newArray;
};
