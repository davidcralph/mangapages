import { StrictMode } from 'react';
import { render } from 'react-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';

render(
  <StrictMode>
    <App/>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
