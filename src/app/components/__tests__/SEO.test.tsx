import React from 'react';

import SEO from 'components/SEO';

describe('SEO Component', () => {
  test('it renders with a title', () => {
    expect(<SEO title="Test TItle" />).toMatchSnapshot();
  });
});
