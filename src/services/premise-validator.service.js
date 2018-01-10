const request = require('request');
const winston = require('winston');

const apiKey = process.env.PREMISE_VALIDATOR_API_KEY

const baseUrl = 'https://api.ordnancesurvey.co.uk/places/v1/addresses/postcode?';

const randomlyFail = () => Math.random() > 0.9;

const validate = data => {
    return new Promise((resolve, reject) => {
        if (randomlyFail()) {
            reject(new Error('Could not validate address data'));
        } else {
            data.forEach(org => {
                if (apiKey && org.postcode) {
                    const url = `${baseUrl}postcode=${org.postcode}&key=${apiKey}`;

                    request(url, (err, res) => {
                        if (err) {
                            winston.info('premise-validator.service: data retrieval failed');
                            reject(err);
                        }
                        const body = JSON.parse(res.body);
                        const { results } = body;

                        org.addressValidated = results.find(result => {
                            return result.DPA.POSTCODE.toUpperCase() === org.postcode.toUpperCase() && result.DPA.ORGANISATION_NAME === org.organisationName.toUpperCase();
                        }) ? true : false;

                        return org;
                    });

                }
            });

            winston.info('premise-validator.service: data retrieval successful');

            resolve(data);
        }
    });
};

module.exports = { validate };