const fetch = require('node-fetch');

module.exports = async (ua, novel) => {
    let url = 'https://api.j-novel.club/api/mangaSeries';
    if (novel === true) {
        url = 'https://api.j-novel.club/api/series';
    }

    const object = await (await fetch(url, { headers: { 'user-agent': ua }})).json();
    let newArray = [];
    object.forEach(item => {
        newArray.push({
            title: item.title,
            site: 'j-novel',
            url: 'https://j-novel.club/series/' + item.titleslug
        });
    });
    return newArray;
};
