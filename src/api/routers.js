const { Router } = require('express');
const sendRouter = require('./send');
const retrieveRouter = require('./retrieve');
const fhrsRouter = require('./fhrs');
const criteriaRouter = require('./criteria');

module.exports = () => {
  const router = Router();

  router.use('/send', sendRouter());
  router.use('/retrieve', retrieveRouter());
  router.use('/fhrs', fhrsRouter());
  router.use('/criteria', criteriaRouter())

  return router;
};
