const Router = require('express');
const criteriaController = require('./criteria.controller');

module.exports = () => {
  const router = Router();

  router.post('/add', async (req, res) => {
    res.send(await criteriaController.addCriteria(req.body));
  });

  return router;
}