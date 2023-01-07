const fetch = require('node-fetch');
const rateLimit = require('../struct/ratelimiter');

module.exports = async (req, res) => {
  try {
    await rateLimit(50, req.headers['x-real-ip']);
  } catch (error) {
    return res.status(429).send({
      message: 'Too many requests',
    });
  }

  if (!req.query.slug) {
    return res.status(401).send({
      message: 'Input param required',
    });
  }

  const data = await (
    await fetch(
      `https://myanimelist.net/search/prefix.json?type=manga&keyword=${req.query.slug}`
    )
  ).json();

  return res.redirect(data.categories[0].items[0].url, 302);
};
