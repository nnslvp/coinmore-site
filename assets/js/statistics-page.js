const CHART_HASH_RATE = document.querySelector('#chartYourHashrate');
const CHARTS_HISTORY_CELL_TABLE = document.querySelectorAll('#historyChart');
const CHART_BASE_OPTIONS = {
	type: 'line',
	data: {
		labels: [
			'Value 1',
			'Value 2',
			'Value 3',
			'Value 4',
			'Value 5',
			'Value 6',
			'Value 7',
			'Value 8',
			'Value 9',
		],
		datasets: [
			{
				label: 'Hashrate',
				data: [30, 33, 29, 20, 28, 17, 18, 29, 30],
				backgroundColor: 'rgba(155, 77, 202, 0.24)',
				borderColor: '#9B4DCA',
				borderWidth: 2,
				fill: true,
				pointRadius: 0,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
				min: 0,
				max: 40,
				ticks: {
					stepSize: 10,
				},
				grid: {
					display: false,
				},
			},
			x: {
				grid: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
			title: {
				display: true,
				text: 'EH/s',
				font: {
					size: 14,
				},
				color: '#606C76',
				position: 'top',
				align: 'start',
				font: { weight: 'normal' },
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	},
};
const CHART_HISTORY_CELL_TABLE_OPTIONS = getChartOptions({
	options: {
		scales: {
			y: {
				ticks: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
			x: {
				ticks: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
			title: {
				display: false,
			},
		},
	},
});

const MODAL = document.querySelector('.modal');
const OPEN_MODAL_BTN = document.querySelector('.open-button');

function initializeChart(chartElement, chartOptions) {
	const ctx = chartElement.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(155, 77, 202, 0.24)');
	gradient.addColorStop(1, 'rgba(155, 77, 202, 0)');

	chartOptions.data.datasets.forEach(dataset => {
		dataset.backgroundColor = gradient;
	});

	let chart = new Chart(ctx, chartOptions);
	return chart;
}

function deepMerge(target, source) {
	Object.keys(source).forEach(key => {
		if (source[key] && typeof source[key] === 'object') {
			target[key] = target[key] || (Array.isArray(source[key]) ? [] : {});
			deepMerge(target[key], source[key]);
		} else {
			target[key] = source[key];
		}
	});
	return target;
}

function getChartOptions(newOptions) {
	if (!newOptions) {
		return CHART_BASE_OPTIONS;
	}
	const options = JSON.parse(JSON.stringify(CHART_BASE_OPTIONS));
	return deepMerge(options, newOptions);
}

const hashRateChart = initializeChart(CHART_HASH_RATE, getChartOptions());

CHARTS_HISTORY_CELL_TABLE.forEach(chart => {
	initializeChart(chart, getChartOptions(CHART_HISTORY_CELL_TABLE_OPTIONS));
});

function updateChartData(chart, newData) {
	chart.data.datasets[0].data = newData;
	chart.update();
}

function getTabs(containerSelector) {
	const container = document.querySelector(containerSelector);
	const tabs = container.querySelectorAll('.tab');
	return tabs;
}

function activateTabsOnClick(containerSelector) {
	const tabs = getTabs(containerSelector);

	tabs.forEach(tab => {
		tab.addEventListener('click', e => {
			tabs.forEach(t => t.classList.remove('active'));
			e.currentTarget.classList.add('active');
		});
	});
}

activateTabsOnClick('.tabs__chart-hashrate');
activateTabsOnClick('.tabs-tables__workers-payouts');

const [tabHourChartHashrate, tabDayButtonChartHashrate] = getTabs(
	'.tabs__chart-hashrate'
);

tabHourChartHashrate.addEventListener('click', function (e) {
	updateChartData(hashRateChart, [25, 26, 27, 30, 29, 28, 30, 32, 31]);
});

tabDayButtonChartHashrate.addEventListener('click', function (e) {
	updateChartData(hashRateChart, [22, 23, 24, 26, 25, 25, 27, 28, 26]);
});

OPEN_MODAL_BTN.addEventListener('click', () => {
	MODAL.showModal();
});

MODAL.addEventListener('click', e => {
	const dialogDimensions = MODAL.getBoundingClientRect();
	if (
		e.clientX < dialogDimensions.left ||
		e.clientX > dialogDimensions.right ||
		e.clientY < dialogDimensions.top ||
		e.clientY > dialogDimensions.bottom
	) {
		MODAL.close();
	}
});

ItcCustomSelect.create('#select-payouts', {
	name: 'interval',
	targetValue: 'day',
	options: [
		['day', '24 hours'],
		['week', 'Week'],
	],
	onSelected(select, option) {
		// выбранное значение
		console.log(`Выбранное значение: ${select.value}`);
		// индекс выбранной опции
		console.log(`Индекс выбранной опции: ${select.selectedIndex}`);
		// выбранный текст опции
		const text = option ? option.textContent : '';
		console.log(`Выбранный текст опции: ${text}`);
	},
});

function fetchMyHashrate(wallet) {
	return Promise.all([
		statsApiCall(`/workers?coin=alephium&wallet=${wallet}&period=3600`),
		statsApiCall(`/workers?coin=alephium&wallet=${wallet}&period=86400`),
	]);
}

function fetchMyPayouts(wallet) {
	return Promise.all([
		statsApiCall(`/payouts?coin=alephium&wallet=${wallet}&period=3600`),
		statsApiCall(`/payouts?coin=alephium&wallet=${wallet}&period=86400`),
	]);
}

function fetchMyBalance(wallet) {
	return statsApiCall(`/balance?coin=alephium&wallet=${wallet}`);
}

function fetchMyEvents(wallet) {
	return statsApiCall(`/events?coin=alephium&wallet=${wallet}`);
}

function showMyHashrate({ day, hour }) {
	const shortHourHashRate = shortenHm(hour.hashrate, 2);
	const shortDayHashRate = shortenHm(day.hashrate, 2);

	document.getElementById('my_hashrate_1h').textContent =
		shortHourHashRate.hashrate;
	document.getElementById('my_hashrate_1h_measure').textContent =
		shortHourHashRate.units;

	document.getElementById('my_hashrate_24h').textContent =
		shortDayHashRate.hashrate;
	document.getElementById('my_hashrate_24h_measure').textContent =
		shortDayHashRate.units;
}

function showWorkersTable(workersDay, workersHour) {
	const tableBody = document
		.getElementById('workers-table')
		.getElementsByTagName('tbody')[0];
	tableBody.innerHTML = '';

	workersDay.forEach(workerDay => {
		const workerHour =
			workersHour.find(w => w.worker === workerDay.worker) || {};

		const row = tableBody.insertRow();
		const shortHashRateHour = workerHour.hashrate
			? shortenHm(workerHour.hashrate, 2)
			: { hashrate: 'N/A', units: '' };
		const shortHashRateDay = workerDay.hashrate
			? shortenHm(workerDay.hashrate, 2)
			: { hashrate: 'N/A', units: '' };

		row.insertCell(0).textContent = workerDay.worker || 'N/A';
		row.insertCell(
			1
		).textContent = `${shortHashRateHour.hashrate} ${shortHashRateHour.units} / ${shortHashRateDay.hashrate} ${shortHashRateDay.units}`;
		row.insertCell(
			2
		).textContent = `${workerHour.shares_count} / ${workerDay.shares_count}`;
		row.insertCell(3).textContent = workerDay.last_share_at
			? new Date(workerDay.last_share_at).toLocaleString()
			: 'N/A';
	});
}

function amountUSD(amountInAlph, currencyRate) {
	return (parseFloat(amountInAlph) * currencyRate).toFixed(2);
}

function showMyPayouts({ day, hour }, currencyRate) {
	document.getElementById('my_payouts_1h').textContent = parseFloat(
		hour.amount
	).toFixed(8);
	document.getElementById('my_payouts_1h_usd').textContent = amountUSD(
		hour.amount,
		currencyRate
	);

	document.getElementById('my_payouts_24h').textContent = parseFloat(
		day.amount
	).toFixed(8);
	document.getElementById('my_payouts_24h_usd').textContent = amountUSD(
		day.amount,
		currencyRate
	);
}

function showMyBalance(myBalanceData, currencyRate) {
	document.getElementById('balance').textContent = parseFloat(
		myBalanceData.amount
	).toFixed(8);
	document.getElementById('balance_usd').textContent = amountUSD(
		myBalanceData.amount,
		currencyRate
	);
}

function showPayoutsTable(payouts) {
	const tableBody = document
		.getElementById('payouts-table')
		.getElementsByTagName('tbody')[0];
	tableBody.innerHTML = '';

	payouts.forEach(payout => {
		const row = tableBody.insertRow();
		row.insertCell(0).textContent = parseFloat(payout.amount).toFixed(8);
		row.insertCell(1).textContent = new Date(payout.timestamp).toLocaleString();
	});
}

function showEventsTable(events) {
	const tableBody = document
		.getElementById('events-table')
		.getElementsByTagName('tbody')[0];
	tableBody.innerHTML = '';

	events.forEach(event => {
		const row = tableBody.insertRow();
		row.insertCell(0).textContent = event.worker ?? 'N/A';
		row.insertCell(1).textContent = event.message;
		row.insertCell(2).textContent = event.count;
		row.insertCell(3).textContent = new Date(event.latest).toLocaleString();
	});
}

function drawData(wallet) {
	disableButton();
	Promise.all([
		fetchMyHashrate(wallet),
		fetchMyPayouts(wallet),
		fetchMyBalance(wallet),
		fetchMyEvents(wallet),
		fetchCurrencyInfo(),
	]).then(
		([
			[hashrate1hResponse, hashrate24hResponse],
			[payouts1hResponse, payouts24hResponse],
			myBalanceResponse,
			myEventsResponse,
			currencyRate,
		]) => {
			const hashrate1h = hashrate1hResponse.workers.reduce((accumulator, v) => {
				return accumulator + parseFloat(v.hashrate);
			}, 0);

			const hashrate24h = hashrate24hResponse.workers.reduce(
				(accumulator, v) => {
					return accumulator + parseFloat(v.hashrate);
				},
				0
			);

			const payouts1h = payouts1hResponse.payouts.reduce((accumulator, v) => {
				return accumulator + parseFloat(v.amount);
			}, 0);

			const payouts24h = payouts24hResponse.payouts.reduce((accumulator, v) => {
				return accumulator + parseFloat(v.amount);
			}, 0);

			showMyHashrate({
				hour: { hashrate: hashrate1h, units: hashrate1hResponse.units },
				day: { hashrate: hashrate24h, units: hashrate1hResponse.units },
			});
			showWorkersTable(hashrate1hResponse.workers, hashrate24hResponse.workers);
			showMyPayouts(
				{ hour: { amount: payouts1h }, day: { amount: payouts24h } },
				currencyRate.rate.value
			);
			showPayoutsTable(payouts24hResponse.payouts);
			showMyBalance(myBalanceResponse, currencyRate.rate.value);
			showEventsTable(myEventsResponse.events);
			showStats();
			enableButton();
		}
	);
}

function showStats() {
	var element = document.getElementById('stats');
	element.classList.remove('hidden');
}

function disableButton() {
	const button = document.getElementById('show');
	button.textContent = 'Loading..';
	button.disabled = true;
}

function enableButton() {
	const button = document.getElementById('show');
	button.textContent = 'Update';
	button.disabled = false;
}

function setWalletParam(wallet) {
	const urlParams = new URLSearchParams(window.location.search);

	urlParams.set('wallet', wallet);

	window.location.search = urlParams;
}

function getWalletParam() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get('wallet')?.trim();
}

function setWalletForm(wallet) {
	const walletInput = document.getElementById('wallet-input');
	walletInput.value = wallet;
}

function assignFormListener() {
	function processForm(e) {
		if (e.preventDefault) e.preventDefault();
		const walletInput = document.getElementById('wallet-input');
		if (walletInput.value) setWalletParam(walletInput.value);
		return false;
	}

	const form = document.getElementById('wallet-form');
	if (form.attachEvent) {
		form.attachEvent('submit', processForm);
	} else {
		form.addEventListener('submit', processForm);
	}

	document
		.getElementById('workers-tab')
		.addEventListener('click', e => switchTab(e, 'workers'));
	document
		.getElementById('payouts-tab')
		.addEventListener('click', e => switchTab(e, 'payouts'));
}

function switchTab(event, tabId) {
	document.querySelectorAll('.tab').forEach(tab => {
		tab.classList.remove('active');
	});

	document.querySelectorAll('.tab-links .button').forEach(tab => {
		tab.classList.remove('button-outline');
		tab.classList.add('button-clear');
	});

	document.getElementById(tabId).classList.add('active');
	event.currentTarget.classList.add('button-outline');
	event.currentTarget.classList.remove('button-clear');
}

function init() {
	assignFormListener();

	const walletFromParams = getWalletParam();

	if (walletFromParams) {
		Cookies.set('wallet', walletFromParams, { expires: 365 });
		setWalletForm(walletFromParams);
		drawData(walletFromParams);
	} else {
		// const walletFromCookies = Cookies.get('wallet');
		// if (walletFromCookies) {
		// 	setWalletParam(walletFromCookies);
		// }
	}
}

init();
