import { SITES } from '@/lib/sites';

export const API_URL: string = import.meta.env.VITE_API_URL ?? 'https://manga.davidcralph.co.uk';
export const CDN_URL = 'https://ik.imagekit.io/david/manga';

export const TITLE_TYPES = ['manga', 'light novel', 'manhwa', 'manhua'] as const;
export type TitleType = (typeof TITLE_TYPES)[number];

// labels for the type picker
export const TYPE_LABELS: Record<TitleType, string> = {
  manga: 'Manga',
  'light novel': 'Light novels',
  manhwa: 'Manhwa',
  manhua: 'Manhua',
};

export interface Source {
  site: string;
  url: string;
}

// site and url are the first source, sites has all of them
export interface Title extends Source {
  title: string;
  sites: Source[];
}

// plural used in text, e.g. "random light novels"
export function pluralType(type: TitleType): string {
  return type === 'light novel' ? 'light novels' : type;
}

function apiType(type: TitleType): string {
  return type.replace(' ', '');
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function fetchRandom(type: TitleType, signal?: AbortSignal): Promise<Title[]> {
  return getJson(`/random?type=${apiType(type)}`, signal);
}

export function fetchSearch(
  query: string,
  type: TitleType,
  signal?: AbortSignal,
): Promise<Title[]> {
  return getJson(`/search?input=${encodeURIComponent(query)}&type=${apiType(type)}`, signal);
}

// display name from the site list, falls back to the capitalised id
export function siteName(site: string): string {
  return SITES.find((s) => s.id === site)?.name ?? site.charAt(0).toUpperCase() + site.slice(1);
}

export function logoUrl(site: string): string {
  return `${CDN_URL}/logos/${site}.png`;
}
