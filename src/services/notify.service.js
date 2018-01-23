const { NotifyClient } = require('notifications-node-client');
const winston = require('winston');

if(process.env.NOTIFY_KEY) {
  const notifyClient = new NotifyClient(process.env.NOTIFY_KEY);

const notify = (template, email) => {
  winston.info('notify.service: notify called');
  return new Promise((resolve, reject) => {
    if (!email) {
      resolve({});
    }

    notifyClient.sendEmail(template, email)
      .then(response => {
        winston.info('notify.service: notify successful')
        resolve(response)
      })
      .catch(err => {
        winston.info('notify.service: notify failed')
        reject(err)
      })
  });
}

  module.exports = { notify };
