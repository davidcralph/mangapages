export type AppEnv = { Bindings: Env };

export interface Source {
  site: string;
  url: string;
}

// site and url are the first source, sites has all of them
export interface Title extends Source {
  title: string;
  sites: Source[];
}

// a single entry in the crawler output
export interface CrawledTitle extends Source {
  title: string;
}
