const comixology = require('./crawlers/myanimelist.js');
const fs = require('fs');

comixology().then(comixology => { 
    console.log(comixology); 
    fs.writeFileSync('./comixology.json', JSON.stringify(comixology));
});