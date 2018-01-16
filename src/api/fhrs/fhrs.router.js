const { Router } = require('express');
const fhrsController = require('./fhrs.controller');

module.exports = () => {
  const router = Router();

  router.get('', async (req, res) => {
    res.send(await fhrsController.getAllEstablishments());
  });

  router.get('/:la', async (req, res) => {
    res.send(await fhrsController.getEstablishmentsFromLa(req.params.la));
  });

  return router;
}