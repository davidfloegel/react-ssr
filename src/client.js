import React from 'react';
import { hydrate } from 'react-dom';
import App from './shared'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from '@loadable/component'

const data = window._INITIAL_DATA_;

delete window._INITIAL_DATA_

loadComponents().then(() => {
  hydrate(
    <BrowserRouter>
      <App serverData={data} />
    </BrowserRouter>,
    document.getElementById('root')
  );
})

module.hot.accept();
