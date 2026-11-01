import { useRef } from 'react';

import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  label: string;
}

export default function SearchBox({
  value,
  onChange,
  onClear,
  placeholder,
  label,
}: SearchBoxProps) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={input}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="h-12 w-full rounded-full border-0 bg-background pr-12 pl-12 text-base text-foreground shadow-lg md:text-base dark:bg-background"
      />

      {value && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Clear search"
              onClick={() => {
                onClear();
                // keep focus in the box so you can type the next search straight away
                input.current?.focus();
              }}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full text-muted-foreground hover:text-foreground"
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear search</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
