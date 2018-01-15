const request = require('request');
const winston = require('winston');

const apiKey = process.env.PREMISE_VALIDATOR_API_KEY

const baseUrl = 'https://api.ordnancesurvey.co.uk/places/v1/addresses/postcode?';

const randomlyFail = () => Math.random() > 0.9;

const isAddressValid = (data, postcode, orgName) => {
    return typeof data.find(result => result.DPA.POSTCODE.toUpperCase() === postcode.toUpperCase() && result.DPA.ORGANISATION_NAME && result.DPA.ORGANISATION_NAME.toUpperCase() === orgName.toUpperCase()) === 'object';
}

const validate = data => {
    return new Promise((resolve, reject) => {
        if (randomlyFail()) {
            reject(new Error('Could not validate address data'));
        } else {
            const output = [];

            data.map(org => {
                const processedOrg = Object.assign({}, org);

                if (apiKey && org.postcode) {
                    const url = `${baseUrl}postcode=${org.postcode}&key=${apiKey}`;

                    request(url, (err, res) => {
                        if (err) {
                            winston.info('premise-validator.service: data retrieval failed');
                            reject(err);
                        }

                        const { results } = JSON.parse(res.body);

                        processedOrg.addressValidated = isAddressValid(results, org.postcode, org.organisationName);
                    });
                }

                output.push(processedOrg);
            });

            winston.info('premise-validator.service: data retrieval successful');
            resolve(output);
        }
    });
};

module.exports = { validate };