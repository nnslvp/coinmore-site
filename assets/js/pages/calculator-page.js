const API_URL = 'https://api.coinmore.io';
const CALCULATE_BTN = document.getElementById('calculate-btn');
const CALCULATOR_FORM = document.forms.calculator_form;

const selectCurrency = ItcCustomSelect.create('#select-currency', {
	name: 'interval',
	placeholder: 'Select coin',
	targetValue: 'alephium',
	options: COINS.map(coin => [coin.name, coin.symbol]),
});

function perHour(value) {
	return value / 24;
}

function costsPerTime(powerConsumption, electricityCosts, multiplier = 1) {
	return ((powerConsumption * multiplier) / 1000) * electricityCosts;
}

function perWeek(value) {
	return value * 7;
}

function getPoolProfitUSD(rate, profit) {
	return profit * rate;
}

function addCell(td) {
	return td.insertCell();
}

function addValue(tr, cell, value, currencyValue = '', sign = '') {
	document
		.querySelector(`#period-${tr}`)
		.querySelector(`.${cell}`).textContent =
		`${sign}` + ` ${parseFloat(value).toFixed(4)}` + ` ${currencyValue}`;
}

function addValuesRow(period, reward, income, costs, profit, coinSymbol) {
	addValue(period, 'reward-value', reward, coinSymbol);
	addValue(period, 'income-value', income, coinSymbol);
	addValue(period, 'electricity-costs__value', costs, coinSymbol, '-');
	addValue(period, 'profit-value', profit, coinSymbol);
}

function generateTable(calculatorForm) {
	CALCULATE_BTN.disabled = true;
	CALCULATE_BTN.classList.add('disabled');
	const hashrateValue = calculatorForm.hashrate?.value;
	const powerConsumptionValue = calculatorForm.powerConsumption?.value;
	const coin = selectCurrency.value;
	const coinSymbol = selectCurrency.valueTextContent;
	const electricityCostsValue = calculatorForm.electricityCosts?.value;
	Promise.all([fetchRate(coin), fetchPoolProfit(coin)]).then(function ([
		{ rate },
		{ profit },
	]) {
		let reward = profit * hashrateValue;
		let income = getPoolProfitUSD(rate.value, reward);

		addValuesRow(
			'hour',
			perHour(reward),
			perHour(income),
			costsPerTime(powerConsumptionValue, electricityCostsValue),
			perHour(income) -
				costsPerTime(powerConsumptionValue, electricityCostsValue),
			coinSymbol
		);

		addValuesRow(
			'day',
			reward,
			income,
			costsPerTime(powerConsumptionValue, electricityCostsValue, 24),
			income - costsPerTime(powerConsumptionValue, electricityCostsValue, 24),
			coinSymbol
		);

		addValuesRow(
			'week',
			perWeek(reward),
			perWeek(income),
			costsPerTime(powerConsumptionValue, electricityCostsValue, 168),
			perWeek(income) -
				costsPerTime(powerConsumptionValue, electricityCostsValue, 168),
			coinSymbol
		);
	});
	CALCULATE_BTN.disabled = false;
	CALCULATE_BTN.classList.remove('disabled');
}


CALCULATOR_FORM.addEventListener('submit', function (event) {
	event.preventDefault();
  document.querySelectorAll('input').forEach(input => {
    input.nextElementSibling.classList.remove('show')
			if (!input.validity.valid) {
				showError(input);
				return;
			}
	});
	generateTable(CALCULATOR_FORM);
});


function showError(input) {
	const errorElement = input.nextElementSibling;
  errorElement.classList.add('show');
	if (input.validity.valueMissing) {
		errorElement.textContent = 'This field is required.';
	} else if (input.validity.typeMismatch) {
		errorElement.textContent = 'Please enter a valid value.';
	} else if (input.validity.tooShort) {
		errorElement.textContent = `Value must be at least ${input.minLength} characters long.`;
	} else if (input.validity.tooLong) {
		errorElement.textContent = `Value must be no more than ${input.maxLength} characters long.`;
	} else if (input.validity.rangeUnderflow) {
		errorElement.textContent = `Value must be at least ${input.min}.`;
	} else if (input.validity.rangeOverflow) {
		errorElement.textContent = `Value must be no more than ${input.max}.`;
	} else if (input.validity.patternMismatch) {
		errorElement.textContent = 'Please match the requested format.';
	} else if (!Number.isInteger(input.value)) {
		errorElement.textContent = 'Please enter a number.';
	} else {
		errorElement.textContent = 'Invalid value.';
	}
}

function clearError(input) {
	const errorElement = document.getElementById(`${input.id}Error`);
	errorElement.textContent = '';
}

function init(calculatorForm) {
	generateTable(calculatorForm);
}

init(CALCULATOR_FORM);
