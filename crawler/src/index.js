const Interval = require('./util/interval.js');
const crawl = require('./util/crawl.js');
const fs = require('fs');

if (!fs.existsSync('./data.json')) { 
    fs.writeFileSync('./data.json', '[]');
    console.info('Created data.json file');
}

let data = require('./data.json');
if (data.length === 0) {
    console.info('Crawl started..');
    crawl(log).then(() => {
        // refresh data
        delete require.cache[require.resolve('./data.json')];
        data = require('./data.json');
        console.info('Crawl finished!');
    });
}

// in theory, this should get new data every week. 
// chances are, this will break horribly and the whole thing will fail
Interval(() => {
    console.info('Crawl started..');
    crawl(log).then(() => {
        // refresh data
        delete require.cache[require.resolve('./data.json')];
        data = require('./data.json');
        console.info('Crawl finished!');
    });
 }, Number(604800000), 'crawl');