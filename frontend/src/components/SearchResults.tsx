import { useRef } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import TitleCard from '@/components/TitleCard';
import { Button } from '@/components/ui/button';

import { logoUrl, pluralType, siteName, type Title, type TitleType } from '@/lib/api';
import { CARD_GAP, CARD_HEIGHT, usePageSize } from '@/lib/use-page-size';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  data: Title[];
  loading: boolean;
  type: TitleType;
  // selected sites, empty means all of them
  sites: string[];
  onSitesChange: (sites: string[]) => void;
  page: number;
  onPageChange: (page: number) => void;
}

function resultsText(count: number, type: TitleType): string {
  if (count === 0) {
    return `No ${pluralType(type)} found`;
  }

  if (count === 1) {
    return '1 result';
  }

  return `${count} results`;
}

export default function SearchResults({
  data,
  loading,
  type,
  sites,
  onSitesChange,
  page,
  onPageChange,
}: SearchResultsProps) {
  const list = useRef<HTMLDivElement>(null);
  const pageSize = usePageSize(list);

  // sites in the results, plus any still selected so they can be turned off
  const siteCounts = new Map<string, number>();
  for (const title of data) {
    for (const { site } of title.sites) {
      siteCounts.set(site, (siteCounts.get(site) ?? 0) + 1);
    }
  }

  for (const site of sites) {
    if (!siteCounts.has(site)) {
      siteCounts.set(site, 0);
    }
  }

  const siteOptions = [...siteCounts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );

  const filtered = sites.length
    ? data.filter((title) => title.sites.some(({ site }) => sites.includes(site)))
    : data;

  // a shared link can point past the end once the results change
  const pageCount = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const currentPage = Math.min(page, pageCount);
  const pageTitles = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSite = (site: string) => {
    onSitesChange(sites.includes(site) ? sites.filter((s) => s !== site) : [...sites, site]);
  };

  return (
    <div
      aria-busy={loading}
      className={cn(loading && 'opacity-50 transition-opacity duration-200 delay-150')}
    >
      <h2 className="mb-3 text-xl">{resultsText(filtered.length, type)}</h2>

      {siteOptions.length > 1 && (
        <div
          role="group"
          aria-label="Filter by site"
          className="mb-5 flex flex-wrap items-center gap-2"
        >
          {siteOptions.map(([site, count]) => {
            const active = sites.includes(site);

            return (
              <Button
                key={site}
                variant="outline"
                size="sm"
                aria-pressed={active}
                onClick={() => toggleSite(site)}
                className={cn(
                  'rounded-full pl-1.5',
                  active &&
                    'border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:border-foreground dark:bg-foreground dark:hover:bg-foreground/90',
                )}
              >
                <img
                  src={logoUrl(site)}
                  alt=""
                  className="size-5 rounded-full bg-white object-contain"
                />
                {siteName(site)}
                <span
                  className={cn(
                    'tabular-nums',
                    active ? 'text-background/70' : 'text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              </Button>
            );
          })}

          {sites.length > 0 && (
            <Button
              variant="link"
              size="sm"
              onClick={() => onSitesChange([])}
              className="text-muted-foreground"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* a full page's height even on the last page, so the pager stays where it is */}
      <div
        ref={list}
        className="flex flex-col gap-4"
        style={{
          minHeight: pageCount > 1 ? pageSize * (CARD_HEIGHT + CARD_GAP) - CARD_GAP : undefined,
        }}
      >
        {pageTitles.map((title) => (
          <TitleCard key={title.url} title={title} singleLine />
        ))}
      </div>

      {pageCount > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            Page {currentPage} of {pageCount}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === pageCount}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
            <ChevronRight />
          </Button>
        </nav>
      )}
    </div>
  );
}
