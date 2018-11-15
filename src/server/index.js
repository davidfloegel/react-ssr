import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import cors from 'cors';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import routes from '../app/routes';
import App from '../app';
import path from 'path';
import Html from './html';
import { ChunkExtractor } from '@loadable/server';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../../public')));

if (process.env.NODE_ENV !== 'production') {
  const { default: webpackConfig } = require('../../webpack.config.babel');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      // logLevel: 'silent',
      publicPath: '/dist/web',
      writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath);
      }
    })
  );
}

const nodeStats = path.resolve(
  __dirname,
  '../../public/dist/node/loadable-stats.json'
);

const webStats = path.resolve(
  __dirname,
  '../../public/dist/web/loadable-stats.json'
);

app.get('*', (req, res) => {
  // check if a current route has a request that needs to be waited for
  const promises = [];
  routes.some(route => {
    const match = matchPath(req.path, route);

    if (match && route.component.getInitialData) {
      promises.push(route.component.getInitialData(match));
    }

    return match;
  });

  Promise.all(promises).then(data => {
    const sheet = new ServerStyleSheet();

    // load the stats files definining the chunks from @loadable/component
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
    const { default: App } = nodeExtractor.requireEntrypoint();
    const webExtractor = new ChunkExtractor({ statsFile: webStats });

    // render the app in the static router
    const app = (
      <StaticRouter location={req.url} context={{}}>
        <App serverData={data} />
      </StaticRouter>
    );

    // get all cunks
    const jsx = webExtractor.collectChunks(app);

    // render the app to a string and collect all styled-component styles
    const renderAppToString = ReactDOMServer.renderToString(
      sheet.collectStyles(jsx)
    );

    // get helmet, styles and chunk information
    const helmet = Helmet.renderStatic();
    const styles = sheet.getStyleElement();
    const scriptTags = webExtractor.getScriptElements();

    // generate stream
    const nodeStream = ReactDOMServer.renderToNodeStream(
      <Html
        helmet={helmet}
        styles={styles}
        markup={renderAppToString}
        data={data}
        scriptTags={scriptTags}
      />
    );

    const stream = sheet.interleaveWithNodeStream(nodeStream);

    stream.pipe(
      res,
      { end: false }
    );
    stream.on('end', () => res.send());
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
