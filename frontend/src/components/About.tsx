export default function About() {
  return (
    <section className="mt-12 border-t pt-8 text-muted-foreground">
      <h2 className="mb-3 text-xl text-foreground">About</h2>

      <p className="leading-relaxed mb-3">
        I built Manga Pages to solve the issue of finding which legal service provides a manga/light
        novel. Search engines don't always show this information (and often show lots of ad-filled
        unofficial sites).
      </p>

      <p className="leading-relaxed">
        The site provides a simple hub to finding what you want to read next showing which sites
        have the manga/light novel available and a MyAnimeList button to read information about it.
        Think of this service as like{' '}
        <a className="link" href="https://because.moe" target="_blank" rel="noopener noreferrer">
          because.moe
        </a>{' '}
        but for manga/light novels.
      </p>
    </section>
  );
}
