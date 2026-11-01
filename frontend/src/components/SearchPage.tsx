import { useEffect, useState } from 'react';

import About from '@/components/About';
import Footer from '@/components/Footer';
import Hero, { heroText, heroTitle } from '@/components/Hero';
import RandomTitles from '@/components/RandomTitles';
import SearchBox from '@/components/SearchBox';
import SearchResults from '@/components/SearchResults';
import TypePicker from '@/components/TypePicker';

import { fetchRandom, fetchSearch, TYPE_LABELS, type TitleType } from '@/lib/api';
import { randomPlaceholder } from '@/lib/placeholders';
import { readUrlState, writeUrlState } from '@/lib/url-state';
import { useOnline } from '@/lib/use-online';
import { useTitles } from '@/lib/use-titles';

export default function SearchPage() {
  const online = useOnline();
  const [initial] = useState(readUrlState);
  const [type, setType] = useState<TitleType>(initial.type);
  const [placeholder, setPlaceholder] = useState(() => randomPlaceholder(initial.type));
  const [query, setQuery] = useState(initial.query);
  // selected site filters, empty means all sites
  const [sites, setSites] = useState<string[]>(initial.sites);
  const [page, setPage] = useState(initial.page);
  // bumped by the refresh button to get new random picks
  const [refreshKey, setRefreshKey] = useState(0);

  const random = useTitles('random', `${type}:${refreshKey}`, (signal) =>
    fetchRandom(type, signal),
  );
  const search = useTitles('search', query ? `${type}:${query}` : null, (signal) =>
    fetchSearch(query, type, signal),
  );

  // keep the url in sync so searches can be shared
  useEffect(() => {
    writeUrlState({ query, type, sites, page });
  }, [query, type, sites, page]);

  function changeType(next: TitleType) {
    if (next === type) {
      return;
    }

    setType(next);
    setPlaceholder(randomPlaceholder(next));
    setSites([]);
    setPage(1);
  }

  function changeQuery(next: string) {
    setQuery(next);
    setPage(1);
  }

  function changeSites(next: string[]) {
    setSites(next);
    setPage(1);
  }

  function clearSearch() {
    setQuery('');
    setSites([]);
    setPage(1);
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Hero onLogoClick={clearSearch} className="pt-20 pb-24 sm:pt-28 sm:pb-36">
        {online && (
          <>
            <h1 className={heroTitle}>Find where to read it</h1>
            <p className={heroText}>
              Search official, legal sources for manga, light novels, manhwa and manhua.
            </p>
            <TypePicker type={type} onChange={changeType} />
            <SearchBox
              value={query}
              onChange={changeQuery}
              onClear={clearSearch}
              placeholder={placeholder}
              label={`Search ${TYPE_LABELS[type].toLowerCase()}`}
            />
          </>
        )}
      </Hero>

      <main className="flex-1 bg-background px-4 py-10">
        <div className="mx-auto w-full max-w-xl">
          {!online ? (
            <h2 className="text-xl">Please connect to the internet</h2>
          ) : query && search.data ? (
            <SearchResults
              data={search.data}
              loading={search.loading}
              type={type}
              sites={sites}
              onSitesChange={changeSites}
              page={page}
              onPageChange={setPage}
            />
          ) : (
            // keep the random picks up until the first search returns instead of flashing a loader
            <>
              <RandomTitles
                data={random.data}
                loading={random.loading || !!query}
                type={type}
                onRefresh={() => setRefreshKey((k) => k + 1)}
              />
              <About />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
