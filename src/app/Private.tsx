import React from 'react';
import { Helmet } from 'react-helmet';

const Private =() => (
  <div>
    <Helmet>
      <title>Private</title>
    </Helmet>
    <b>This is not so private</b>
  </div>
);

export default Private;
