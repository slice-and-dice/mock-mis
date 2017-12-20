const { Router } = require('express');
const sendController = require('./send.controller.js');

module.exports = () => {
  const router = Router();

  router.post('', (req, res, next) => {
    res.send(sendController(req.body));
  });

  return router;
};
