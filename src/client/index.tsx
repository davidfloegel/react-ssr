import 'regenerator-runtime/runtime';

import { loadableReady } from '@loadable/component';
import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from '../app';

const data = (window as any)._INITIAL_DATA_;

delete (window as any)._INITIAL_DATA_;

const renderApp = (Component: typeof App) =>
  hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component serverData={data} />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  );

loadableReady(() => renderApp(App));

if (module.hot) {
  module.hot.accept('../app', () => {
    const NextApp = require('../app').default;
    renderApp(NextApp);
  });
}
