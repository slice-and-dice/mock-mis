const { formatConverterService, notifyService } = require('../../services/');
const store = require('../../store');
const winston = require('winston');

module.exports = async body => {
  winston.info('send controller called');
  const convertedData = formatConverterService.convert(
    body.data,
    body.config.targetFormat
  );
  try {
    const result = await store.pushToLa(
      convertedData,
      body.config.destinationLA
    );
    notifyService.notify(process.env.EMAIL_TEMPLATE, body.email);
    return result;
  } catch (err) {
    winston.error(`send controller error: ${err}`);
    return err;
  }
};
