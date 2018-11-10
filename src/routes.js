import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, Link } from 'react-router-dom'

import withSSR from './ssr'

const Nav = () => (
  <div>
    <Link to="/">Home</Link>{' / '}
    <Link to="/profile">Profile</Link>{' / '}
    <Link to="/about">About</Link>{' / '}
    <Link to="/private">Private</Link>
  </div>
)

const Home = () => (
  <div>
    <Helmet><title>Home</title></Helmet>
    <b>This is Home</b>
    <br />
    <Nav />
  </div>
)

class ProfileClass extends React.Component {
  static getInitialData() {
    console.log('fetch data in getInitialData')
    return new Promise(resolve =>
      setTimeout(() => resolve({ username: 'David' }), 2000)
    )
  }

  render() {
    return (
      <div>
        <Helmet><title>About {this.props.username || ''}</title></Helmet>
        <b>This is about {this.props.username}</b>
        <br />
        <Nav />
      </div>
    )
  }
}

const Profile = withSSR(ProfileClass)

const About = () => (
  <div>
    <Helmet><title>About</title></Helmet>
    <b>This is about</b>
    <br />
    <Nav />
  </div>
)

const Private = () => (
  <div>
    <Helmet><title>Private</title></Helmet>
    <b>This is not so private</b>
    <br />
    <Nav />
  </div>
)

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
