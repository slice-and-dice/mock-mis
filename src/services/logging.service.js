const { info, error } = require('winston');

const logFunctionCall = (component, func) => {
  info(`${component}: ${func} called`)
}

const logFunctionSuccess = (component, func) => {
  info(`${component}: ${func} successful`)
}

const logFunctionError = (component, func, err) => {
  error(`${component}: ${func} failed: ${err}`);
}

module.exports = {
  logFunctionCall,
  logFunctionSuccess,
  logFunctionError,
}