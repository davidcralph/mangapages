import { useEffect, useEffectEvent, useRef, useState } from 'react';

import type { Title } from '@/lib/api';
import { prefetchedData, takePrefetch } from '@/lib/prefetch';

interface Result {
  key: string;
  data: Title[];
}

function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

// loads titles for key (null means don't load anything)
// the last response stays up while a newer one loads, so nothing flashes to a loading state
// only a change of key reloads, so key needs to cover everything load uses
export function useTitles(
  kind: 'random' | 'search',
  key: string | null,
  load: (signal: AbortSignal) => Promise<Title[]>,
) {
  const [result, setResult] = useState<Result | null>(() => {
    const data = key ? prefetchedData(`${kind}:${key}`) : undefined;
    return key && data ? { key, data } : null;
  });

  // data already in the first render, so the effect doesn't fetch it again
  // (otherwise a second random request would swap the cards)
  const prefilled = useRef(result?.key);
  // always calls the latest load without making it an effect dependency
  const loadLatest = useEffectEvent(load);

  useEffect(() => {
    if (!key || key === prefilled.current) {
      return;
    }
    prefilled.current = undefined;

    const controller = new AbortController();
    const request = takePrefetch(`${kind}:${key}`) ?? loadLatest(controller.signal);
    request
      .then((data) => {
        if (!controller.signal.aborted) {
          setResult({ key, data });
        }
      })
      .catch((error) => {
        if (!isAbort(error) && !controller.signal.aborted) {
          setResult({ key, data: [] });
        }
      });

    return () => controller.abort();
  }, [kind, key]);

  return { data: result?.data ?? null, loading: result?.key !== key };
}
