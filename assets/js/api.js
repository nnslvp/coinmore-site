const statsApiUrl = 'https://api.coinmore.io';
const PERIOD_HOUR = 3600;
const PERIOD_DAY = 86400;
const PERIOD_WEEK = 604800;
const GROUP_BY = {
	hour: 'hour',
	day: 'day',
};
const KIND = {
	minPayout: 'min_payout',
	fee: 'fee',
};

function statsApiCall(action) {
	return fetch(`${statsApiUrl}${action}`).then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok ' + response.statusText);
		}
		return response.json();
	});
}

function statsApiPost(action) {
	return fetch(`${statsApiUrl}${action}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

function fetchCurrencyInfo(coin) {
	return statsApiCall(`/rate?coin=${coin}`);
}

function fetchPoolValue(coin, kind) {
	return statsApiCall(`/pool_value?coin=${coin}&kind=${kind}`);
}

function fetchHistoryPool(
	coin = '',
	period = PERIOD_WEEK,
	groupBy = GROUP_BY.day
) {
	return statsApiCall(
		`/pool_history?coin=${coin}&period=${period}&group_by=${groupBy}`
	);
}

function fetchHistoryProfit(
	coin,
	period = PERIOD_DAY,
	groupBy = GROUP_BY.hour
) {
	return statsApiCall(
		`/profit_history?coin=${coin}&period=${period}&group_by=${groupBy}`
	);
}

function fetchHistoryWallet(coin, wallet, period = PERIOD_WEEK) {
	return statsApiCall(
		`/wallet_history?coin=${coin}&wallet=${wallet}&period=${period}`
	);
}

function fetchHistoryWorkers(
	coin,
	wallet,
	period = PERIOD_WEEK,
	groupeBy = GROUP_BY.hour
) {
	return statsApiCall(
		`/workers_history?coin=${coin}&wallet=${wallet}&period=${period}&group_by=${groupeBy}`
	);
}

function fetchUserValue(coin, wallet, kind = 'min_payout') {
	return statsApiCall(`/user_value?coin=${coin}&wallet=${wallet}&kind=${kind}`);
}

function createUserValue(coin, wallet, kind = 'min_payout', value = 1) {
	return statsApiPost(
		`/user_value?coin=${coin}&wallet=${wallet}&kind=${kind}&value=${value}`
	);
}

function fetchPoolProfit(coin) {
	return statsApiCall(`/profit?coin=${coin}`);
}

function fetchPoolHashRate(coin) {
	return statsApiCall(`/hashrate?coin=${coin}`);
}

function fetchNetworkHashRate(coin) {
	return statsApiCall(`/network_hashrate?coin=${coin}`);
}

function fetchMinersOnline(coin) {
	return statsApiCall(`/online?coin=${coin}`);
}

function fetchPoolBlocks(coin, period = PERIOD_HOUR) {
	return statsApiCall(`/blocks?coin=${coin}&period=${period}`);
}

function fetchRate(coin) {
	return statsApiCall(`/rate?coin=${coin}`);
}

function fetchMyHashrate(coin, wallet, period = PERIOD_HOUR) {
	return statsApiCall(
		`/workers?coin=${coin}&wallet=${wallet}&period=${period}`
	);
}

function fetchMyPayouts(coin, wallet, period = PERIOD_HOUR) {
	return statsApiCall(
		`/payouts?coin=${coin}&wallet=${wallet}&period=${period}`
	);
}

function fetchMyBalance(coin, wallet) {
	return statsApiCall(`/balance?coin=${coin}&wallet=${wallet}`);
}

function fetchMyEvents(coin, wallet) {
	return statsApiCall(`/events?coin=${coin}&wallet=${wallet}`);
}
