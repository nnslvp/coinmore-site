const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT = document.querySelector('#profitChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
const WALLET_FORM = document.querySelector('#wallet-form');
const WALLET_INPUT = WALLET_FORM.querySelector('#wallet-input');
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

showPings();

function showChartPoolHashrate({ labelsWeek, dataWeek, labelsDay, dataDay }) {
	const hashRateChart = initializeChart(
		CHART_POOL_HASH_RATE,
		getChartOptions(),
		dataWeek,
		labelsWeek
	);

	TAB_POOL_HASHRATE_DAY.addEventListener('click', e => {
		updateChartData(hashRateChart, dataDay, labelsDay);
	});

	TAB_POOL_HASHRATE_WEEK.addEventListener('click', e => {
		updateChartData(hashRateChart, dataWeek, labelsWeek);
	});
}

function showChartProfit({ labelsWeek, dataWeek, labelsDay, dataDay }) {
	const profitChart = initializeChart(
		CHART_PROFIT,
		getChartOptions({
			data: {
				datasets: [
					{
						label: 'Profit',
					},
				],
			},
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

	TAB_PROFIT_DAY.addEventListener('click', e => {
		updateChartData(profitChart, dataDay, labelsDay);
	});

	TAB_PROFIT_WEEK.addEventListener('click', e => {
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
			data: {
				datasets: [
					{
						label: 'Wallets',
					},
				],
			},
			options: {
				plugins: {
					title: {
						text: 'Wallets',
					},
				},
			},
		}),
		dataWeek,
		labelsWeek
	);

	TAB_WORKERS_DAY.addEventListener('click', e => {
		updateChartData(workersActivityChart, dataDay, labelsDay);
	});

	TAB_WORKERS_WEEK.addEventListener('click', e => {
		updateChartData(workersActivityChart, dataWeek, labelsWeek);
	});
}

function drawPoolHistoryData(profitHistoryWeek, profitHistoryDay) {
	const labelsWeek = poolHistoryWeek.map(item => formatDate(item.day));
	const labelsDay = poolHistoryDay.map(item => formatDate(item.hour));
	const dataPoolHashrateWeek = poolHistoryWeek.map(item =>
		parseFloat(item.sum_difficulty)
	);
	const dataPoolHashrateDay = poolHistoryDay.map(item =>
		parseFloat(item.sum_difficulty)
	);
	const dataWorkersActivityDay = poolHistoryDay.map(
		item => item.unique_wallets
	);
	const dataWorkersActivityWeek = poolHistoryWeek.map(
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
	console.log(profitHistoryWeek);
	const labelsWeek = profitHistoryWeek.map(item => formatDate(item.bucket));
	const labelsDay = profitHistoryDay.map(item => formatDate(item.bucket));
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
	});
}

let poolHistoryWeek = [];
let poolHistoryDay = [];
let profitHistoryWeek = [];
let profitHistoryDay = [];

function init(coin) {
	const fetchHistoryWeekPromise = fetchHistoryPool(coin);
	const fetchHistoryDayPromise = fetchHistoryPool(
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

	fetchPoolProfitPromise.then(({ profit }) => {
		showPoolProfit(profit);
		fetchCurrencyInfoPromise.then(({ rate: { value } }) =>
			showPoolProfitUSD(profit, value)
		);
	});

	fetchPoolHashRatePromise.then(({ hashrate }) => {
		showPoolHashrate(hashrate.hashrate);
	});

	fetchMinersOnlinePromise.then(({ workers_online }) => {
		showMinersOnline(workers_online);
	});

	fetchPoolBlocksPromise.then(({ count, last_block_at }) => {
		showPool24hBlocks(count);
		showPoolLatestBlockAt(last_block_at);
	});

	fetchHistoryWeekPromise
		.then(historyWeek => {
			poolHistoryWeek = historyWeek.pool_history;
			return fetchHistoryDayPromise;
		})
		.then(historyDay => (poolHistoryDay = historyDay.pool_history))
		.then(() => drawPoolHistoryData(poolHistoryDay, poolHistoryWeek))
		.catch(err => {
			console.error('Error fetching poolHistory:', err);
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
			console.error('Error fetching profitHistory:', err);
		});
}

init(COIN);
