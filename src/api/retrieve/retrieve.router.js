const Router = require('express');
const retrieveController = require('./retrieve.controller');

module.exports = () => {
  const router = Router();

  router.get('', async (req, res, next) => {
    res.send(await retrieveController.retrieveAllLas());
  });

  router.get('/:la', async (req, res, next) => {
    res.send(await retrieveController.retrieveLa(req.params.la));
  });

  return router;
}