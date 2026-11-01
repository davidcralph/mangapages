export default function Footer() {
  return (
    <footer className="border-t bg-footer px-6 py-10 text-center text-sm leading-relaxed text-muted-foreground sm:py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 text-balance">
        <p>
          <strong>
            <a
              className="link"
              href="https://github.com/davidcralph/mangapages"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manga Pages
            </a>
          </strong>{' '}
          created by{' '}
          <a
            className="link"
            href="https://davidcralph.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            David Ralph
          </a>
          .
        </p>
        <p>
          Header image by{' '}
          <a
            className="link"
            href="https://unsplash.com/photos/R7qWs39obtk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sebastian Kurpiel from Unsplash
          </a>
          . Logos and titles are owned by their respective owners.
        </p>
      </div>
    </footer>
  );
}
