const fetch = require('node-fetch');

module.exports = async (ua) => {
    const object = await (await fetch('https://inkr.com/_next/data/_IeSY9KOuROEerSslZgux/genres/Manga.json', { headers: { 'user-agent': ua }})).json();
    let newArray = [];
    object.pageProps.collectionTitleDetails.forEach(category => {
        category.titles.forEach(item => {
            newArray.push({
                title: item.name,
                site: 'inkr',
                url: 'https://inkr.com/' + item.oid
            });
        });
    });
    return newArray;
};
