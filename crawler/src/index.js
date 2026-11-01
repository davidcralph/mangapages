import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// bookwalker is disabled for now, its catalogue moved to bookwalker.com behind a cloudflare bot check
// import bookwalker from './crawlers/bookwalker.js';
import jNovel from './crawlers/j-novel.js';
import mangaplus from './crawlers/mangaplus.js';
import myanimelist from './crawlers/myanimelist.js';
import omoi from './crawlers/omoi.js';
import renta from './crawlers/renta.js';
import toomics from './crawlers/toomics.js';
import viz from './crawlers/viz.js';

// the worker bundles these files, so redeploy the backend after a crawl
const OUTPUT = new URL('../../backend/src/data/', import.meta.url);

// one file per type, each with the crawlers for it
// the site id is used to keep old results if a crawler breaks
const TYPES = {
  'data.json': [
    { site: 'viz', crawl: viz },
    { site: 'j-novel', crawl: () => jNovel() },
    { site: 'mangaplus', crawl: mangaplus },
    { site: 'azuki', crawl: omoi },
    // { site: 'bookwalker', crawl: () => bookwalker() },
    { site: 'myanimelist', crawl: myanimelist },
    { site: 'renta', crawl: renta },
  ],
  'dataLightNovel.json': [
    { site: 'j-novel', crawl: () => jNovel(true) },
    // { site: 'bookwalker', crawl: () => bookwalker(true) },
  ],
  'dataManhwa.json': [{ site: 'toomics', crawl: toomics }],
  // no manhua sites at the moment
  'dataManhua.json': [],
};

function readExisting(file) {
  try {
    return JSON.parse(readFileSync(new URL(file, OUTPUT), 'utf8'));
  } catch {
    return [];
  }
}

if (!existsSync(OUTPUT)) {
  mkdirSync(OUTPUT, { recursive: true });
}

// optionally only crawl some sites, e.g. bun crawl viz toomics
const only = process.argv.slice(2);

for (const [file, crawlers] of Object.entries(TYPES)) {
  const existing = readExisting(file);
  let titles = [];

  for (const { site, crawl } of crawlers) {
    if (only.length && !only.includes(site)) {
      titles = titles.concat(existing.filter((title) => title.site === site));
      continue;
    }

    try {
      const results = (await crawl()).filter((title) => title.title && title.url);
      if (results.length === 0) {
        throw new Error('no titles found, the site layout probably changed');
      }

      titles = titles.concat(results);
      console.info(`${file}: ${site} found ${results.length} titles`);
    } catch (error) {
      // keep what we had before rather than losing the whole site
      const old = existing.filter((title) => title.site === site);
      titles = titles.concat(old);
      console.error(`${file}: ${site} failed (${error.message}), kept ${old.length} old titles`);
    }
  }

  writeFileSync(new URL(file, OUTPUT), JSON.stringify(titles));
  console.info(`${file}: wrote ${titles.length} titles`);
}
