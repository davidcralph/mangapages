const fetch = require('node-fetch');
const sleep = require('../util/sleep.js');

module.exports = async (ua) => {
    // user agent is set so we don't look like a bot and get IP banned
    // worst case scenario is the site blocks outside requests and that will suck
    const data = await (await fetch('https://inky-pen.com/catalog/get?page=0&typeID=2', { headers: { 'user-agent': ua }})).json();
    let count = 0;
    let newArray = [];
    sleep();
    for (let i = 0; i < data.totalPages; i++) {
        await sleep();
        const data = await (await fetch(`https://inky-pen.com/catalog/get?page=${count}&typeID=2`, { headers: { 'user-agent': ua }})).json();
        const object = data.viewModels;
        object.forEach(item => {
            newArray.push({
                title: item.title,
                site: 'inky',
                url: 'https://www.nintendo.com/games/detail/inkypen-switch/'
            });
        });
        count++;
    }
    return newArray;
};
