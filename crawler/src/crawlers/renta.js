const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const sleep = require('../util/sleep');

puppeteer.use(StealthPlugin());
puppeteer.use(BlockResourcesPlugin(new Set(['image', 'stylesheet', 'script', 'font'])));

module.exports = async () => {
    // renta has no api, unfortunately
    const browser = await puppeteer.launch();

    // todo: automate this
    let categories = [{
        name: 'Shonen_Manga',
        pages: 3
    },{
        name: 'Shojo_Manga',
        pages: 7
    }];
    
    let newArray = [];

    const page = await browser.newPage();

    categories.forEach(category => {
        for (let i = 0; i < category.pages; i++) {
            await sleep();
            await page.goto(`https://www.ebookrenta.com/renta/sc/frm/list?rsi=c&genm=${category.name}&page=${i + 1}&type=desc&col=info`);
    
            const list = await page.evaluate(() => {
                const titles = document.querySelectorAll('.headlines > a');
                let array = [];
    
                titles.forEach(title => {
                   array.push({
                      title: title.innerText,
                      site: 'renta',
                      url: title.href
                   });
                });
                return array;
            });
            newArray = newArray.concat(list);
        }
    });

    await browser.close();

    return newArray;
};
