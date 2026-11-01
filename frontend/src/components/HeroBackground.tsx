import { useEffect, useState } from 'react';
import { decode } from 'blurhash';

import { cn } from '@/lib/utils';

// keep in sync with the preload link in index.html
export const HERO_IMAGE = '/header.jpg';
// blurhash of the header image (4x3 components)
const HERO_BLURHASH = 'LKAT.ztmS5kCpfo#flbHyZj[jXjZ';

function blurhashToDataUrl(hash: string, width = 32, height = 22): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return '';
  }

  const image = ctx.createImageData(width, height);
  image.data.set(decode(hash, width, height));
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

// remembered across pages so switching page doesn't fade the photo in again
let placeholder: string | undefined;
let photoLoaded = false;

// blurry placeholder that fades into the real photo once it loads
export default function HeroBackground() {
  placeholder ??= blurhashToDataUrl(HERO_BLURHASH);
  const [loaded, setLoaded] = useState(photoLoaded);

  useEffect(() => {
    if (photoLoaded) {
      return;
    }

    const img = new Image();
    img.onload = () => {
      photoLoaded = true;
      setLoaded(true);
    };
    img.src = HERO_IMAGE;
    return () => {
      img.onload = null;
    };
  }, []);

  const layer = 'absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat';

  return (
    <div aria-hidden className="absolute inset-0">
      <div className={layer} style={{ backgroundImage: `url(${placeholder})` }} />
      <div
        className={cn(
          layer,
          'transition-opacity duration-500 motion-reduce:transition-none',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
    </div>
  );
}
