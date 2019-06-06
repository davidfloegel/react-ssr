import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import withSSR from 'app/ssr';
import Container from 'app/components/Container';

interface Props {
  data: any;
}
class Profile extends Component<Props> {
  static getInitialData() {
    return axios.get(
      'https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime'
    );
  }

  render() {
    const { data } = this.props;
    console.log('component', this.props)

    console.log('data in component', data);

    if (!data || !data.lyrics) {
      return <Container>Loading Lyrics...</Container>;
    }

    const { lyrics } = data;

    return (
      <Container>
        <Helmet>
          <title>Coldplay - Adventure of a Lifetime</title>
        </Helmet>

        <h1>Adventure of a Lifetime</h1>
        <h3>By Coldplay</h3>

        {lyrics.split('\n').map((item: any, key: string) => (
          <React.Fragment key={key}>
            {item}
            <br />
          </React.Fragment>
        ))}
      </Container>
    );
  }
}

export default withSSR(Profile);
