import { ExternalLink } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { logoUrl, malUrl, siteName, type Title } from '@/lib/api';

export default function TitleCard({ title }: { title: Title }) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="cursor-default font-medium">{title.title}</span>
          <a
            className="link inline-flex w-fit items-center gap-1 text-xs"
            href={malUrl(title.title)}
            target="_blank"
            rel="noopener noreferrer"
          >
            MyAnimeList
            <ExternalLink aria-hidden className="size-3" />
          </a>
        </div>

        <div className="flex max-w-18 shrink-0 flex-wrap justify-end gap-2">
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
