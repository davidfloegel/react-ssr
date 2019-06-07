import SEO from 'components/SEO';
import React from 'react';
import Container from 'uikit/Container';

const Home: React.SFC<any> = () => (
  <Container>
    <SEO title="Home" />

    <h1>Universal React</h1>
    <p>
      Welcome to this universal react boilerplate.
      <br />
      <br />
      <strong>Features:</strong>
    </p>

    <ul>
      <li>Server Side Rendered</li>
      <li>Babel 7</li>
      <li>Webpack 4</li>
      <li>React 16</li>
      <li>Code Splitting</li>
      <li>Hot Reloading</li>
      <li>Styled Components</li>
    </ul>
  </Container>
);

export default Home;
