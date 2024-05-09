const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT = document.querySelector('#profitChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
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
const [tabWorkersHour, tabWorkersDay] = getTabs(
	'.chart-interval__workers-activity'
);
const [tabProfitHour, tabProfitDay] = getTabs('.chart-interval__profit');
const [tabPoolHashrateHour, tabPoolHashrateDay] = getTabs(
	'.chart-interval__pool-hashrate'
);
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

function updateChartData(chart, newData) {
	chart.data.datasets[0].data = newData;
	chart.update();
}

const poolHashRateChart = initializeChart(
	CHART_POOL_HASH_RATE,
	getChartOptions()
);

const profitChart = initializeChart(
	CHART_PROFIT,
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: 'ALPH',
				},
			},
		},
	})
);

const workersActivityChart = initializeChart(
	CHART_WORKERS,
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: 'Workers',
				},
			},
		},
	})
);

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

activateTabsOnClick('.chart-interval__workers-activity');
activateTabsOnClick('.chart-interval__profit');
activateTabsOnClick('.chart-interval__pool-hashrate');

tabWorkersHour.addEventListener('click', function (e) {
	updateChartData(workersActivityChart, [25, 26, 27, 30, 29, 28, 30, 32, 31]);
});

tabWorkersDay.addEventListener('click', function (e) {
	updateChartData(workersActivityChart, [22, 23, 24, 26, 25, 25, 27, 28, 26]);
});

tabProfitHour.addEventListener('click', function (e) {
	updateChartData(profitChart, [25, 26, 27, 30, 29, 28, 30, 32, 31]);
});

tabProfitDay.addEventListener('click', function (e) {
	updateChartData(profitChart, [22, 23, 24, 26, 25, 25, 27, 28, 26]);
});

tabPoolHashrateHour.addEventListener('click', function (e) {
	updateChartData(poolHashRateChart, [25, 26, 27, 30, 29, 28, 30, 32, 31]);
});

tabPoolHashrateDay.addEventListener('click', function (e) {
	updateChartData(poolHashRateChart, [22, 23, 24, 26, 25, 25, 27, 28, 26]);
});

showPings();

const statsApiUrl = 'https://api.coinmore.io';

function statsApiCall(action) {
	return fetch(`${statsApiUrl}${action}`).then(response => response.json());
}

function fetchCurrencyInfo(coin) {
	return statsApiCall(`/rate?coin=alephium`);
}

function fetchPoolProfit(coin) {
	return statsApiCall('/profit?coin=alephium');
}

function fetchPoolHashRate(coin) {
	return statsApiCall('/hashrate?coin=alephium');
}
function fetchNetworkHashRate(coin) {
	return statsApiCall('/network_hashrate?coin=alephium');
}
function fetchMinersOnline(coin) {
	return statsApiCall('/online?coin=alephium');
}

function fetchPoolBlocks(period = 3600) {
	return statsApiCall(`/blocks?coin=alephium&period=${period}`);
}
function fetchRate(coin) {
	return statsApiCall(`/rate?coin=alephium`);
}

function shortenHm(hashRate, roundPlaces) {
	const denominator = [
		{ d: 1000000000000, unit: 'TH' },
		{ d: 1000000000, unit: 'GH' },
		{ d: 1000000, unit: 'MH' },
		{ d: 1, unit: 'H' },
	];

	if (isNaN(hashRate)) {
		return null;
	} else {
		const hashRateFactor = Math.log10(hashRate) > 0 ? Math.log10(hashRate) : 0;

		const factor = denominator.find(
			el => hashRateFactor - Math.log10(el.d) >= 0
		);

		const resultHashRateValue = Number(
			(hashRate / factor.d).toFixed(roundPlaces)
		);
		const resultHashRateMeasure = factor.unit;

		return {
			hashrate: resultHashRateValue,
			units: resultHashRateMeasure,
		};
	}
}

function showPoolHashrate(hashrate) {
	const { hashrate: shortHashrate, units } = shortenHm(hashrate, 2);
	document.getElementById(
		'pool_hashrate'
	).textContent = `${shortHashrate} ${units}/s`;
}
function showNetworkHashrate(hashrate) {
	const { hashrate: shortHashrate, units } = shortenHm(hashrate, 2);
	document.getElementById(
		'network_hashrate'
	).textContent = `${shortHashrate} ${units}/s`;
}
function showMinersOnline(workers_online) {
	document.getElementById('miners').textContent = workers_online;
}
function showRate(rate) {
	document.getElementById('coin-price').textContent = `$${rate.value}`;
}

function showPoolProfitUSD(rate, profit) {
	const floatProfit = parseFloat(profit);
	const floatRate = parseFloat(rate);
	const profitUSD = (floatProfit * floatRate).toFixed(4);

	document.getElementById('pool_profit_usd').textContent = `$${profitUSD}`;
}

function init() {
	fetchPoolProfit().then(({ profit }) => {
		fetchCurrencyInfo().then(({ rate: { value } }) =>
			showPoolProfitUSD(profit, value)
		);
	});

	fetchPoolHashRate().then(({ hashrate }) => {
		showPoolHashrate(hashrate.hashrate);
	});

	fetchNetworkHashRate().then(({ network_hashrate }) => {
		showNetworkHashrate(network_hashrate.hashrate);
	});

	fetchMinersOnline().then(({ workers_online }) => {
		showMinersOnline(workers_online);
	});

	fetchRate().then(({ rate }) => {
		showRate(rate);
	});
}

init();
