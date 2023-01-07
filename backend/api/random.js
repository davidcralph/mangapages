const data = require('../data.json');
const dataLightNovel = require('../dataLightNovel.json');
const dataManhwa = require('../dataManhwa.json');
const dataManhua = require('../dataManhua.json');
const rateLimit = require('../struct/ratelimiter');

module.exports = async (req, res) => {
  try {
    await rateLimit(100, req.headers['x-real-ip']);
  } catch (error) {
    return res.status(429).send({
      message: 'Too many requests',
    });
  }

  let use = data;
  switch (req.query.type) {
    case 'lightnovel':
      use = dataLightNovel;
      break;
    case 'manhwa':
      use = dataManhwa;
      break;
    case 'manhua':
      use = dataManhua;
      break;
    default:
      break;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).send(use.sort(() => Math.random() - 0.5).slice(-4));
};
