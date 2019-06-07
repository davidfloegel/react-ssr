import routes, { IRoute } from 'app/routes';
import PrivateRoute from 'components/PrivateRoute';
import { createGlobalStyle, ThemeProvider } from 'lib/styledComponents';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Route, Switch } from 'react-router-dom';

import NavBar from 'uikit/Nav';
import theme, { GlobalStyle } from 'uikit/theme';

export interface IAppProps {
  serverData: any;
};

const App: React.SFC<IAppProps> = ({ serverData }) => (
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
