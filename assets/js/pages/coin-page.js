const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT = document.querySelector('#profitChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
const WALLET_FORM = document.querySelector('#wallet-form');
const WALLET_INPUT = WALLET_FORM.querySelector('#wallet-input');

const [tabWorkersHour, tabWorkersDay] = getTabs(
	'.chart-interval__workers-activity'
);
const [tabProfitHour, tabProfitDay] = getTabs('.chart-interval__profit');
const [tabPoolHashrateDay, tabPoolHashrateWeek] = getTabs(
	'.chart-interval__pool-hashrate'
);

// const poolHashRateChart = initializeChart(
// 	CHART_POOL_HASH_RATE,
// 	getChartOptions()
// );

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

showPings();

function showChartPoolHashrate({ labelsWeek, dataWeek, labelsDay, dataDay }) {
  console.log('====================================');
  console.log(CHART_POOL_HASH_RATE);
  console.log('====================================');

	const hashRateChart = initializeChart(
		CHART_POOL_HASH_RATE,
		getChartOptions(),
		dataWeek,
		labelsWeek
	);

	tabPoolHashrateDay.addEventListener('click', function (e) {
		updateChartData(hashRateChart, dataDay, labelsDay);
	});

	tabPoolHashrateWeek.addEventListener('click', function (e) {
		updateChartData(hashRateChart, dataWeek, labelsWeek);
	});
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


const fetchHistoryWeek = fetchHistoryPool(coin);
const fetchHistoryDay = fetchHistoryPool(coin, 86400);

Promise.allSettled([fetchHistoryWeek, fetchHistoryDay])
	.then(results => {
		const [poolHistoryWeekResult, poolHistoryDayResult] = results;

		if (
			poolHistoryWeekResult.status === 'fulfilled' &&
			poolHistoryDayResult.status === 'fulfilled'
		) {
			const poolHistoryWeek = poolHistoryWeekResult.value;
			const poolHistoryDay = poolHistoryDayResult.value;

			console.log('day',poolHistoryDay,'week', poolHistoryWeek);

			const labelsWeek = poolHistoryWeek.pool_history.map(item =>
				item.day.slice(0, 10)
			);

			const dataWeek = poolHistoryWeek.pool_history.map(item =>
				parseFloat(item.sum_difficulty)
			);

			const labelsDay = poolHistoryDay.pool_history.map(item =>
				item.day.slice(0, 10)
			);

			const dataDay = poolHistoryDay.pool_history.map(item =>
				parseFloat(item.sum_difficulty)
			);

			showChartPoolHashrate({ labelsWeek, dataWeek, labelsDay, dataDay });
		} 
	})


	fetchPoolBlocks(coin, 86400).then(({ count, last_block_at }) => {
		showPool24hBlocks(count);
		showPoolLatestBlockAt(last_block_at);
	});
}

init(COIN);
