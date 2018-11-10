import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import cors from 'cors'
import { StaticRouter, matchPath } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import webpackConfig from '../webpack.server.js';
import { Helmet } from 'react-helmet'
import routes from './routes'
import App from './shared'
import path from 'path'

import { ChunkExtractor } from '@loadable/server'

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))

if (process.env.NODE_ENV !== 'production') {
  const { default: webpackConfig } = require('../webpack.config.babel')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')

  const compiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      // logLevel: 'silent',
      publicPath: '/dist/web',
      writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath)
      },
    }),
  )
}

const nodeStats = path.resolve(
  __dirname,
  '../public/dist/node/loadable-stats.json',
)

const webStats = path.resolve(
  __dirname,
  '../public/dist/web/loadable-stats.json',
)

const Html = ({ scriptTags, styles, helmet, markup, data }) => (
  <html>
    <head>
      {helmet.title.toComponent()}
      <style dangerouslySetInnerHTML={{ __html: styles }}></style>
    </head>
    <body>
      <script dangerouslySetInnerHTML={{ __html:
        `window._INITIAL_DATA_ = ${JSON.stringify(data)}`
      }} />

      <div
        id="root"
        dangerouslySetInnerHTML={{ __html: markup }}
      ></div>

      {scriptTags}
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
    const sheet = new ServerStyleSheet()

    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
    const { default: App } = nodeExtractor.requireEntrypoint()

    const webExtractor = new ChunkExtractor({ statsFile: webStats })

    const app = (
      <StaticRouter
        location={req.url}
        context={{}}
      >
        <App serverData={data} />
      </StaticRouter>
    )

    const jsx = webExtractor.collectChunks(app)



    const renderAppToString = ReactDOMServer.renderToString(
      sheet.collectStyles(jsx)
    )
    const helmet = Helmet.renderStatic()
    const styles = sheet.getStyleElement()
    const scriptTags = webExtractor.getScriptElements()

    const nodeStream = ReactDOMServer.renderToNodeStream(<Html
      helmet={helmet}
      styles={styles}
      markup={renderAppToString}
      data={data}
      scriptTags={scriptTags}
    />)

    const stream = sheet.interleaveWithNodeStream(nodeStream)

    stream.pipe(res, { end: false })
    stream.on('end', () => res.send())
  })
})

app.listen(port, () =>
  console.log(`App listening on port ${port}!`)
)
