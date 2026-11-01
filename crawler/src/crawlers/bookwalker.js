import { crawlPages, pageNumbers } from '../util/browser.js';

// bookwalker has no api, unfortunately
// it also has 40 pages! do you have any idea how long it takes to load all this?
// todo: work out the page count automatically
export default function bookwalker(novel = false) {
  const category = novel ? 3 : 2;
  const pages = novel ? 7 : 40;

  return crawlPages(
    pageNumbers(pages).map(
      (page) => `https://global.bookwalker.jp/categories/${category}/?np=0&page=${page}`,
    ),
    () =>
      [...document.querySelectorAll('.a-tile-ttl a')].map((link) => ({
        title: link.innerText,
        site: 'bookwalker',
        url: link.href,
      })),
  );
}
