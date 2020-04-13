/* eslint-disable operator-linebreak */
/**
 *
 * @param {float} number number to truncate
 * @param {int} digits number of decimal places
 */
function truncateDecimals(number, digits = 0) {
  const multiplier = digits === 0 ? 1 : 10 ** digits;
  const adjustedNum = number * multiplier;
  const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
}
function covid19ImpactEstimator(data) {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region
  } = data;
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
  const factor = truncateDecimals(noOfDays / 3);
  const projectionMultiplier = 2 ** factor;
  const availableBedsForSevereCases = Math.round(0.35 * totalHospitalBeds);

  const impact = {};
  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime =
    impact.currentlyInfected * projectionMultiplier;
  // challenge 2
  impact.severeCasesByRequestedTime = truncateDecimals(
    0.15 * impact.infectionsByRequestedTime
  );
  impact.hospitalBedsByRequestedTime =
    availableBedsForSevereCases - impact.severeCasesByRequestedTime;
  // challenge 3
  impact.casesForICUByRequestedTime = truncateDecimals(
    0.05 * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = truncateDecimals(
    0.02 * impact.infectionsByRequestedTime
  );
  impact.dollarsInFlight =
    impact.infectionsByRequestedTime *
    region.avgDailyIncomePopulation *
    region.avgDailyIncomeInUSD *
    noOfDays;
  impact.dollarsInFlight = truncateDecimals(impact.dollarsInFlight, 2);

  const severeImpact = {};
  // challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * projectionMultiplier;
  // challenge 2
  severeImpact.severeCasesByRequestedTime = truncateDecimals(
    0.15 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime =
    availableBedsForSevereCases - severeImpact.severeCasesByRequestedTime;
  // challenge 3
  severeImpact.casesForICUByRequestedTime = truncateDecimals(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = truncateDecimals(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.dollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    region.avgDailyIncomePopulation *
    region.avgDailyIncomeInUSD *
    noOfDays;
  severeImpact.dollarsInFlight = truncateDecimals(
    severeImpact.dollarsInFlight,
    2
  );

  return { data, impact, severeImpact };
}
module.exports = covid19ImpactEstimator;
