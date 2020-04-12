/* eslint-disable operator-linebreak */
const covid19ImpactEstimator = (data) => {
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
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  impact.hospitalBedsByRequestedTime =
    Math.floor(0.35 * totalHospitalBeds) - impact.severeCasesByRequestedTime;

  const severeImpact = {};
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * projectionMultiplier;
  severeImpact.severeCasesByRequestedTime =
    0.15 * severeImpact.infectionsByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime =
    Math.floor(0.35 * totalHospitalBeds) -
    severeImpact.severeCasesByRequestedTime;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
