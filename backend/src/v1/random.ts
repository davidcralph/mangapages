import { Hono } from 'hono';

import { RANDOM_COUNT } from '@/constants';
import { getDataset } from '@/util/datasets';
import { rateLimit } from '@/util/ratelimit';

import type { AppEnv } from '@/types';

// fisher-yates on a copy, then take the first few
function sample<T>(items: T[], count: number): T[] {
  const copy = items.slice();

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

export default new Hono<AppEnv>().get('/', rateLimit('RL_RANDOM'), (c) => {
  const titles = sample(getDataset(c.req.query('type')), RANDOM_COUNT);
  return c.json(titles);
});
