import React, { Component } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  render: any;
}

class PrivateRoute extends Component<Props> {
  render() {
    const { location, render, ...rest } = this.props;

    // TODO this is where you do your check whether a user is logged in or not.
    // This could be done with redux or context or simply checking a local storage element.
    const isUserLoggedIn = false;

    return (
      <Route
        {...rest}
        render={(routeProps: any) =>
          isUserLoggedIn ? (
            render(routeProps)
          ) : (
            <Redirect
              to={{ pathname: '/', state: { from: location.pathname } }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
