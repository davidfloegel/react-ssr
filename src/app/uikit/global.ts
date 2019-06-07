import { createGlobalStyle } from 'lib/styledComponents';

export default createGlobalStyle`
  html, body {
    background: ${({ theme }) => theme.background};
    font-family: 'Lato', sans-serif;
    font-size: ${({ theme }) => theme.fontSize};
    padding: 50px 0;
  }

  * {
    font-family: 'Lato', sans-serif;
  }
`;

