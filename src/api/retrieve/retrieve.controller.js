const store = require('../../store');
const winston = require('winston');
const formatConverterService = require('../../services/format-converter.service');

const convertRetrievedData = (data, authorityCode) => {
  const convertedData = formatConverterService.convert(
    data,
    authorityCode,
    'retrieve'
  );

  return convertedData;
}

const retrieveAllLas = async (standardisedSwitch) => {
  winston.info('retrieve.controller: retrieveAllLas called');
  try {
    let result = await store.getAllLas();
    if(standardisedSwitch !== 'false') {
      const resultConverted = {};
      Object.keys(result).forEach((authorityCode) => {
        resultConverted[authorityCode] = convertRetrievedData(result[authorityCode], authorityCode);
      });
      result = resultConverted;
    }
    winston.info('retrieve.controller: retrieveAllLas succeeded');
    return result;
  } catch (err) {
    winston.error(`retrieve.controller: retrieveAllLas failed: ${err}`);
    return err;
  }
};

const retrieveLa = async (la, standardisedSwitch) => {
  try {
    let result = await store.getLa(la);
    if(standardisedSwitch !== 'false') {
      result = convertRetrievedData(result, la);
    }
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
