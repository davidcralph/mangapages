// crawler output, bundled at deploy time. run bun crawl to update it
import manga from '@/data/data.json';
import lightNovel from '@/data/dataLightNovel.json';
import manhwa from '@/data/dataManhwa.json';
import manhua from '@/data/dataManhua.json';

import type { CrawledTitle, Title } from '@/types';

// ignores case, accents and punctuation, as sites write the same title differently
// e.g. "86 Eighty-Six" and "86--EIGHTY-SIX", or "Juni Taisen" and "Juni Taisen (Manga)"
function titleKey(title: string): string {
  const key = title
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\(manga\)\s*$/, '')
    .replaceAll('&', 'and')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

  return key || title;
}

// one entry per title, with one link per site
function mergeTitles(titles: CrawledTitle[]): Title[] {
  const merged = new Map<string, Title>();

  for (const { title, site, url } of titles) {
    const key = titleKey(title);
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, { title: title.trim(), site, url, sites: [{ site, url }] });
    } else if (!existing.sites.some((source) => source.site === site)) {
      existing.sites.push({ site, url });
    }
  }

  return [...merged.values()];
}

const datasets: Record<string, Title[]> = {
  lightnovel: mergeTitles(lightNovel),
  manhwa: mergeTitles(manhwa),
  manhua: mergeTitles(manhua),
};
const mangaTitles = mergeTitles(manga);

// unknown or missing types fall back to manga
export function getDataset(type?: string): Title[] {
  return (type && datasets[type]) || mangaTitles;
}
