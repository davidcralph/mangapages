import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import BlockResourcesPlugin from 'puppeteer-extra-plugin-block-resources';

import sleep from './sleep.js';

// try not to look like a robot, and skip loading stuff we don't need
// scripts are allowed since some sites (mangaplus, omoi) only render with js
puppeteer.use(StealthPlugin());
puppeteer.use(
  BlockResourcesPlugin({ blockedTypes: new Set(['image', 'stylesheet', 'font', 'media']) }),
);

export function launch() {
  return puppeteer.launch();
}

// for sites with numbered pages, runs scrape on each page and joins the results
// scrape runs inside the page, so it can't use anything from this file
export async function crawlPages(urls, scrape) {
  const browser = await launch();
  const page = await browser.newPage();
  let titles = [];

  try {
    for (const url of urls) {
      await sleep();
      await page.goto(url);
      titles = titles.concat(await page.evaluate(scrape));
    }
  } finally {
    await browser.close();
  }

  return titles;
}

// [1, 2, ..., count]
export function pageNumbers(count) {
  return Array.from({ length: count }, (_, i) => i + 1);
}
