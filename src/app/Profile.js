import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import withSSR from 'app/ssr';

class Profile extends Component {
  static getInitialData() {
    return new Promise(resolve =>
      setTimeout(() => resolve({ username: 'David' }), 2000)
    );
  }

  render() {
    const { username } = this.props;

    if (!username) {
      return <b>Loading...</b>;
    }

    return (
      <div>
        <Helmet>
          <title>About {this.props.username}</title>
        </Helmet>
        <b>This is about {this.props.username}</b>
      </div>
    );
  }
}

export default withSSR(Profile);
