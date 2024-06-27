const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT = document.querySelector('#profitChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
const [TAB_WORKERS_DAY, TAB_WORKERS_WEEK] = getTabs(
	'.chart-interval__workers-activity'
);
const [TAB_PROFIT_DAY, TAB_PROFIT_WEEK] = getTabs('.chart-interval__profit');
const [TAB_POOL_HASHRATE_DAY, TAB_POOL_HASHRATE_WEEK] = getTabs(
	'.chart-interval__pool-hashrate'
);

activateTabsOnClick('.chart-interval__workers-activity');
activateTabsOnClick('.chart-interval__profit');
activateTabsOnClick('.chart-interval__pool-hashrate');

function showChartPoolHashrate({ labelsWeek, dataWeek, labelsDay, dataDay }) {
	const hashRateChart = initializeChart(
		CHART_POOL_HASH_RATE,
		getChartOptions({
			options: {
				plugins: {
					title: {
						text: 'HASHRATE',
					},
					tooltip: {
						callbacks: {
							label:function (tooltipItem)  {
								const label = tooltipItem.dataset.label || '';
								const { hashrate, units } = shortenHm(tooltipItem.raw, 2);
								return `${label}: ${hashrate} ${units}`;
							},
						},
					},
				},
			},
		}),
		dataWeek,
		labelsWeek
	);

	TAB_POOL_HASHRATE_DAY.addEventListener('click', e => {
		updateChartData(hashRateChart, dataDay, labelsDay, CHART_PERIOD.day);
	});

	TAB_POOL_HASHRATE_WEEK.addEventListener('click', e => {
		updateChartData(hashRateChart, dataWeek, labelsWeek, CHART_PERIOD.week);
	});
}

function showChartProfit({ labelsWeek, dataWeek, labelsDay, dataDay, units }) {
	const profitChart = initializeChart(
		CHART_PROFIT,
		getChartOptions({
			data: {
				datasets: [
					{
						label: CHART_TITLE.profit,
					},
				],
			},
			options: {
				plugins: {
					title: {
						text: units,
					},
				},
			},
		}),
		dataWeek,
		labelsWeek
	);

	TAB_PROFIT_DAY.addEventListener('click', e => {
		updateChartData(profitChart, dataDay, labelsDay, CHART_PERIOD.day);
	});

	TAB_PROFIT_WEEK.addEventListener('click', e => {
		updateChartData(profitChart, dataWeek, labelsWeek, CHART_PERIOD.week);
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
			data: {
				datasets: [
					{
						label: CHART_TITLE.wallet,
					},
				],
			},
		}),
		dataWeek,
		labelsWeek
	);

	TAB_WORKERS_DAY.addEventListener('click', e => {
		updateChartData(workersActivityChart, dataDay, labelsDay, CHART_PERIOD.day);
	});

	TAB_WORKERS_WEEK.addEventListener('click', e => {
		updateChartData(workersActivityChart, dataWeek, labelsWeek, CHART_PERIOD.week);
	});
}

function drawPoolHistoryData(profitHistoryWeek, profitHistoryDay) {
	const labelsWeek = profitHistoryWeek.map(item => item.bucket);
	const labelsDay = profitHistoryDay.map(item => item.bucket);
	const dataPoolHashrateWeek = profitHistoryWeek.map(
		item => item.hashrate
	);
	const dataPoolHashrateDay = profitHistoryDay.map(
		item => item.hashrate
	);

	const dataWorkersActivityDay = profitHistoryDay.map(
		item => item.unique_wallets
	);

	const dataWorkersActivityWeek = profitHistoryWeek.map(
		item => item.unique_wallets
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

function drawProfitHistoryData(profitHistoryWeek, profitHistoryDay) {
	const labelsWeek = profitHistoryWeek.map(item => item.bucket);
	const labelsDay = profitHistoryDay.map(item => item.bucket);
	const dataDay = profitHistoryDay.map(item =>
		parseFloat(item.profit).toFixed(4)
	);
	const dataWeek = profitHistoryWeek.map(item =>
		parseFloat(item.profit).toFixed(4)
	);

	showChartProfit({
		labelsWeek,
		dataWeek,
		labelsDay,
		dataDay,
		units: COIN_SYMBOL,
	});
}

let poolHistoryWeek = [];
let poolHistoryDay = [];
let profitHistoryWeek = [];
let profitHistoryDay = [];

function init(coin) {
	const fetchHistoryPoolWeekPromise = fetchHistoryPool(coin);
	const fetchHistoryPoolDayPromise = fetchHistoryPool(
		coin,
		PERIOD_DAY,
		GROUP_BY.hour
	);
	const fetchHistoryProfitDayPromise = fetchHistoryProfit(coin);
	const fetchHistoryProfitWeekPromise = fetchHistoryProfit(
		coin,
		PERIOD_WEEK,
		GROUP_BY.day
	);
	const fetchPoolProfitPromise = fetchPoolProfit(coin);
	const fetchPoolHashRatePromise = fetchPoolHashRate(coin);
	const fetchMinersOnlinePromise = fetchMinersOnline(coin);
	const fetchPoolBlocksPromise = fetchPoolBlocks(coin, PERIOD_DAY);
	const fetchCurrencyInfoPromise = fetchCurrencyInfo(coin);
	const poolValueMinPayoutsPromise = fetchPoolValue(coin, KIND.minPayout);

	poolValueMinPayoutsPromise.then(minPayouts => {
		showPoolMinPayout(minPayouts.value, 'pool_min_payout', COIN_SYMBOL);
	});

	fetchPoolProfitPromise.then(({ profit }) => {
		showPoolProfit(profit, 'pool_profit', COIN_SYMBOL);
		fetchCurrencyInfoPromise.then(({ rate: { value } }) =>
			showPoolProfitUSD(profit, value)
		);
	});

	fetchPoolHashRatePromise.then(({ hashrate }) => {
		showPoolHashrate(hashrate.hashrate);
	});

	fetchMinersOnlinePromise.then(({ wallets_online }) => {
		showMinersOnline(wallets_online);
	});

	fetchPoolBlocksPromise.then(({ count, last_block_at }) => {
		showPool24hBlocks(count);
		if (last_block_at) {
			showPoolLatestBlockAt(last_block_at);
		}
	});

	fetchHistoryPoolWeekPromise
		.then(historyWeek => {
			poolHistoryWeek = historyWeek.pool_history;
			return fetchHistoryPoolDayPromise;
		})
		.then(historyDay => (poolHistoryDay = historyDay.pool_history))
		.then(() => drawPoolHistoryData(poolHistoryWeek, poolHistoryDay))
		.catch(err => {
			console.info('Error fetching poolHistory:', err);
		});

	fetchHistoryProfitWeekPromise
		.then(historyWeek => {
			profitHistoryWeek = historyWeek.profit_history;
			return fetchHistoryProfitDayPromise;
		})
		.then(historyDay => {
			profitHistoryDay = historyDay.profit_history;
		})
		.then(() => drawProfitHistoryData(profitHistoryWeek, profitHistoryDay))
		.catch(err => {
			console.info('Error fetching profitHistory:', err);
		});
}

init(COIN);
