import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import chokidar from 'chokidar';
import routes from '../app/routes';
import App from '../app';
import Html from './html';

const app = express();
const port = 3000;
const isDev = process.env.NODE_ENV !== 'production';

app.use(express.static(path.join(__dirname, '../../public')));

let compiler = null;
if (isDev) {
  const { default: webpackConfig } = require('../../webpack.config.babel');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      // logLevel: 'silent',
      noInfo: true,
      publicPath: '/dist/web',
      writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath);
      }
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      // eslint-disable-next-line
      log: console.log
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

if (isDev) {
  const logMessage = id => {
    // eslint-disable-next-line
    console.log(`Clearing cache on: /server/${id}`);
  };

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch('.', { ignored: /[/\\]node_modules[/\\]/ });

  watcher.on('ready', () => {
    console.log('watcher ready');
    Object.keys(require.cache).forEach(id => {
      if (/[/\\]server[/\\]/.test(id)) {
        logMessage(id.split(/[/\\]server[/\\]/)[1]);
        delete require.cache[id];
      }
    });
  });

  // Do "hot-reloading" of react code on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', () => {
    // eslint-disable-next-line
    console.log('Clearing /client/ module cache from server');
    Object.keys(require.cache).forEach(id => {
      if (/[/\\]client[/\\]/.test(id)) {
        logMessage(id.split(/[/\\]client[/\\]/)[1]);
        delete require.cache[id];
      } else if (/[/\\]app[/\\]/.test(id)) {
        logMessage(id.split(/[/\\]app[/\\]/)[1]);
        delete require.cache[id];
      }
    });
  });
}

app.listen(port, () => console.log(`App listening on port ${port}!`));
