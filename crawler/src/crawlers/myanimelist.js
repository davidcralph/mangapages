import { fetchPages } from '../util/fetch.js';

// mal api is garbage/non-existent, but the store search is plain html
export default function myanimelist() {
  return fetchPages(
    (page) => `https://myanimelist.net/store/search?keyword=&p=${page}`,
    ($) =>
      $('a.item')
        .map((_, el) => ({
          // the visible text gets cut short with "...", the full title is in the attribute
          title: $(el).find('.title').attr('title'),
          site: 'myanimelist',
          url: $(el).attr('href'),
        }))
        .get(),
  );
}
