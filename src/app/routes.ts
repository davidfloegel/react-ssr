import React from 'react';
import loadable from '@loadable/component';

import { Route } from 'typings/routing';

// importing routes using loadable. This will lazy load them and only include
// when the route has been requested
const Home = loadable(() => import('pages/Home'));
const Private = loadable(() => import('pages/Private'));

// if you want your route to pre-fetch data using the Prerender component
// then you will have to import it statically.
import Lyrics from 'pages/Lyrics';

const routes: Route[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/lyrics',
    exact: true,
    component: Lyrics
  },
  {
    path: '/private',
    exact: true,
    component: Private,
    private: true
  }
];

export default routes;
