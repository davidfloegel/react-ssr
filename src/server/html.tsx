import React from 'react';

interface IHTMLProps {
  scriptTags: any;
  styles: any;
  helmet: any;
  markup: any;
  data: any;
}

const HTML: React.SFC<IHTMLProps> = ({
  scriptTags,
  styles,
  helmet,
  markup,
  data
}) => (
  <html>
    <head>
      {helmet.title.toComponent()}
      <link
        href="https://fonts.googleapis.com/css?family=Lato"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </head>
    <body>
      <script
        dangerouslySetInnerHTML={{
          __html: `window._INITIAL_DATA_ = ${JSON.stringify(data)}`
        }}
      />

      <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />

      {scriptTags}
    </body>
  </html>
);

export default HTML;
