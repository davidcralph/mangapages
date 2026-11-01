import { ExternalLink } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { logoUrl, siteName, type Title } from '@/lib/api';
import { cn } from '@/lib/utils';

interface TitleCardProps {
  title: Title;
  // keep every card the same height, the full title is in the tooltip
  singleLine?: boolean;
}

export default function TitleCard({ title, singleLine }: TitleCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <span
            title={singleLine ? title.title : undefined}
            className={cn('cursor-default font-medium', singleLine && 'truncate')}
          >
            {title.title}
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {title.sites.map(({ site, url }) => (
              <a
                key={site}
                className="link inline-flex w-fit items-center gap-1 text-xs"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteName(site)}
                <ExternalLink aria-hidden className="size-3" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          {title.sites.map(({ site, url }) => (
            <a key={site} href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={logoUrl(site)}
                alt={`${site} icon`}
                title={siteName(site)}
                width={32}
                height={32}
                className="size-8 object-contain"
              />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
