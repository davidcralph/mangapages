import { RotateCw } from 'lucide-react';

import TitleCard from '@/components/TitleCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { pluralType, type Title, type TitleType } from '@/lib/api';
import { cn } from '@/lib/utils';

interface RandomTitlesProps {
  data: Title[] | null;
  loading: boolean;
  type: TitleType;
  onRefresh: () => void;
}

export default function RandomTitles({ data, loading, type, onRefresh }: RandomTitlesProps) {
  return (
    <>
      <h2 className="mb-4 flex items-center gap-1 text-xl">
        Random {pluralType(type)}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onRefresh}
              aria-label={`Show more ${pluralType(type)}`}
            >
              <RotateCw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Show more {pluralType(type)}</TooltipContent>
        </Tooltip>
      </h2>

      {/* dim the old cards while loading, skeletons only when there's nothing yet */}
      <div
        aria-busy={loading}
        className={cn(
          'grid gap-4 sm:grid-cols-2',
          loading && data && 'opacity-50 transition-opacity duration-200 delay-150',
        )}
      >
        {data
          ? data.map((title) => <TitleCard key={title.url} title={title} />)
          : Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-[76px] rounded-xl" />
            ))}
      </div>
    </>
  );
}
