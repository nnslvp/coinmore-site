const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT = document.querySelector('#profitChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
const WALLET_FORM = document.querySelector('#wallet-form');
const WALLET_INPUT = WALLET_FORM.querySelector('#wallet-input');

const [tabWorkersHour, tabWorkersDay] = getTabs(
	'.chart-interval__workers-activity'
);
const [tabProfitHour, tabProfitDay] = getTabs('.chart-interval__profit');
const [tabPoolHashrateHour, tabPoolHashrateDay] = getTabs(
	'.chart-interval__pool-hashrate'
);

WALLET_FORM.addEventListener('submit', event => {
	event.preventDefault();
  const wallet = WALLET_INPUT.value
	const url = `/coin/${COIN}/statistics/?wallet=${wallet}`;
	window.location.href = url;
});

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

console.log(
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
