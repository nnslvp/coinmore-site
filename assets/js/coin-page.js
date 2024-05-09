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

function showPoolHashrate(hashrate) {
	const { hashrate: shortHashrate, units } = shortenHm(hashrate, 2);
	document.getElementById(
		'pool_hashrate'
	).textContent = `${shortHashrate} ${units}/s`;
}

function showPoolProfit(profit) {
	const roundProfit = parseFloat(profit).toFixed(4);
	document.getElementById(
		'pool_profit'
	).textContent = `${roundProfit} ${COIN_SYMBOL}`;
}

function showMinersOnline(workers_online) {
	document.getElementById('miners').textContent = workers_online;
}

function showPool24hBlocks(blocksCount) {
	document.getElementById('24h_blocks').textContent = blocksCount;
}

function showPoolLatestBlockAt(date) {
	const current = new Date();
	const at = new Date(date);
	const hours = (Math.abs(current - at) / 36e5).toFixed(2);

	document.getElementById('latest_block_at').textContent = `${hours} hour(s)`;
}

function showPoolProfitUSD(rate, profit) {
	const floatProfit = parseFloat(profit);
	const floatRate = parseFloat(rate);
	const profitUSD = (floatProfit * floatRate).toFixed(4);

	document.getElementById('pool_profit_usd').textContent = `${profitUSD} USD`;
}

function init(coin) {
	fetchPoolProfit(coin).then(({ profit, coin }) => {
		showPoolProfit(profit);
		fetchCurrencyInfo(coin).then(({ rate: { value } }) =>
			showPoolProfitUSD(profit, value)
		);
	});

	fetchPoolHashRate(coin).then(({ hashrate }) => {
		showPoolHashrate(hashrate.hashrate);
	});

	fetchMinersOnline(coin).then(({ workers_online }) => {
		showMinersOnline(workers_online);
	});

	fetchPoolBlocks(coin, 86400).then(({ count, last_block_at }) => {
		showPool24hBlocks(count);
		showPoolLatestBlockAt(last_block_at);
	});
}

init(COIN);
