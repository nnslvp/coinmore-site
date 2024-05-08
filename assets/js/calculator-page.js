const API_URL = 'https://api.coinmore.io';
const CALCULATE_BTN = document.getElementById('calculate-btn');
const CALCULATOR_FORM = document.forms.calculator_form;

const selectCurrency = ItcCustomSelect.create('#select-currency', {
	name: 'interval',
	placeholder: 'Select currency',
	targetValue: 'USD',
	options: [
		['USD', 'USD'],
		['week', 'Week'],
	],
	onSelected(select, option) {
		console.log(`Выбранное значение: ${select.value}`);
		console.log(`Индекс выбранной опции: ${select.selectedIndex}`);
		const text = option ? option.textContent : '';
		console.log(`Выбранный текст опции: ${text}`);
	},
});

function statsApiCall(action) {
	return fetch(`${API_URL}${action}`).then(response => response.json());
}

function fetchPoolProfit() {
	return statsApiCall('/profit?coin=alephium');
}

function fetchRate() {
	return statsApiCall(`/rate?coin=alephium`);
}

function getPoolProfitUSD(rate, profit) {
	return profit * rate;
}

function perHour(value) {
	return value / 24;
}

function costsPerTime(powerConsumption, electricityCosts, multiplier = 1) {
	return ((powerConsumption * multiplier) / 1000) * electricityCosts;
}

function perWeek(value) {
	return value * 7;
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

function addValuesRow(period, reward, income, costs, profit, currencyValue) {
	addValue(period, 'reward-value', reward, 'ALPH');
	addValue(period, 'income-value', income, currencyValue);
	addValue(period, 'electricity-costs__value', costs, currencyValue, '-');
	addValue(period, 'profit-value', profit, currencyValue);
}

function generateTable(calculatorForm) {
	CALCULATE_BTN.disabled = true;
	CALCULATE_BTN.classList.add('disabled');
	const hashrateValue = calculatorForm.hashrate?.value;
	const powerConsumptionValue = calculatorForm.powerConsumption?.value;
	const currencyValue = selectCurrency.value;
	const electricityCostsValue = calculatorForm.electricityCosts?.value;
	console.log(hashrateValue, powerConsumptionValue, electricityCostsValue);
	Promise.all([fetchRate(), fetchPoolProfit()]).then(function ([
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
			currencyValue
		);

		addValuesRow(
			'day',
			reward,
			income,
			costsPerTime(powerConsumptionValue, electricityCostsValue, 24),
			income - costsPerTime(powerConsumptionValue, electricityCostsValue, 24),
			currencyValue
		);

		addValuesRow(
			'week',
			perWeek(reward),
			perWeek(income),
			costsPerTime(powerConsumptionValue, electricityCostsValue, 168),
			perWeek(income) -
				costsPerTime(powerConsumptionValue, electricityCostsValue, 168),
			currencyValue
		);
	});
	CALCULATE_BTN.disabled = false;
	CALCULATE_BTN.classList.remove('disabled');
}

CALCULATOR_FORM.addEventListener('submit', function (event) {
	event.preventDefault();
	generateTable(CALCULATOR_FORM);
});

function init(calculatorForm) {
	generateTable(calculatorForm);
}

init(CALCULATOR_FORM);
