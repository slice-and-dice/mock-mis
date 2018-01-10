const request = require('request');

const apiKey = process.env.PREMISE_VALIDATOR_API_KEY

const baseUrl = 'https://api.ordnancesurvey.co.uk/places/v1/addresses/postcode?';

const randomlyFail = () => Math.random() > 0.9;

const validate = data => {
    return new Promise((resolve, reject) => {
        if (randomlyFail()) {
            reject(new Error('Could not validate address data'));
        } else {
            data.forEach(org => {
                if (org.postcode) {
                    const url = `${baseUrl}postcode=${org.postcode}&key=${apiKey}`;

                    request(url, (err, res) => {
                        const body = JSON.parse(res.body);
                        const { results } = body;

                        org.addressValidated = results.find(result => {
                            return result.DPA.POSTCODE.toUpperCase() === org.postcode.toUpperCase() && result.DPA.ORGANISATION_NAME === org.organisationName.toUpperCase();
                        }) ? true : false;

                        return org;
                    });

                }
            });
            resolve(data);
        }
    });
};

module.exports = { validate };