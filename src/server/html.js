import React from "react";

export default ({ scriptTags, styles, helmet, markup, data }) => (
  <html>
    <head>
      {helmet.title.toComponent()}
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
