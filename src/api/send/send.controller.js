const { formatConverterService, notifyService, premiseValidatorService } = require('../../services/');

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
    const validatedData = await premiseValidatorService.validate(convertedData);

    const result = await store.pushToLa(
      validatedData,
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
