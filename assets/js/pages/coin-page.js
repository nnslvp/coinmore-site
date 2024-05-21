const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT = document.querySelector('#profitChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
const WALLET_FORM = document.querySelector('#wallet-form');
const WALLET_INPUT = WALLET_FORM.querySelector('#wallet-input');

const [tabWorkersDay, tabWorkersWeek] = getTabs(
	'.chart-interval__workers-activity'
);
const [tabProfitDay, tabProfitWeek] = getTabs('.chart-interval__profit');
const [tabPoolHashrateDay, tabPoolHashrateWeek] = getTabs(
	'.chart-interval__pool-hashrate'
);


activateTabsOnClick('.chart-interval__workers-activity');
activateTabsOnClick('.chart-interval__profit');
activateTabsOnClick('.chart-interval__pool-hashrate');


showPings();

function showChartPoolHashrate({ labelsWeek, dataWeek, labelsDay, dataDay }) {
	const hashRateChart = initializeChart(
		CHART_POOL_HASH_RATE,
		getChartOptions(),
		dataWeek,
		labelsWeek
	);

	tabPoolHashrateDay.addEventListener('click', e => {
		updateChartData(hashRateChart, dataDay, labelsDay);
	});

	tabPoolHashrateWeek.addEventListener('click', e => {
		updateChartData(hashRateChart, dataWeek, labelsWeek);
	});
}

function showChartProfit({ labelsWeek, dataWeek, labelsDay, dataDay }) {
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
		}),
		dataWeek,
		labelsWeek
	);

	tabProfitDay.addEventListener('click', e => {
		updateChartData(profitChart, dataDay, labelsDay);
	});

	tabProfitWeek.addEventListener('click', e => {
		updateChartData(profitChart, dataWeek, labelsWeek);
	});
}

function showChartWorkersActivity({
	labelsWeek,
	dataWeek,
	labelsDay,
	dataDay,
}) {
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
		}),
		dataWeek,
		labelsWeek
	);


	tabWorkersDay.addEventListener('click', e => {
		updateChartData(workersActivityChart, dataDay, labelsDay);
	});

	tabWorkersWeek.addEventListener('click', e => {
		updateChartData(workersActivityChart, dataWeek, labelsWeek);
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
	const fetchHistoryDay = fetchHistoryPool(coin, PERIOD_DAY, 'hour');

	Promise.allSettled([fetchHistoryWeek, fetchHistoryDay]).then(results => {
		const [poolHistoryWeekResult, poolHistoryDayResult] = results;

		if (
			poolHistoryWeekResult.status === 'fulfilled' &&
			poolHistoryDayResult.status === 'fulfilled'
		) {
			const poolHistoryWeek = poolHistoryWeekResult.value;
			const poolHistoryDay = poolHistoryDayResult.value;

			console.log('day', poolHistoryDay, 'week', poolHistoryWeek);

			const labelsWeek = poolHistoryWeek.pool_history.map(item =>
				formatDate(item.day)
			);

			const labelsDay = poolHistoryDay.pool_history.map(item =>
				formatDate(item.hour)
			);

			const dataPoolHashrateWeek = poolHistoryWeek.pool_history.map(item => {
				return parseFloat(item.sum_difficulty);
			});

			const dataPoolHashrateDay = poolHistoryDay.pool_history.map(item =>
				parseFloat(item.sum_difficulty)
			);

			const dataWorkersActivityDay = poolHistoryDay.pool_history.map(
				item => item.unique_wallet
			);

			const dataWorkersActivityWeek = poolHistoryWeek.pool_history.map(
				item => item.unique_wallet
			);

			showChartPoolHashrate({
				labelsWeek,
				dataWeek: dataPoolHashrateWeek,
				labelsDay,
				dataDay: dataPoolHashrateDay,
			});

			showChartWorkersActivity({
				labelsWeek,
				dataWeek: dataWorkersActivityWeek,
				labelsDay,
				dataDay: dataWorkersActivityDay,
			});
		}
	});

	fetchPoolBlocks(coin, 86400).then(({ count, last_block_at }) => {
		showPool24hBlocks(count);
		showPoolLatestBlockAt(last_block_at);
	});
}

init(COIN);
