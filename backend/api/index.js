const config = require('../config.json');
const rateLimit = require('../struct/ratelimiter');

module.exports = async (req, res) => {
  try {
    await rateLimit(30, req.headers['x-real-ip']);
  } catch (error) {
    return res.status(429).send({
      message: 'Too many requests'
    });
  }

  return res.status(200).send(config.helloworld);
};
