const fetch = require('node-fetch');

module.exports = async (ua) => {
    const data = await (await fetch('https://www.viz.com/search/series_titles.js', { headers: { 'user-agent': ua }})).text();
    // site uses weird code
    const object = JSON.parse(data.split('suggestions = ')[1].replaceAll(';',''));
    let newArray = [];
    object.forEach(async item => {
        const slug = item.title.toLowerCase().replaceAll(' ', '-');
        let url = 'https://www.viz.com/' + slug;
        // viz site sucks so we have to manually get the url for some things
        if (!item.title.replaceAll(' ', '').match(/^[0-9a-z]+$/)) {
            url = '/viz/' + slug;
        }

        newArray.push({
            title: item.title,
            site: 'viz',
            url: url
        });
    });
    return newArray;
};
