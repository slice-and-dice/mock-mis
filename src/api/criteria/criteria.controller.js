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

const getCriteria = async () => {
  loggingService.logFunctionCall('criteria.controller', 'getCriteria');
  try {
    const result = await potentialRiskEngineService.getCriteria();
    loggingService.logFunctionSuccess('criteria.controller', 'getCriteria');
    return result;
  } catch (err) {
    loggingService.logFunctionError('criteria.controller', 'getCriteria', err);
    return err;
  }
}

const updateCriteria = async (body) => {
  loggingService.logFunctionCall('criteria.controller', 'updateCriteria');
  try {
    const result = await potentialRiskEngineService.updateCriteria(body);
    loggingService.logFunctionSuccess('criteria.controller', 'updateCriteria');
    return result;
  } catch (err) {
    loggingService.logFunctionError('criteria.controller', 'updateCriteria', err);
    return err;
  }
}

module.exports = {
  addCriteria,
  getCriteria,
  updateCriteria
}