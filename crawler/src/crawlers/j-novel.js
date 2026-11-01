import { getJson } from '../util/fetch.js';

// one list with both novels and manga, split by type
export default async function jNovel(novel = false) {
  const type = novel ? 'NOVEL' : 'MANGA';
  let series = [];

  for (let skip = 0; ; skip += 500) {
    const data = await getJson(
      `https://labs.j-novel.club/app/v2/series?format=json&limit=500&skip=${skip}`,
    );
    series = series.concat(data.series);

    if (data.pagination.lastPage) {
      break;
    }
  }

  return series
    .filter((item) => item.type === type && !item.hidden)
    .map((item) => ({
      title: item.title,
      site: 'j-novel',
      url: 'https://j-novel.club/series/' + item.slug,
    }));
}
