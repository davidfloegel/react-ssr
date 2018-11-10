import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, Link } from 'react-router-dom'
import routes from './routes'

const App = ({ serverData }) => (
  console.log('app', serverData),
  <Switch>
    {routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={props =>
              React.createElement(route.component, {
                ...props,
                serverData : serverData[0] || null,
              })}
            />
      );
    })}

  </Switch>
)

export default App

