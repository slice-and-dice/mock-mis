const store = require('../../store');
const winston = require('winston');

const retrieveAllLas = async () => {
  winston.info('retrieve.controller: retrieveAllLas called');
  try {
    const result = await store.getAllLas();
    winston.info('retrieve.controller: retrieveAllLas succeeded');
    return result;
  } catch (err) {
    winston.error(`retrieve.controller: retrieveAllLas failed: ${err}`);
    return err;
  }
};

const retrieveLa = async la => {
  try {
    const result = await store.getLa(la);
    winston.info('retrieve.controller: retrieveLa succeeded');
    return result;
  } catch (err) {
    winston.error(`retrieve.controller: retrieveLa failed: ${err}`);
    return err;
  }
};

module.exports = {
  retrieveAllLas,
  retrieveLa,
};
