const Criteria = require('../models/Criteria');
const { logFunctionSuccess } = require('./logging.service');
const mongoose = require('mongoose');

const options = {
  useMongoClient: true
};

mongoose.connect(process.env.RISK_RULES_DB_URL, options);

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const getCriteria = async () => 
  new Promise((resolve) => {

    const criteriaData = Criteria.find({});

    logFunctionSuccess(
      'potential-risk-engine.service',
      'getCriteria'
    );
    resolve(criteriaData);
  });

const addCriteria = async body => 
  new Promise((resolve) => {
    const criteria = new Criteria();
    criteria.riskType = body.riskType;
    criteria.riskValue = body.riskValue;
    const savedCriteria = criteria.save();
    logFunctionSuccess(
      'potential-risk-engine.service',
      'addCriteria'
    );
    resolve(savedCriteria);
  });

const updateCriteria = async body => 
  new Promise((resolve) => {
    console.log(body);
    const updatedCriteria = Criteria.findOneAndUpdate(
      { riskType: body.riskType }, 
      { riskType: body.riskType, riskValue: body.riskValue }
    );
    logFunctionSuccess(
      'potential-risk-engine.service',
      'updateCriteria'
    );
    resolve(updatedCriteria);
  });

const calculateRisk = async (data) => {
  const riskRules = await getCriteria();
  return new Promise((resolve) => {
    const riskScores = [];
    riskRules.forEach((rule) => {
      if (data[rule.riskType] === true) {
        riskScores.push(rule.riskValue);
      }
    });
    const riskObject = {riskScore: riskScores.reduce(((a, b) => a + b), 0) };
    const enrichedData = Object.assign(riskObject, data);
    logFunctionSuccess(
      'potential-risk-engine.service',
      'calculateRisk'
    );
    resolve(enrichedData);
  });
  
};

module.exports = { addCriteria, getCriteria, updateCriteria, calculateRisk };