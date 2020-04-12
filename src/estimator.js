/* eslint-disable operator-linebreak */
module.exports = {
  testData: {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      avgDailyIncomePopulation: 0.73
    },
    periodType: 'days',
    timeToElapse: 38,
    reportedCases: 2747,
    population: 92931687,
    totalHospitalBeds: 678874
  },

  covid19ImpactEstimator(data) {
    // eslint-disable-next-line object-curly-newline
    const { reportedCases, timeToElapse, periodType, totalHospitalBeds } = data;
    let noOfDays = 0;
    switch (periodType) {
      case 'days':
        noOfDays = timeToElapse;
        break;
      case 'weeks':
        noOfDays = timeToElapse * 7;
        break;
      case 'months':
        noOfDays = timeToElapse * 30;
        break;
      default:
        throw new Error('Period type not supported.');
    }
    const factor = Math.floor(noOfDays / 3);
    const projectionMultiplier = 2 ** factor;
    const impact = {};
    impact.currentlyInfected = reportedCases * 10;
    impact.infectionsByRequestedTime =
      impact.currentlyInfected * projectionMultiplier;
    impact.severeCasesByRequestedTime = Math.floor(
      0.15 * impact.infectionsByRequestedTime
    );
    impact.hospitalBedsByRequestedTime =
      Math.round(0.35 * totalHospitalBeds) - impact.severeCasesByRequestedTime;

    const severeImpact = {};
    severeImpact.currentlyInfected = reportedCases * 50;
    severeImpact.infectionsByRequestedTime =
      severeImpact.currentlyInfected * projectionMultiplier;
    severeImpact.severeCasesByRequestedTime = Math.floor(
      0.15 * severeImpact.infectionsByRequestedTime
    );
    severeImpact.hospitalBedsByRequestedTime =
      Math.round(0.35 * totalHospitalBeds) -
      severeImpact.severeCasesByRequestedTime;

    return { data, impact, severeImpact };
  }
};
// export default covid19ImpactEstimator;
// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');
