// sites the crawler covers, id matches the site field in the api data (and the logo filename)
export interface Site {
  id: string;
  name: string;
  url: string;
  types: string;
}

export const SITES: Site[] = [
  // bookwalker is disabled for now, its catalogue moved to bookwalker.com behind a cloudflare bot check
  // { id: 'bookwalker', name: 'BOOK☆WALKER Global', url: 'https://bookwalker.com', types: 'Manga and light novels' },
  {
    id: 'j-novel',
    name: 'J-Novel Club',
    url: 'https://j-novel.club',
    types: 'Manga and light novels',
  },
  {
    id: 'mangaplus',
    name: 'MangaPlus',
    url: 'https://mangaplus.shueisha.co.jp/updates',
    types: 'Manga',
  },
  { id: 'myanimelist', name: 'MyAnimeList', url: 'https://myanimelist.net/store', types: 'Manga' },
  // formerly azuki, the id is kept so existing data and the logo still match
  { id: 'azuki', name: 'Omoi', url: 'https://www.omoi.com', types: 'Manga' },
  { id: 'renta', name: 'Renta', url: 'https://www.ebookrenta.com', types: 'Manga' },
  { id: 'viz', name: 'VIZ', url: 'https://www.viz.com', types: 'Manga' },
  { id: 'toomics', name: 'Toomics', url: 'https://toomics.com', types: 'Manhwa (SFW mode)' },
];
