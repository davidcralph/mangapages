import type { ComponentProps } from 'react';

import { Menu } from 'lucide-react';
import { siGithub } from 'simple-icons';

import ThemeMenu from '@/components/ThemeMenu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { linkClick } from '@/lib/router';
import { cn } from '@/lib/utils';

// internal links switch page in place, external ones open a new tab
const LINKS = [
  { name: 'List', href: '/list' },
  { name: 'API Docs', href: 'https://docs.davidcralph.co.uk/#/manga', external: true },
];

const GITHUB = {
  name: 'GitHub',
  href: 'https://github.com/davidcralph/mangapages',
  external: true,
};

// lucide dropped brand icons, so the github logo comes from simple-icons
function GithubIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d={siGithub.path} />
    </svg>
  );
}

type NavLinkProps = (typeof LINKS)[number] & ComponentProps<'a'>;

// passes the rest of the props through so it works with asChild
function NavLink({ name, href, external, onClick, children, ...props }: NavLinkProps) {
  if (external) {
    return (
      <a {...props} href={href} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children ?? name}
      </a>
    );
  }

  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        linkClick(event);
      }}
    >
      {children ?? name}
    </a>
  );
}

export default function Navbar({ onLogoClick }: { onLogoClick: () => void }) {
  const navButton = 'text-white hover:bg-black/50 hover:text-white dark:hover:bg-black/50';

  return (
    <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
      <Button
        variant="ghost"
        size="lg"
        className={`${navButton} text-lg font-semibold`}
        onClick={onLogoClick}
      >
        📖 Manga Pages
      </Button>
      <div className="flex items-center gap-1">
        {LINKS.map((link) => (
          <Button
            key={link.name}
            variant="ghost"
            className={cn(navButton, 'hidden sm:inline-flex')}
            asChild
          >
            <NavLink {...link} />
          </Button>
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(navButton, 'hidden sm:inline-flex')}
              asChild
            >
              <NavLink {...GITHUB} aria-label="GitHub">
                <GithubIcon />
              </NavLink>
            </Button>
          </TooltipTrigger>
          <TooltipContent>GitHub</TooltipContent>
        </Tooltip>

        <ThemeMenu className={navButton} />
        {/* links don't fit next to the logo on phones, so they go in a menu */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(navButton, 'sm:hidden')}
              aria-label="Menu"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-36">
            {LINKS.map((link) => (
              <DropdownMenuItem key={link.name} asChild>
                <NavLink {...link} />
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild>
              <NavLink {...GITHUB} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
