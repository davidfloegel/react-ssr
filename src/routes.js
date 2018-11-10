import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('./Home'))
const Profile = loadable(() => import('./Profile'))
const Private = loadable(() => import('./Private'))
const About = loadable(() => import('./About'))

const JSXRoutes = () => (
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/private" component={Private} />
  </Switch>
)

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
  },
  {
    path: '/',
    component: JSXRoutes
  }
]
