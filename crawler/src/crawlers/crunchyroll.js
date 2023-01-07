const puppeteer = require('puppeteer-extra');
const cheerio = require('cheerio');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    // crunchyroll uses cloudflare so we try to not be a robot
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.crunchyroll.com/comics/manga/alpha?group=all');
    // todo: stop using cheerio
    const $ = cheerio.load(await page.content());

    let newArray = [];
    $('.group-item').each((_i, title) => {
        const text = $(title).text();
        newArray.push({
            title: text.replace('\\n', '').trim(),
            site: 'crunchyroll',
            url: 'https://www.crunchyroll.com/comics/manga/' + text.replace('\\n', '').toLowerCase().trim() + '/volumes'
        });
    });

    await browser.close();

    return newArray;
};
