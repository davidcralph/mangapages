import * as cheerio from 'cheerio';

import { getText } from '../util/fetch.js';

// only the ranking page, which is family safe
export default async function toomics() {
  const $ = cheerio.load(await getText('https://toomics.com/en/webtoon/ranking'));

  return $('li > .visual')
    .map((_, el) => ({
      title: $(el).find('.title').text().trim(),
      site: 'toomics',
      url: 'https://toomics.com' + $(el).find('a').attr('href'),
    }))
    .get();
}
