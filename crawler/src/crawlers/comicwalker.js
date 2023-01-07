const esmImport = require('esm')(module);
const { CookieJar, fetch } = esmImport('node-fetch-cookies');
const cheerio = require('cheerio');
const sleep = require('../util/sleep');
const fs = require('fs');

module.exports = async (ua) => {
    if (!fs.existsSync('../comicwalker.json')) {
        fs.writeFileSync('../comicwalker.json', '[]');
    }
    const cookieJar = new CookieJar();

    await (await fetch(cookieJar, 'https://comic-walker.com/set_lang/en/', { headers: { 'user-agent': ua }}));
    const data = await (await fetch(cookieJar, 'https://comic-walker.com/', { headers: { 'user-agent': ua }})).text();
    const $ = cheerio.load(data);
    let categories = [];
    $('#sideMagazineLabel a').each((i, el) => categories.push('https://comic-walker.com' + $(el).attr('href')));
    await sleep();
    categories.forEach(async (category) => {
        await sleep();
        const data2 = await (await fetch(cookieJar, category, { headers: { 'user-agent': ua }})).text();
        const $$ = cheerio.load(data2);
        let array = JSON.parse(fs.readFileSync('../comicwalker.json'));
        $$('.tileList li').each((i, el) => { 
            array.push({
                title: $(el).children('a').children('h3').children('span').text(),
                site: 'comicwalker',
                url: 'https://comic-walker.com' + $(el).children('a').attr('href'),
            });
        });
        fs.writeFileSync('../comicwalker.json', JSON.stringify(array));
    });

    return fs.readFileSync('../comicwalker.json', 'utf8');
};
