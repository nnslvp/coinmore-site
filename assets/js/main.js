const LANGUAGE_SWITCHER_ELEMENTS = document.querySelectorAll(
	'.language-switcher'
);
const HAMBURGER_MENU_BTN = document.querySelector('.hamburger-menu-btn');
const statsApiUrl = 'https://api.coinmore.io';

LANGUAGE_SWITCHER_ELEMENTS.forEach(el =>
	el.addEventListener('click', e => {
		e.stopPropagation();
		e.currentTarget.classList.toggle('open');
	})
);

HAMBURGER_MENU_BTN.addEventListener('click', function (e) {
	e.currentTarget.classList.toggle('active');
});

document.body.addEventListener('click', () => {
	LANGUAGE_SWITCHER_ELEMENTS.forEach(e => {
		e.classList.remove('open');
	});
});

function statsApiCall(action) {
	return fetch(`${statsApiUrl}${action}`).then(response => response.json());
}

// function fetchCurrencyInfo(coin) {
// 	return statsApiCall(`/rate?coin=alephium`);
// }

// function fetchPoolProfit(coin) {
// 	return statsApiCall('/profit?coin=alephium');
// }

function fetchPoolHashRate(coin) {
	return statsApiCall('/hashrate?coin=alephium');
}
function fetchNetworkHashRate(coin) {
	return statsApiCall('/network_hashrate?coin=alephium');
}

// function fetchPoolBlocks(period = 3600) {
// 	return statsApiCall(`/blocks?coin=alephium&period=${period}`);
// }

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

function init() {
	// fetchPoolProfit().then(({ profit }) => {
	// 	// showPoolProfit(profit);
	// 	// fetchCurrencyInfo().then(({ rate: { value } }) =>
	// 	// 	showPoolProfitUSD(profit, value)
	// 	// );
	// });

	fetchPoolHashRate().then(({ hashrate }) => {
		showPoolHashrate(hashrate.hashrate);
	});

	fetchNetworkHashRate().then(({ network_hashrate }) => {
		showNetworkHashrate(network_hashrate.hashrate);
	});

	// fetchPoolBlocks(86400).then(({ last_block_at, count }) => {
	// 	// showPoolLatestBlockAt(last_block_at);
	// 	// showPool24hBlocks(count);
	// });
}

init();

// function showPoolProfit(profit) {
// 	const roundProfit = parseFloat(profit).toFixed(4);
// 	document.getElementById('pool_profit').textContent = `${roundProfit}`;
// }

// function showPoolProfitUSD(rate, profit) {
// 	const floatProfit = parseFloat(profit);
// 	const floatRate = parseFloat(rate);
// 	const profitUSD = (floatProfit * floatRate).toFixed(4);

// 	document.getElementById('pool_profit_usd').textContent = `${profitUSD}`;
// }

// function showPool24hBlocks(blocksCount) {
// 	document.getElementById('24h_blocks').textContent = blocksCount;
// }

// function showPoolLatestBlockAt(date) {
// 	const current = new Date();
// 	const at = new Date(date);
// 	const hours = (Math.abs(current - at) / 36e5).toFixed(2);

// 	document.getElementById('latest_block_at').textContent = `${hours} hour(s)`;
// }
