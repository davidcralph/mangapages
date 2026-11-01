// crawler output, bundled at deploy time. run bun crawl to update it
import manga from '@/data/data.json';
import lightNovel from '@/data/dataLightNovel.json';
import manhwa from '@/data/dataManhwa.json';
import manhua from '@/data/dataManhua.json';

import type { Title } from '@/types';

const datasets: Record<string, Title[]> = {
  lightnovel: lightNovel,
  manhwa,
  manhua,
};

// unknown or missing types fall back to manga
export function getDataset(type?: string): Title[] {
  return (type && datasets[type]) || manga;
}
