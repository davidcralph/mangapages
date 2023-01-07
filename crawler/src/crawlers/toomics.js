const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (ua) => {
    const data = await (await fetch('https://toomics.com/en/webtoon/ranking', { headers: { 'user-agent': ua }})).text();
    const $ = cheerio.load(data);
    const newArray = [];
    $('li > .visual').each((_i, title) => {
        newArray.push({
            title: $(title).find('.title').text(),
            site: 'toomics',
            url: 'https://toomics.com' + $(title).find('a').attr('href')
        });
    });
    return newArray;
};
