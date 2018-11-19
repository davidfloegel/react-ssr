import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('app/Home'));
const Private = loadable(() => import('app/Private'));
import Profile from 'app/Profile';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/profile',
    exact: true,
    component: Profile
  },
  {
    path: '/private',
    exact: true,
    component: Private
  }
];
