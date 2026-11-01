import type { Context, MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

import type { AppEnv } from '@/types';

// rate limit bindings, each configured with its own per-ip limit in wrangler.jsonc
type Limiter = 'RL_DEFAULT' | 'RL_MAL' | 'RL_RANDOM' | 'RL_SEARCH';

export async function limit(c: Context<AppEnv>, limiter: Limiter) {
  const key = c.req.header('CF-Connecting-IP') ?? 'unknown';
  const { success } = await c.env[limiter].limit({ key });

  if (!success) {
    throw new HTTPException(429, { message: 'Too many requests' });
  }
}

export function rateLimit(limiter: Limiter): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    await limit(c, limiter);
    await next();
  };
}
