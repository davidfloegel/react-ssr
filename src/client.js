import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared'
import { BrowserRouter } from 'react-router-dom'

const data = window._INITIAL_DATA_;

delete window._INITIAL_DATA_

ReactDOM.hydrate(
  <BrowserRouter>
    <App serverData={data} />
  </BrowserRouter>,
  document.getElementById('root')
);

module.hot.accept();
