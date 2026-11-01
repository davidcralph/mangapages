import Footer from '@/components/Footer';
import Hero, { heroText, heroTitle } from '@/components/Hero';
import { Button } from '@/components/ui/button';

import { linkClick } from '@/lib/router';

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <Hero fill className="pb-16">
        <p className="text-7xl leading-none font-semibold tracking-tight text-white/80 tabular-nums drop-shadow-[0_2px_8px_rgb(0_0_0/0.6)] sm:text-8xl">
          404
        </p>
        <h1 className={heroTitle}>Page not found</h1>

        <p className={heroText}>
          There's nothing at{' '}
          <span className="font-medium break-all">{window.location.pathname}</span>. Search for a
          title instead.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-2 rounded-full bg-white px-6 text-black hover:bg-white/90"
        >
          <a href="/" onClick={linkClick}>
            Back to search
          </a>
        </Button>
      </Hero>
      <Footer />
    </div>
  );
}
