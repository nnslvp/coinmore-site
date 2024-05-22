const statsApiUrl = 'https://api.coinmore.io';
const PERIOD_HOUR = 3600;
const PERIOD_DAY = 86400;
const PERIOD_WEEK = 604800;
const DEFAULT_COIN = 'alephium';
const GROUP_BY = {
  hour:'hour',
  day:'day',
}

function statsApiCall(action) {
	return fetch(`${statsApiUrl}${action}`).then(response => response.json());
}

function statsApiPost(action) {
	return fetch(`${statsApiUrl}${action}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json', 
		},
	})
}

function fetchCurrencyInfo(coin = DEFAULT_COIN) {
	return statsApiCall(`/rate?coin=${coin}`);
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

function fetchHistoryProfit(coin = DEFAULT_COIN, period = PERIOD_DAY, groupBy = GROUP_BY.hour) {
	return statsApiCall(
		`/profit_history?coin=${coin}&period=${period}&group_by=${groupBy}`
	);
}

function fetchHistoryWallet(coin = DEFAULT_COIN, wallet, period = PERIOD_WEEK) {
	return statsApiCall(
		`/wallet_history?coin=${coin}&wallet=${wallet}&period=${period}`
	);
}

function fetchUserValue(coin = DEFAULT_COIN, wallet, kind = 'min_payout') {
	return statsApiCall(
		`/user_value?coin=${coin}&wallet=${wallet}&kind=${kind}`
	);
}

function createUserValue(coin = DEFAULT_COIN, wallet, kind = 'min_payout', value = 1 ) {
	return statsApiPost(`/user_value?coin=${coin}&wallet=${wallet}&kind=${kind}&value=${value}`);
}

function fetchPoolProfit(coin = DEFAULT_COIN) {
	return statsApiCall(`/profit?coin=${coin}`);
}

function fetchPoolHashRate(coin = DEFAULT_COIN) {
	return statsApiCall(`/hashrate?coin=${coin}`);
}
function fetchNetworkHashRate(coin = DEFAULT_COIN) {
	return statsApiCall(`/network_hashrate?coin=${coin}`);
}
function fetchMinersOnline(coin = DEFAULT_COIN) {
	return statsApiCall(`/online?coin=${coin}`);
}

function fetchPoolBlocks(coin = DEFAULT_COIN, period = PERIOD_HOUR) {
	return statsApiCall(`/blocks?coin=${coin}&period=${period}`);
}

function fetchRate(coin = DEFAULT_COIN) {
	return statsApiCall(`/rate?coin=${coin}`);
}

function fetchMyHashrate(coin = DEFAULT_COIN, wallet, period = PERIOD_HOUR) {
	return statsApiCall(`/workers?coin=${coin}&wallet=${wallet}&period=${period}`);
}

function fetchMyPayouts(coin = DEFAULT_COIN, wallet, period = PERIOD_HOUR) {
	return statsApiCall(
		`/payouts?coin=${coin}&wallet=${wallet}&period=${period}`
	);
}

function fetchMyBalance(coin = DEFAULT_COIN, wallet) {
	return statsApiCall(`/balance?coin=${coin}&wallet=${wallet}`);
}

function fetchMyEvents(coin = DEFAULT_COIN, wallet) {
	return statsApiCall(`/events?coin=${coin}&wallet=${wallet}`);
}
