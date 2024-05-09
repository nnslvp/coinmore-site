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
