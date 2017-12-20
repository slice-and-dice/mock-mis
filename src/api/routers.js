const Router = require('express').Router;
const bristolRouter = require('./bristol');

module.exports = () => {
  const router = Router();

  router.use('/Bristol', bristolRouter());

  return router;
}