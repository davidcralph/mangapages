import { Button } from '@/components/ui/button';

import { TITLE_TYPES, TYPE_LABELS, type TitleType } from '@/lib/api';
import { cn } from '@/lib/utils';

interface TypePickerProps {
  type: TitleType;
  onChange: (type: TitleType) => void;
}

// manga / light novels / manhwa / manhua pills in the hero
export default function TypePicker({ type, onChange }: TypePickerProps) {
  return (
    <div
      role="group"
      aria-label="Type"
      className="mt-2 inline-flex flex-wrap justify-center gap-1 rounded-full bg-black/75 p-1 ring-1 ring-white/20 backdrop-blur-sm"
    >
      {TITLE_TYPES.map((t) => (
        <Button
          key={t}
          aria-pressed={t === type}
          onClick={() => onChange(t)}
          className={cn(
            'rounded-full px-4 text-sm font-medium',
            t === type
              ? 'bg-white text-black hover:bg-white'
              : 'bg-transparent text-white hover:bg-white/15',
          )}
        >
          {TYPE_LABELS[t]}
        </Button>
      ))}
    </div>
  );
}
