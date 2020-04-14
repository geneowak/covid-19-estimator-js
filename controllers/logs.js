/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs');

const logFile = 'logs/requests.log';

exports.getLogs = (req, resp, next) => {
  resp.type('text/plain');
  // resp.sendFile(path.resolve(logFile));
  fs.readFile(path.resolve(logFile), (e, data) => {
    if (e) throw e;
    resp.send(data);
  });
};
