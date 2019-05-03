import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import routes from 'app/routes';
import NavBar from 'app/components/Nav';

const GlobalStyle = createGlobalStyle`
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

const theme = {
  background: '#f9f9f9',
  fontSize: '20px'
};

type Props = {
  serverData: any;
};

const App: React.SFC<Props> = ({ serverData }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      <NavBar />
      <Switch>
        {routes.map((route: any, index: number) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: any) =>
                React.createElement(route.component, {
                  ...props,
                  serverData: serverData ? serverData[0] : null
                })
              }
            />
          );
        })}
      </Switch>
    </Fragment>
  </ThemeProvider>
);

export default App;
