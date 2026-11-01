import { Hono } from 'hono';

import { cors } from 'hono/cors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { HTTPException } from 'hono/http-exception';

import { limit } from '@/util/ratelimit';

import v1 from '@/v1';

import type { AppEnv } from '@/types';

const app = new Hono<AppEnv>();

app.use('*', cors({ origin: '*' }));
app.use('*', trimTrailingSlash());

app.route('/', v1);

app.notFound(async (c) => {
  await limit(c, 'RL_DEFAULT');
  return c.json({ message: 'Not found' }, 404);
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }

  return c.json({ message: 'Internal server error' }, 500);
});

export default app;
