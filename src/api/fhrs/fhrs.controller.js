const connector = require('./fhrs.connector');
const { loggingService } = require('../../services');

const getAllEstablishments = async () => {
  loggingService.logFunctionCall('fhrs.controller', 'getAllEstablishments');
  try {
    const result = await connector.getAllEstablishments();
    loggingService.logFunctionSuccess('fhrs.controller', 'getAllEstablishments');
    return result;
  } catch (err) {
    loggingService.logFunctionError('fhrs.controller', 'getAllEstablishments', err);
    return err;
  }
}

module.exports = {
  getAllEstablishments,
}