import { useLayoutEffect, useState, type RefObject } from 'react';

export const CARD_HEIGHT = 76;
export const CARD_GAP = 16;

// the pager and the space around it
const PAGER_HEIGHT = 56;
const BOTTOM_SPACE = 24;
const MIN_PAGE_SIZE = 3;

// final height of the compact hero in Hero.tsx
// using this rather than measuring keeps the count stable while the hero animates
function compactHeroHeight(): number {
  return window.matchMedia('(min-width: 40rem)').matches ? 208 : 256;
}

// how many cards fit on screen under the compact hero, list being the element holding them
export function usePageSize(list: RefObject<HTMLElement | null>): number {
  const [pageSize, setPageSize] = useState(MIN_PAGE_SIZE);

  useLayoutEffect(() => {
    function measure() {
      const main = list.current?.closest('main');
      if (!list.current || !main) {
        return;
      }

      // distance from the top of main, which doesn't change as the hero animates
      const offset = list.current.getBoundingClientRect().top - main.getBoundingClientRect().top;
      const space = window.innerHeight - compactHeroHeight() - offset - PAGER_HEIGHT - BOTTOM_SPACE;

      setPageSize(
        Math.max(Math.floor((space + CARD_GAP) / (CARD_HEIGHT + CARD_GAP)), MIN_PAGE_SIZE),
      );
    }

    // runs every render as the site filters above the list can change its offset
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  });

  return pageSize;
}
