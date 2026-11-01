import { fetchRandom, fetchSearch, type Title } from '@/lib/api';
import { isSearchPage, readUrlState } from '@/lib/url-state';

// request the first page's data as soon as the js loads (alongside the font wait in main.tsx)
// so the first render usually already has it and skips the loading state

const requests = new Map<string, Promise<Title[]>>();
const ready = new Map<string, Title[]>();

function start(key: string, request: Promise<Title[]>) {
  requests.set(key, request);
  request.then((data) => ready.set(key, data)).catch(() => {});
}

if (isSearchPage()) {
  const { query, type } = readUrlState();
  start(`random:${type}:0`, fetchRandom(type));
  if (query) {
    start(`search:${type}:${query}`, fetchSearch(query, type));
  }
}

export const prefetchDone = Promise.allSettled(requests.values());

// data that has already arrived, used for initial state
export function prefetchedData(key: string): Title[] | undefined {
  return ready.get(key);
}

// hands out the request once, after that it's a normal fetch
export function takePrefetch(key: string): Promise<Title[]> | undefined {
  const request = requests.get(key);
  requests.delete(key);
  return request;
}
