import { Hono } from 'hono';

import { VERSION } from '@/constants';
import { rateLimit } from '@/util/ratelimit';

import random from '@/v1/random';
import search from '@/v1/search';
import mal from '@/v1/mal';

import type { AppEnv } from '@/types';

export default new Hono<AppEnv>()
  .get('/', rateLimit('RL_DEFAULT'), (c) => c.json({ version: VERSION, message: 'Hello World!' }))
  .route('/random', random)
  .route('/search', search)
  .route('/mal', mal);
