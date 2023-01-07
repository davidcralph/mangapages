const data = require('../data.json');
const dataLightNovel = require('../dataLightNovel.json');
const dataManhwa = require('../dataManhwa.json');
const dataManhua = require('../dataManhua.json');
const { matchSorter } = require('match-sorter');
const rateLimit = require('../struct/ratelimiter');

module.exports = async (req, res) => {
  try {
    await rateLimit(500, req.headers['x-real-ip']);
  } catch (error) {
    return res.status(429).send({
      message: 'Too many requests'
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

  const mangaResults = req.query.input ? matchSorter(use, req.query.input, {
      keys: ['title', 'site'],
      threshold: matchSorter.rankings.WORD_STARTS_WITH
  }) : { message: 'Input query required' };

  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).send(mangaResults.slice(0, 300));
};
