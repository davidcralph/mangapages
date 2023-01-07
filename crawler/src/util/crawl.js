const fs = require('fs');

const viz = require('../crawlers/viz.js');
const inky = require('../crawlers/inky.js');
const netcomics = require('../crawlers/netcomics.js');
const crunchy = require('../crawlers/crunchyroll.js');
const mangaplus = require('../crawlers/mangaplus.js');
const azuki = require('../crawlers/azuki.js');
const bookwalker = require('../crawlers/bookwalker.js');

module.exports = async (log) => {
    let newArray = [];
    // this is my personal edge user agent
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62';
    // node-fetch
    newArray = newArray.concat(await viz(ua));
    log.info('Crawl Viz done');
    newArray = newArray.concat(await netcomics(ua));
    log.info('Crawl Netcomics done');
    newArray = newArray.concat(await inky(ua));
    log.info('Crawl Inky done');

    // puppeteer
    newArray = newArray.concat(await crunchy());
    log.info('Crawl Crunchyroll done');
    newArray = newArray.concat(await mangaplus());
    log.info('Crawl MangaPlus done');
    newArray = newArray.concat(await azuki());
    log.info('Crawl Azuki done');
    newArray = newArray.concat(await bookwalker());
    log.info('Crawl Bookwalker done');

    fs.writeFileSync('./data.json', JSON.stringify(newArray));
    log.info('Crawl write file done');
    Promise.resolve('Success');
};
