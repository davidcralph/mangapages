const fs = require('fs');

const jNovel = require('../crawlers/j-novel.js');
const bookwalker = require('../crawlers/bookwalker.js');

const doStuff = async () => {
    let newArray = [];
    // this is my personal edge user agent
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62';
    // node-fetch
    newArray = newArray.concat(await jNovel(ua, true));
    console.info('Crawl J-Novel done');

    // puppeteer
    newArray = newArray.concat(await bookwalker(true));
    console.info('Crawl BOOKWALKER done');

    fs.writeFileSync('./dataTest.json', JSON.stringify(newArray));
    console.info('Crawl write file done');
}

doStuff();
