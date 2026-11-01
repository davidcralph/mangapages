import { Hono } from 'hono';

import { validator } from 'hono/validator';

import { matchSorter, rankings } from 'match-sorter';

import { SEARCH_LIMIT } from '@/constants';
import { getDataset } from '@/util/datasets';
import { rateLimit } from '@/util/ratelimit';

import type { AppEnv } from '@/types';

export default new Hono<AppEnv>().get(
  '/',
  rateLimit('RL_SEARCH'),
  validator('query', (value, c) => {
    const { input, type } = value;
    if (typeof input !== 'string' || !input) {
      return c.json({ message: 'Input query required' }, 400);
    }

    return { input, type: typeof type === 'string' ? type : undefined };
  }),
  (c) => {
    const { input, type } = c.req.valid('query');

    const results = matchSorter(getDataset(type), input, {
      keys: ['title', 'site'],
      threshold: rankings.WORD_STARTS_WITH,
    });

    return c.json(results.slice(0, SEARCH_LIMIT));
  },
);
