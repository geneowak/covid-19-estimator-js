require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const router = require('./routes/index');

const app = express();
const logDir = 'logs';

// apply middleware to handle post requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create log folder if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
// specify log format
const format = ':method\t\t:url\t\t:status\t\t:response-time[0]ms';
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'requests.log'),
  {
    flags: 'a'
  }
);
// add logger
app.use(morgan(format, { stream: accessLogStream }));

// add routes
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port ', PORT);
});
