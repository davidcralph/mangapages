import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import { TooltipProvider } from '@/components/ui/tooltip';

import { prefetchDone } from '@/lib/prefetch';

import './index.css';

// rubik doesn't download until text uses it, so the first paint would use the fallback then reflow
// the first page's data would also pop in after the placeholders, so wait a little for both
const fontsReady = Promise.all(
  ['400', '500', '600'].map((weight) => document.fonts.load(`${weight} 1em Rubik`)),
);
const timeout = new Promise((resolve) => setTimeout(resolve, 400));

Promise.race([Promise.all([fontsReady, prefetchDone]), timeout])
  .catch(() => {})
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <TooltipProvider delayDuration={300}>
          <App />
        </TooltipProvider>
      </StrictMode>,
    );
  });
