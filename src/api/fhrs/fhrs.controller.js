const connector = require('./fhrs.connector');
const { loggingService } = require('../../services');

const getAllEstablishments = async () => {
  loggingService.logFunctionCall('fhrs.controller', 'getAllEstablishments');
  try {
    const result = await connector.getAllBasic('Establishments');
    loggingService.logFunctionSuccess('fhrs.controller', 'getAllEstablishments');
    return result;
  } catch (err) {
    loggingService.logFunctionError('fhrs.controller', 'getAllEstablishments', err);
    return err;
  }
}

const getEstablishmentsFromLa = async (la) => {
  loggingService.logFunctionCall('fhrs.controller', 'getEstablishmentsFromLa');
  try {
    const allAuthorities = await connector.getAllBasic('Authorities');
    const laSummary = allAuthorities.authorities.filter(authority => authority.Name === la);
    const searchParams = {
      name: '',
      localAuthorityId: laSummary[0].LocalAuthorityId,
    }
    const establishments = await connector.establishmentSearch(searchParams);
    loggingService.logFunctionSuccess('fhrs.controller', 'getEstablishmentsFromLa');
    return establishments;
  } catch (err) {
    loggingService.logFunctionError('fhrs.contoller', 'getEstablishmentsFromLa');
    return err;
  }
}

module.exports = {
  getAllEstablishments,
  getEstablishmentsFromLa,
}