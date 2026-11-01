import { ExternalLink } from 'lucide-react';

import Footer from '@/components/Footer';
import Hero, { heroText, heroTitle } from '@/components/Hero';
import { Card, CardContent } from '@/components/ui/card';

import { logoUrl } from '@/lib/api';
import { SITES } from '@/lib/sites';

// the /list page, every legal site we search
export default function SiteList() {
  return (
    <div className="flex min-h-svh flex-col">
      <Hero className="pb-16">
        <h1 className={heroTitle}>Legal sites</h1>
        <p className={heroText}>Full list of sites supported by Manga Pages.</p>
      </Hero>

      <main className="flex-1 bg-background px-4 py-10">
        <ul className="mx-auto grid w-full max-w-xl gap-4 sm:grid-cols-2">
          {SITES.map((site) => (
            <li key={site.id}>
              <Card className="h-full">
                <CardContent className="flex items-center gap-3">
                  <img
                    src={logoUrl(site.id)}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 shrink-0 object-contain"
                  />

                  <div className="flex min-w-0 flex-col">
                    <a
                      className="link inline-flex items-center gap-1 font-medium"
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.name}
                      <ExternalLink aria-hidden className="size-3.5" />
                    </a>
                    <span className="text-sm text-muted-foreground">{site.types}</span>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
