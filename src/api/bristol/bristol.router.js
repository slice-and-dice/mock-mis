const Router = require('express').Router;
const store = require('./bristol.store');
const formatConverterService = require('../../services/format-converter.service');

module.exports = () => {
  const router = Router();

  router.get('/all', (req, res, next) => {
    res.send(store.getData());
  });

  router.post('', (req, res, next) => {
    const formattedData = formatConverterService.convert(req.body.data, req.body.config.targetFormat);
    store.pushData(formattedData);
    res.send(`added ${req.body.data}`);
  });

  return router;
};
