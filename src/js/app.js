const form = document.getElementsByTagName('form')[0];
const population = document.getElementById('population');
const timeToElapse = document.getElementById('time-to-elapse');
const periodType = document.getElementById('period-type');
const reportedCases = document.getElementById('reported-cases');
const totalHospitalBeds = document.getElementById('total-hospital-beds');
const resultSection = document.getElementById('result-container');
const calcbtn = document.getElementById('calcbtn');
const inputs = document.querySelectorAll('input');
const resultmodal = document.querySelector('.resultmodal');
const closebtn = document.querySelector('.close');

const validateInput = () => {
  let errors = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === '') {
      ++errors;
      inputs[i].focus();
      inputs[i].classList.add('invalid');
    } else {
      inputs[i].classList.remove('invalid');
    }
  }

  if (errors === 0) {
    return true;
  } else {
    return false;
  }
};

const calculateEstimate = () => {
  resultSection.innerHTML = '';
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      avgDailyIncomePopulation: 0.73
    },
    periodType: periodType.value,
    timeToElapse: timeToElapse.value,
    reportedCases: reportedCases.value,
    population: population.value,
    totalHospitalBeds: totalHospitalBeds.value
  };

  periodType.value = '';
  timeToElapse.value = '';
  reportedCases.value = '';
  population.value = '';
  totalHospitalBeds.value = '';

  const {
    impact,
    severeImpact,
    data: { timeToElapse: time, periodType: period }
  } = covid19ImpactEstimator(data);

  resultSection.innerHTML = `
            <section class="card bg-light mx-5 my-3">
                <div class="card-body">
                    <h3 class="card-title text-warning">Average Impact</h3>
                    <p class="card-text"><strong>Number of people currently infected:</strong> ${impact.currentlyInfected.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of people infected in ${time.toLocaleString()} ${period} time:</strong> ${impact.infectionsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of severe cases in ${time.toLocaleString()} ${period} time:</strong> ${impact.severeCasesByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of available hospital beds in ${time.toLocaleString()} ${period} time:</strong> ${impact.hospitalBedsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of ICU cases in ${time.toLocaleString()} ${period} time:</strong> ${impact.casesForICUByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of patients in need of ventilators in ${time.toLocaleString()} ${period} time:</strong> ${impact.casesForVentilatorsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Amount of money lost by the economy daily in ${time.toLocaleString()} ${period} time:</strong> ${impact.dollarsInFlight.toLocaleString(
    'en-US',
    { style: 'currency', currency: 'USD' }
  )}</p>
                </div>
            </section>
            <section class="card bg-light mx-5 my-3">
                <div class="card-body">
                    <h3 class="card-title text-danger">Severe Impact</h3>
                    <p class="card-text"><strong>Number of people currently infected:</strong>  ${severeImpact.currentlyInfected.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of people infected in ${time.toLocaleString()} ${period} time:</strong> ${severeImpact.infectionsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of severe cases in ${time.toLocaleString()} ${period} time:</strong> ${severeImpact.severeCasesByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of available hospital beds in ${time.toLocaleString()} ${period} time:</strong> ${severeImpact.hospitalBedsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of ICU cases in ${time.toLocaleString()} ${period} time:</strong> ${severeImpact.casesForICUByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Number of patients in need of ventilators in ${time.toLocaleString()} ${period} time:</strong> ${severeImpact.casesForVentilatorsByRequestedTime.toLocaleString()}</p>
                    <p class="card-text"><strong>Amount of money lost by the economy daily in ${time.toLocaleString()} ${period} time:</strong> ${severeImpact.dollarsInFlight.toLocaleString(
    'en-US',
    { style: 'currency', currency: 'USD' }
  )}</p>
                </div>
            </section>
    `;
};

calcbtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateInput()) {
    calculateEstimate();
    resultmodal.classList.remove('hidden');
  }
});

closebtn.addEventListener('click', (e) => {
  resultmodal.classList.add('hidden');
});
