const fs = require('fs');

module.exports = class LocalStorage {
    static getItem(key) {
        if (!fs.existsSync(`./${key}.txt`)) {
            return null;
        }
        return fs.readFileSync(`./${key}.txt`);
    }

    static setItem(key, value) {
        fs.writeFileSync(`./${key}.txt`, String(value));
    }
};
