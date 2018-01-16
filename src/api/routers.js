const { Router } = require('express');
const sendRouter = require('./send');
const retrieveRouter = require('./retrieve');
const fhrsRouter = require('./fhrs');

module.exports = () => {
  const router = Router();

  router.use('/send', sendRouter());
  router.use('/retrieve', retrieveRouter());
  router.use('/fhrs', fhrsRouter());

  return router;
};
