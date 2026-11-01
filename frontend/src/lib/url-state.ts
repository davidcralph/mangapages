import { TITLE_TYPES, type TitleType } from '@/lib/api';

// search state lives in the query string so searches can be shared
// e.g. /?q=one+piece&type=lightnovel&sites=viz,mangaplus&page=2
export interface UrlState {
  query: string;
  type: TitleType;
  sites: string[];
  page: number;
}

// the search page is the only page that uses this state
export function isSearchPage(): boolean {
  const path = window.location.pathname;
  return path === '/' || path === '/index.html';
}

const typeParam = (type: TitleType) => type.replace(' ', '');

export function readUrlState(): UrlState {
  const params = new URLSearchParams(window.location.search);
  const type = TITLE_TYPES.find((t) => typeParam(t) === params.get('type')) ?? 'manga';
  const sites = (params.get('sites') ?? '').split(',').filter(Boolean);

  const page = Math.max(parseInt(params.get('page') ?? '', 10) || 1, 1);

  return { query: params.get('q') ?? '', type, sites, page };
}

export function writeUrlState({ query, type, sites, page }: UrlState): void {
  const params = new URLSearchParams();

  if (query) {
    params.set('q', query);
  }

  if (type !== 'manga') {
    params.set('type', typeParam(type));
  }

  if (query && sites.length) {
    params.set('sites', sites.join(','));
  }

  if (query && page > 1) {
    params.set('page', String(page));
  }

  // commas are fine in a query string, keeps shared links readable
  const search = params.toString().replaceAll('%2C', ',');
  const url = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;

  // replace instead of push so typing doesn't add a history entry per key
  if (url !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history.replaceState(window.history.state, '', url);
  }
}
