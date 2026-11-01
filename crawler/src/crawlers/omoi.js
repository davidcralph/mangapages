import { fetchPages } from '../util/fetch.js';

// omoi (formerly azuki) has no api, but the discover page is plain html
// the site id stays 'azuki' so the existing logo still matches
export default function omoi() {
  return fetchPages(
    (page) => `https://www.omoi.com/discover?sort=alphabetical&page=${page}`,
    ($) =>
      $('a.a-card-link[href^="/series/"]')
        .map((_, el) => ({
          title: $(el).text().trim(),
          site: 'azuki',
          url: 'https://www.omoi.com' + $(el).attr('href'),
        }))
        .get(),
  );
}
