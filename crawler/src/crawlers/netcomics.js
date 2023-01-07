const fetch = require('node-fetch');

module.exports = async (ua) => {
    const object = await (await fetch('https://beta-api.netcomics.com/api/v1/title/search/text?no=1&size=500000&text=', { headers: { 'user-agent': ua }})).json();
    let newArray = [];
    object.data.forEach(item => {
        newArray.push({
            title: item.title_name,
            site: 'netcomics',
            url: 'https://www.netcomics.com/us/comic/' + item.title_name.toLowerCase().replaceAll(' ', '-').replace(/[^a-zA-Z ]/g, '')
        });
    });
    return newArray;
};
