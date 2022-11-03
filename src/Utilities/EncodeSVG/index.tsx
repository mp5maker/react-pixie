import ReactDOMServer from 'react-dom/server';

export const EncodeSVG = (reactElement: any) =>
  `data:image/svg+xml,${escape(
    ReactDOMServer.renderToStaticMarkup(reactElement),
  )}`;
