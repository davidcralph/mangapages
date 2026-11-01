import { getText } from '../util/fetch.js';

export default async function viz() {
  // the search box loads its suggestions from a js file rather than an api
  // each one comes with the path to the series page, so no guessing urls
  const data = await getText('https://www.viz.com/search/series_titles.js');
  const series = JSON.parse(data.split('suggestions = ')[1].replaceAll(';', ''));

  return series.map((item) => ({
    title: item.title,
    site: 'viz',
    url: 'https://www.viz.com/' + item.vanityurl,
  }));
}
