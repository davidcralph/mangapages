import { crawlPages, pageNumbers } from '../util/browser.js';

// renta has no api, unfortunately
// todo: work out the page counts automatically
const CATEGORIES = [
  { name: 'Shonen_Manga', pages: 3 },
  { name: 'Shojo_Manga', pages: 7 },
];

export default function renta() {
  const urls = CATEGORIES.flatMap((category) =>
    pageNumbers(category.pages).map(
      (page) =>
        `https://www.ebookrenta.com/renta/sc/frm/list?rsi=c&genm=${category.name}&page=${page}&type=desc&col=info`,
    ),
  );

  return crawlPages(urls, () =>
    [...document.querySelectorAll('.headlines > a')].map((link) => ({
      title: link.innerText,
      site: 'renta',
      url: link.href,
    })),
  );
}
