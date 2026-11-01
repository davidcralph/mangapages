import type { ReactNode } from 'react';

import HeroBackground from '@/components/HeroBackground';
import Navbar from '@/components/Navbar';

import { navigate } from '@/lib/router';
import { cn } from '@/lib/utils';

interface HeroProps {
  // defaults to going back to the search page
  onLogoClick?: () => void;
  // grow to fill the page height (used on the 404 page)
  fill?: boolean;
  // shrink out of the way of search results, the height is also in use-page-size.ts
  compact?: boolean;
  className?: string;
  children?: ReactNode;
}

const goHome = () => navigate('/');

// photo header shared by every page
export default function Hero({
  onLogoClick = goHome,
  fill,
  compact,
  className,
  children,
}: HeroProps) {
  return (
    // min height matches the search page hero so every page lines up
    <header
      className={cn(
        'relative flex flex-col text-white transition-[min-height] duration-300 ease-out motion-reduce:transition-none',
        fill && 'flex-1',
        !fill && (compact ? 'min-h-64 sm:min-h-52' : 'min-h-[35.75rem] sm:min-h-[36.75rem]'),
      )}
    >
      <HeroBackground />
      {/* darken the photo so the text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/60 dark:from-black/80 dark:via-black/70 dark:to-black/80"
      />
      <div className="relative flex flex-1 flex-col">
        <Navbar onLogoClick={onLogoClick} />
        {children && (
          <div
            className={cn(
              'mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center gap-5 px-4 text-center transition-[padding,gap] duration-300 ease-out motion-reduce:transition-none',
              className,
            )}
          >
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

export const heroTitle =
  'text-5xl font-semibold tracking-tight text-balance drop-shadow-[0_2px_8px_rgb(0_0_0/0.6)] sm:text-6xl';
export const heroText =
  'max-w-lg text-base text-white drop-shadow-[0_1px_4px_rgb(0_0_0/0.7)] sm:text-lg';
