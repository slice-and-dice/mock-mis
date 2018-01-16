const request = require('request');
const { loggingService } = require('../../services');

const baseUrl = 'http://api.ratings.food.gov.uk/';
const headers = {
  'x-api-version': '2',
}

const getAllEstablishments = async () => new Promise((resolve, reject) => {
  loggingService.logFunctionCall('fhrs.connector', 'getAllEstablishments');
  const options = {
    url: `${baseUrl}/Establishments/basic`,
    headers 
  };

  request(options, (err, res) => {
    if (err) {
      loggingService.logFunctionError('fhrs.connector', 'getAllEstablishments', err);
      reject(err);
    }
    loggingService.logFunctionSuccess('fhrs.connector', 'getAllEstablishments');
    resolve(JSON.parse(res.body));
  });
});

module.exports = {
  getAllEstablishments,
};
