import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, Link } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import routes from './routes'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato');

  html, body {
    background: ${({ theme }) => theme.background};
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  * {
    font-family: 'Lato', sans-serif;
  }
`

const theme = {
  background: 'palevioletred'
}

const App = ({ serverData }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
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
                  serverData: serverData[0] || null,
                })}
            />
          );
        })}
      </Switch>
    </Fragment>
  </ThemeProvider>
)

export default App

