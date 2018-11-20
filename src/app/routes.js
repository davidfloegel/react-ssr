import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import loadable from '@loadable/component';

import Lyrics from 'app/Lyrics';

const Home = loadable(() => import('app/Home'));
const Private = loadable(() => import('app/Private'));

export default [
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
    component: Private
  }
];
