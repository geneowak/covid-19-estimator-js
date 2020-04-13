const express = require('express');
const estimatorController = require('../controllers/estimator');
const logsController = require('../controllers/logs');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.json('Welcome to our overly simplified COVID-19 estimator.');
});
// eslint-disable-next-line no-unused-vars
router.post(
  '/api/v1/on-covid-19',
  estimatorController.validate('data'),
  estimatorController.estimatorJson
);
// eslint-disable-next-line no-unused-vars
router.post(
  '/api/v1/on-covid-19/json',
  estimatorController.validate('data'),
  estimatorController.estimatorJson
);
// eslint-disable-next-line no-unused-vars
router.post(
  '/api/v1/on-covid-19/xml',
  estimatorController.validate('data'),
  estimatorController.estimatorXML
);
// eslint-disable-next-line no-unused-vars
router.get('/api/v1/on-covid-19/logs', [], logsController.getLogs);
module.exports = router;
