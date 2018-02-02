const flattenDeep = require('lodash.flattendeep');
const json2csv = require('json2csv');
const connector = require('./fhrs.connector');
const {
  loggingService
} = require('../../services');

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

const getEstablishmentsFromLa = async (la, filters) => {
  loggingService.logFunctionCall('fhrs.controller', 'getEstablishmentsFromLa');
  try {
    const allAuthorities = await connector.getAllBasic('Authorities');
    const laSummary = allAuthorities.authorities.filter(authority => authority.Name === la);
    const searchParams = Object.assign({
      name: '',
      localAuthorityId: laSummary[0].LocalAuthorityId,
    }, filters);
    const establishments = await connector.establishmentSearch(searchParams);
    loggingService.logFunctionSuccess('fhrs.controller', 'getEstablishmentsFromLa');
    return establishments;
  } catch (err) {
    loggingService.logFunctionError('fhrs.contoller', 'getEstablishmentsFromLa', err);
    return err;
  }
}

// This function is very slow and long running, and time complextity increseases hugely with input.
// Beyond the prototype level, a stream or paginated approach to building a report would be suitable.
const buildReport = async (body) => {
  loggingService.logFunctionCall('fhrs.controller', 'buildReport', body.la);

  try {
    const localAuthoritiesPromises = [];

    body.la.forEach((la) => {
      localAuthoritiesPromises.push(getEstablishmentsFromLa(la, body.filters));
    });

    const localAuthorities = await Promise.all(localAuthoritiesPromises);

    const combinedEstablishments = flattenDeep(localAuthorities.map(la => la.establishments));
    const filteredEstablishments = [];

    combinedEstablishments.forEach((establishment) => {
      const newEstablishment = Object.assign({}, establishment);

      body.excludedData.forEach((data) => {
        delete newEstablishment[data];
      });

      filteredEstablishments.push(newEstablishment);
    });

    const result = body.cutoffDate ?
      filteredEstablishments.filter(establishment => body.cutoffDate > establishment.RatingDate) :
      filteredEstablishments;

    loggingService.logFunctionSuccess('fhrs.controller', 'buildReport');
    return result;
  } catch (err) {
    loggingService.logFunctionError('fhrs.contoller', 'buildReport', err);
    return err;
  }
}

const writeCSV = async (data) => {
  loggingService.logFunctionCall('fhrs.controller', 'writeCSV');

  return new Promise((resolve, reject) => {

    try {
      const csvResult = json2csv({
        data,
        flatten: true
      });

      loggingService.logFunctionSuccess('fhrs.controller', 'writeCSV');

      resolve(csvResult);
    } catch (err) {
      loggingService.logFunctionError('fhrs.contoller', 'writeCSV', err);
      reject(err);
    }

  });

}

module.exports = {
  buildReport,
  getAllEstablishments,
  getEstablishmentsFromLa,
  writeCSV,
}