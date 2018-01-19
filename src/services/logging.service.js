const { info, error } = require('winston');

const logFunctionCall = (component, func, paramInfo) => {
  info(`${component}: ${func} called ${paramInfo ? `with ${paramInfo}` : ''}`);
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