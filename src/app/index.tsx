import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'lib/styledComponents';
import { Route as IRoute } from 'typings/routing';
import routes from 'app/routes';
import NavBar from 'components/Nav';
import PrivateRoute from 'components/PrivateRoute';

import theme, { GlobalStyle } from 'uikit/theme';

type AppProps = {
  serverData: any;
};

const App: React.SFC<AppProps> = ({ serverData }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      <NavBar />
      <Switch>
        {routes.map((route: IRoute, index: number) => {
          const RouteComp = route.private ? PrivateRoute : Route;
          return (
            <RouteComp
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: any) =>
                React.createElement(route.component, {
                  ...props,
                  serverData: serverData || null
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
