import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Nav from './Nav'
import withSSR from './ssr'

class Profile extends Component {
  static getInitialData() {
    return new Promise(resolve =>
      setTimeout(() => resolve({ username: 'David' }), 2000)
    )
  }

  render() {
    return (
      <div>
        <Helmet><title>About {this.props.username || ''}</title></Helmet>
        <b>This is about {this.props.username || 'Loading....'}</b>
        <br />
        <Nav />
      </div>
    )
  }
}

export default withSSR(Profile)
