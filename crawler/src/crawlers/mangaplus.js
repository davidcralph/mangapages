import { scrollPageToBottom } from 'puppeteer-autoscroll-down';

import { launch } from '../util/browser.js';
import sleep from '../util/sleep.js';

// the site is all javascript, so puppeteer it is
// the old "all" list is split into these now
const LISTS = ['ongoing', 'completed', 'one_shot'];

export default async function mangaplus() {
  const browser = await launch();
  let titles = [];

  try {
    const page = await browser.newPage();

    for (const list of LISTS) {
      await sleep();
      await page.goto(`https://mangaplus.shueisha.co.jp/manga_list/${list}`);
      // class names end in a build hash, so only match the start
      await page.waitForSelector('a[class*="AllTitle-module_allTitle"]');
      await scrollPageToBottom(page);

      titles = titles.concat(
        await page.evaluate(() =>
          [...document.querySelectorAll('a[class*="AllTitle-module_allTitle"]')].map((link) => ({
            title: link.querySelector('p[class*="AllTitle-module_title_"]').innerText,
            site: 'mangaplus',
            url: link.href,
          })),
        ),
      );
    }
  } finally {
    await browser.close();
  }

  return titles;
}
