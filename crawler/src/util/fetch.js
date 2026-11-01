import * as cheerio from 'cheerio';

import sleep from './sleep.js';

// a normal browser user agent, some sites block anything else
export const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0';

export async function get(url, headers = {}) {
  const res = await fetch(url, { headers: { 'user-agent': UA, ...headers } });
  if (!res.ok) {
    throw new Error(`${url} returned ${res.status}`);
  }

  return res;
}

export async function getJson(url) {
  return (await get(url)).json();
}

export async function getText(url, headers) {
  return (await get(url, headers)).text();
}

// for server rendered sites with numbered pages, keeps going until a page has nothing new
// (some sites show an empty page at the end, others just repeat the last one)
// parse gets the page loaded into cheerio and returns that page's titles
export async function fetchPages(urlForPage, parse) {
  const titles = new Map();

  // the cap is a backstop in case a site never stops
  for (let page = 1; page <= 500; page++) {
    if (page > 1) {
      await sleep();
    }

    const found = parse(cheerio.load(await getText(urlForPage(page)))).filter(
      (title) => !titles.has(title.url),
    );
    if (found.length === 0) {
      break;
    }

    for (const title of found) {
      titles.set(title.url, title);
    }
  }

  return [...titles.values()];
}
