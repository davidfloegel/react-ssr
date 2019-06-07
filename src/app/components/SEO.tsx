import React from 'react';
import Helmet from 'react-helmet';

interface Props {
  title: string;
}

const SEO: React.SFC<Props> = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default SEO;
