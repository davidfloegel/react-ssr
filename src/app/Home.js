import React from 'react';
import { Helmet } from 'react-helmet';
import Container from 'app/components/Container';

const Home = () => (
  <Container>
    <Helmet>
      <title>Home</title>
    </Helmet>

    <h1>Universal Home</h1>
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
