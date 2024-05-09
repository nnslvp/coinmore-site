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
