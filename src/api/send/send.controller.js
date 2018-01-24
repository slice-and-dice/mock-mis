const { formatConverterService, notifyService, potentialRiskEngineService, premiseValidatorService } = require('../../services/');

const store = require('../../store');
const winston = require('winston');

module.exports = async body => {
  winston.info('send controller called');

  const convertedData = formatConverterService.convert(
    body.data,
    body.config.authorityCode,
    'send'
  );

  try {
    const validatedData = body.config.enrichment.premiseValidation ? await premiseValidatorService.validate(convertedData) : {};
    const enrichedDataPromises = [];
    convertedData.forEach((data) => {
      enrichedDataPromises.push(potentialRiskEngineService.calculateRisk(data));
    });
    const potentialRiskEnrichedData = body.config.enrichment.riskCalculation ? await Promise.all(enrichedDataPromises) : {};

    const enrichedData = Object.assign(convertedData, validatedData, potentialRiskEnrichedData);
    const result = await store.pushToLa(
      enrichedData,
      body.config.authorityCode
    );

    if(process.env.EMAIL_TEMPLATE && body.email) {
      notifyService.notify(process.env.EMAIL_TEMPLATE, body.email);
    }
    return result;
  } catch (err) {
    winston.error(`send controller error: ${err}`);
    return err;
  }
};
