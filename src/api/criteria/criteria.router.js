const Router = require('express');
const criteriaController = require('./criteria.controller');

module.exports = () => {
  const router = Router();

  router.post('/add', async (req, res) => {
    res.send(await criteriaController.addCriteria(req.body));
  });

  router.get('', async (req, res) => {
    res.send(await criteriaController.getCriteria());
  });

  router.post('/update', async (req, res) => {
    res.send(await criteriaController.updateCriteria(req.body));
  });

  return router;
}