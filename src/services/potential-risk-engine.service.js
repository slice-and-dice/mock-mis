const Criteria = require('../models/Criteria');
const { logFunctionSuccess } = require('./logging.service');
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const getCriteria = async body => {

  return new Promise((resolve, reject) => {

    logFunctionSuccess(
      'potential-risk-engine.service',
      'getCriteria'
    );

    const criteriaData = await Criteria.find({});

    resolve(body);
  });
}

const addCriteria = async body => {
  return new Promise((resolve, reject) => {
    logFunctionSuccess(
      'potential-risk-engine.service',
      'addCriteria'
    );
  });

  const savedCriteria = await Criteria.save(body);

  resolve(savedCriteria);
}

module.exports = { addCriteria, getCriteria }