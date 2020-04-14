/**
 *
 * @param {float} number number to truncate
 * @param {int} digits number of decimal places
 */
const truncateDecimals = (number, digits = 0) => {
  const multiplier = digits === 0 ? 1 : 10 ** digits;
  const adjustedNum = number * multiplier;
  const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
};

const getDays = (timeToElapse, periodType) => {
  switch (periodType) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      throw new Error('Period type not supported.');
  }
};

const impact = {};
const severeImpact = {};

const challenge1 = (reportedCases, noOfDays) => {
  // calculate currentlyInfected
  const factor = truncateDecimals(noOfDays / 3);
  const projectionMultiplier = 2 ** factor;
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;
  // calculate infectionsByRequestedTime
  impact.infectionsByRequestedTime =
    impact.currentlyInfected * projectionMultiplier;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * projectionMultiplier;
};

const challenge2 = (totalHospitalBeds) => {
  // calculate severeCasesByRequestedTime
  impact.severeCasesByRequestedTime = truncateDecimals(
    0.15 * impact.infectionsByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = truncateDecimals(
    0.15 * severeImpact.infectionsByRequestedTime
  );
  // calculate hospitalBedsByRequestedTime
  const availableBedsForSevereCases = 0.35 * totalHospitalBeds;
  impact.hospitalBedsByRequestedTime = truncateDecimals(
    availableBedsForSevereCases - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = truncateDecimals(
    availableBedsForSevereCases - severeImpact.severeCasesByRequestedTime
  );
};

const challenge3 = (region, noOfDays) => {
  // calculate casesForICUByRequestedTime
  impact.casesForICUByRequestedTime = truncateDecimals(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = truncateDecimals(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  // calculate casesForVentilatorsByRequestedTime
  impact.casesForVentilatorsByRequestedTime = truncateDecimals(
    0.02 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = truncateDecimals(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  // calculate dollarsInFlight
  const incomes = region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD;
  impact.dollarsInFlight = truncateDecimals(
    (impact.infectionsByRequestedTime * incomes) / noOfDays,
    2
  );
  severeImpact.dollarsInFlight = truncateDecimals(
    (severeImpact.infectionsByRequestedTime * incomes) / noOfDays,
    2
  );
};

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region
  } = data;
  const noOfDays = getDays(timeToElapse, periodType);
  // challenge 1
  challenge1(reportedCases, noOfDays);

  // challenge 2
  challenge2(totalHospitalBeds);

  // challenge 3
  challenge3(region, noOfDays);

  return { data, impact, severeImpact };
};

module.exports = covid19ImpactEstimator;
