import { HTTPException } from 'hono/http-exception';

export async function safeFetchJson<T>(url: string, opts?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, opts);
  } catch {
    throw new HTTPException(503, { message: 'Upstream service unavailable' });
  }

  if (!res.ok) {
    throw new HTTPException(503, { message: `Upstream error: ${res.status}` });
  }

  try {
    return (await res.json()) as T;
  } catch {
    throw new HTTPException(503, { message: 'Invalid response from upstream service' });
  }
}
