const Router = require('express').Router;
const sendRouter = require('./send');
const retrieveRouter = require('./retrieve');

module.exports = () => {
  const router = Router();

  router.use('/send', sendRouter());
  router.use('/retrieve', retrieveRouter());

  return router;
}
