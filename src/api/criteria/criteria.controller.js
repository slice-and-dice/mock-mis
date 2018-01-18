const { loggingService, potentialRiskEngineService } = require('../../services');

const addCriteria = async body => {
  loggingService.logFunctionCall('criteria.controller', 'addCriteria');
  try {
    const result = await potentialRiskEngineService.addCriteria(body);
    loggingService.logFunctionSuccess('criteria.controller', 'addCriteria');
    return result;
  } catch (err) {
    loggingService.logFunctionError('criteria.controller', 'addCriteria', err);
    return err;
  }
}

module.exports = {
  addCriteria,
}