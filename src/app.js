const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./api/routers');

module.exports = () => {
  const app = express();

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use('/', routers());
  
  return app;
};