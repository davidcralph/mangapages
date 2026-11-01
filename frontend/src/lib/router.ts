import { useSyncExternalStore, type MouseEvent } from 'react';

// tiny client side router, there's only a few pages so no need for a library
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('popstate', callback);

  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

export function usePath(): string {
  // trailing slashes are ignored, e.g. /list/ is the same as /list
  return useSyncExternalStore(subscribe, () => window.location.pathname.replace(/(.)\/$/, '$1'));
}

export function navigate(to: string) {
  if (to === `${window.location.pathname}${window.location.search}`) {
    return;
  }

  window.history.pushState(null, '', to);
  window.scrollTo(0, 0);
  listeners.forEach((listener) => listener());
}

// onClick for internal links, lets ctrl/middle click still open a new tab
export function linkClick(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  navigate(event.currentTarget.getAttribute('href') ?? '/');
}
