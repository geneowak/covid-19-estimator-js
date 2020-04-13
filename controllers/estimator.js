/* eslint-disable no-unused-vars */
const { body, validationResult } = require('express-validator');
const { toXML } = require('jstoxml');
const covid19ImpactEstimator = require('../src/estimator');

exports.validate = (item) => {
  switch (item) {
    case 'data': {
      // rules for the expected data
      return [
        body('region', 'region is required').exists(),
        body(
          'region.avgDailyIncomeInUSD',
          'region avgDailyIncomeInUSD is required'
        ).exists(),
        body(
          'region.avgDailyIncomePopulation',
          'region avgDailyIncomePopulation is required'
        ).exists(),
        body('periodType', 'periodType is required').exists(),
        body('timeToElapse', 'timeToElapse is required').exists(),
        body('reportedCases', 'reportedCases is required').exists(),
        body('population', 'population is required').exists(),
        body('totalHospitalBeds', 'totalHospitalBeds is required').exists()
      ];
    }
    default:
      return [];
  }
};
exports.estimatorJson = (req, res, next) => {
  try {
    // validate the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json(errors);
      return;
    }
    const data = req.body;
    res.json(covid19ImpactEstimator(data));
  } catch (error) {
    next(error);
  }
};

exports.estimatorXML = (req, res, next) => {
  try {
    // validate the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json(errors);
      return;
    }
    const data = req.body;
    // todo: return xml data with the right HTTP response headers for XML content
    res.type('application/xml');
    res.send(toXML(covid19ImpactEstimator(data)));
  } catch (error) {
    next(error);
  }
};
