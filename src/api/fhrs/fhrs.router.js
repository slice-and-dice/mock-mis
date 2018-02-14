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

  router.post('/buildReport', async (req, res) => {
    res.send(await fhrsController.buildReport(req.body));
  });

  router.post('/buildReport/csv', async (req, res) => {
    const reportData = await fhrsController.buildReport(req.body);

    const csvData = await fhrsController.writeCSV(reportData);

    res.setHeader('Content-Type', 'text/csv');
    res.send(csvData);
  });

  return router;
}