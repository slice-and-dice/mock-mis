const request = require('request');
const { loggingService } = require('../../services');

const baseUrl = 'http://api.ratings.food.gov.uk';
const headers = {
  'x-api-version': '2',
}

const getAllBasic = async (type) => new Promise((resolve, reject) => {
  loggingService.logFunctionCall('fhrs.connector', 'getAllBasic', type);
  const options = {
    url: `${baseUrl}/${type}/basic`,
    headers 
  };

  request(options, (err, res) => {
    if (err) {
      loggingService.logFunctionError('fhrs.connector', 'getAllBasic', err);
      reject(err);
    }
    loggingService.logFunctionSuccess('fhrs.connector', 'getAllBasic');
    resolve(JSON.parse(res.body));
  });
});

const establishmentSearch = async (searchParams) => new Promise((resolve, reject) => {
  loggingService.logFunctionCall('fhrs.connector', 'establishmentSearch');
  const options = {
    url: `${baseUrl}/Establishments?`,
    headers 
  };
  Object.keys(searchParams).forEach((key) => {
    options.url += `${key}=${searchParams[key]}&`
  });

  request(options, (err, res) => {
    if (err) {
      loggingService.logFunctionError('fhrs.connector', 'establishmentSearch', err);
      reject(err);
    }
    loggingService.logFunctionSuccess('fhrs.connector', 'establishmentSearch');
    resolve(JSON.parse(res.body));
  });
});

module.exports = {
  getAllBasic,
  establishmentSearch,
};
