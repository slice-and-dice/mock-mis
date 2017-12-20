const { Router } = require('express');
const sendController = require('./send.controller.js');

module.exports = () => {
  const router = Router();

  router.post('', async (req, res, next) => {
    res.send(await sendController(req.body));
  });

  return router;
};
