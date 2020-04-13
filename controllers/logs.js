/* eslint-disable no-unused-vars */
const path = require('path');

const logFile = 'logs/requests.log';

exports.getLogs = (req, resp, next) => {
  resp.sendFile(path.resolve(logFile));
};
