const React = require('react')
const ReactDOMServer = require('react-dom/server')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

import { StaticRouter, matchPath } from 'react-router-dom'
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.server.js';
import { Helmet } from 'react-helmet'
import routes from './routes'
import App from './shared'

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(cors())
app.use('/assets', express.static('./dist'))

const Html = ({ helmet, markup, data }) => (
  <html>
    <head>
      {helmet.title.toComponent()}
    </head>
    <body>
      <script dangerouslySetInnerHTML={{ __html:
        `window._INITIAL_DATA_ = ${JSON.stringify(data)}`
      }} />

      <div
        id="root"
        dangerouslySetInnerHTML={{ __html: markup }}
      ></div>

      <script src="http://localhost:3001/bundle.js"></script>

  </body>
  </html>
)

app.get('*', (req, res) => {
  const promises = []

  routes.some(route => {
    const match = matchPath(req.path, route);

    if (match && route.component.getInitialData) {
      promises.push(route.component.getInitialData(match))
    }

    return match
  })

  Promise.all(promises).then(data => {
    console.log('resolved', data)
    const app = (
      <StaticRouter
        location={req.url}
        context={{}}
      >
        <App serverData={data} />
      </StaticRouter>
    )

    const renderAppToString = ReactDOMServer.renderToString(app)
    const helmet = Helmet.renderStatic()

    const stream = ReactDOMServer.renderToNodeStream(<Html
      helmet={helmet}
      markup={renderAppToString}
      data={data}
    />)

    stream.pipe(res, { end: false })
    stream.on('end', () => res.send())
  })
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
