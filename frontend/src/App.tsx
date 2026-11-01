import NotFound from '@/components/NotFound';
import SearchPage from '@/components/SearchPage';
import SiteList from '@/components/SiteList';

import { usePath } from '@/lib/router';

// pages serves index.html for every path, so routing is done here
export default function App() {
  const path = usePath();

  if (path === '/' || path === '/index.html') {
    return <SearchPage />;
  }

  if (path === '/list') {
    return <SiteList />;
  }

  return <NotFound />;
}
