/* eslint-disable operator-linebreak */
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
  impact.casesForICUByRequestedTime = Math.floor(
    0.05 * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = Math.floor(
    0.02 * impact.infectionsByRequestedTime
  );
  impact.dollarsInFlight =
    Math.round(
      impact.infectionsByRequestedTime *
        region.avgDailyIncomePopulation *
        region.avgDailyIncomeInUSD *
        noOfDays *
        100
    ) / 100;

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
  severeImpact.casesForICUByRequestedTime = Math.floor(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.dollarsInFlight =
    Math.round(
      severeImpact.infectionsByRequestedTime *
        region.avgDailyIncomePopulation *
        region.avgDailyIncomeInUSD *
        noOfDays *
        100
    ) / 100;

  return { data, impact, severeImpact };
}
export default covid19ImpactEstimator;
