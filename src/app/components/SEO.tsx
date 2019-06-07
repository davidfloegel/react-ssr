import React from 'react';
import Helmet from 'react-helmet';

interface IProps {
  title: string;
}

const SEO: React.SFC<IProps> = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default SEO;
