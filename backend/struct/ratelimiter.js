const config = require('../config.json');
const ratelimit = require('lambda-rate-limiter');

module.exports = ratelimit({
  interval: config.ratelimit.time * 1000
}).check;
