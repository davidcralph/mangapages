import { Hono } from 'hono';

import { MAL_SEARCH } from '@/constants';
import { safeFetchJson } from '@/util/fetch';
import { rateLimit } from '@/util/ratelimit';

import type { AppEnv } from '@/types';

interface MalSearch {
  categories?: { items?: { url: string }[] }[];
}

// redirects to the first myanimelist manga matching the slug
export default new Hono<AppEnv>().get('/:slug', rateLimit('RL_MAL'), async (c) => {
  const keyword = encodeURIComponent(c.req.param('slug'));
  const data = await safeFetchJson<MalSearch>(`${MAL_SEARCH}?type=manga&keyword=${keyword}`);

  const url = data.categories?.[0]?.items?.[0]?.url;
  if (!url) {
    return c.json({ message: 'Not found' }, 404);
  }

  return c.redirect(url, 302);
});
