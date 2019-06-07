import axios from 'axios';
import React, { Component } from 'react';

import Prerender from 'components/prerender';
import SEO from 'components/SEO';
import Container from 'uikit/Container';

interface IProps {
  data: any;
  isLoading: boolean;
}
class Profile extends Component<IProps> {
  public static getInitialData() {
    return axios.get(
      'https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime'
    );
  }

  public render() {
    const { data } = this.props;

    if (!data || !data.lyrics) {
      return <Container>Loading Lyrics...</Container>;
    }

    const { lyrics } = data;

    return (
      <Container>
        <SEO title="Coldplay - Adventure of a Lifetime" />

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

export default Prerender(Profile);
