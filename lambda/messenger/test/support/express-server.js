import express from 'express'; // eslint-disable-line
import bodyParser from 'body-parser'; // eslint-disable-line

import { messenger } from '../../src/lambda';

let app = express();
app.use(bodyParser.json());

let httpServer = require('http').createServer(app);

const adaptForApiGateway = lambda => (req, res) =>
  lambda({ body: JSON.stringify(req.body) }, {}, (err, proxyRes) => res.send(proxyRes));

const startExpress = () => {
  app.get(`/status`, (req, res) => res.status(200).json({ status: `ok` }));
  app.post(`/api/messages`, adaptForApiGateway(messenger));

  httpServer.listen('3000');

  return Promise.resolve(app);
};

const stopExpress = () => {
  httpServer.close();
  app = null;
  httpServer = null;
};

export { startExpress, stopExpress };
