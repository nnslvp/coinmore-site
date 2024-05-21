const statsApiUrl = 'https://api.coinmore.io';
const PERIOD_HOUR = 3600;
const PERIOD_DAY = 86400;
const PERIOD_WEEK = 604800;

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

function fetchCurrencyInfo(coin = 'alephium') {
	return statsApiCall(`/rate?coin=${coin}`);
}

function fetchHistoryPool(
	coin = 'alephium',
	period = PERIOD_WEEK,
	groupBy = 'day'
) {
	return statsApiCall(
		`/pool_history?coin=${coin}&period=${period}&group_by=${groupBy}`
	);
}

function fetchHistoryWallet(coin = 'alephium', wallet, period = PERIOD_WEEK) {
	return statsApiCall(
		`/wallet_history?coin=${coin}&wallet=${wallet}&period=${period}`
	);
}

function fetchUserValue(coin = 'alephium', wallet, kind = 'min_payout') {
	return statsApiCall(
		`/user_value?coin=${coin}&wallet=${wallet}&kind=${kind}`
	);
}

function createUserValue(coin = 'alephium', wallet, kind = 'min_payout', value = 1 ) {
	return statsApiPost(`/user_value?coin=${coin}&wallet=${wallet}&kind=${kind}&value=${value}`);
}

function fetchPoolProfit(coin = 'alephium') {
	return statsApiCall(`/profit?coin=${coin}`);
}

function fetchPoolHashRate(coin = 'alephium') {
	return statsApiCall(`/hashrate?coin=${coin}`);
}
function fetchNetworkHashRate(coin = 'alephium') {
	return statsApiCall(`/network_hashrate?coin=${coin}`);
}
function fetchMinersOnline(coin = 'alephium') {
	return statsApiCall(`/online?coin=${coin}`);
}

function fetchPoolBlocks(coin = 'alephium', period = PERIOD_HOUR) {
	return statsApiCall(`/blocks?coin=${coin}&period=${period}`);
}

function fetchRate(coin = 'alephium') {
	return statsApiCall(`/rate?coin=${coin}`);
}

function fetchMyHashrate(coin = 'alephium', wallet, period = PERIOD_HOUR) {
	return statsApiCall(`/workers?coin=${coin}&wallet=${wallet}&period=${period}`);
}

function fetchMyPayouts(coin = 'alephium', wallet, period = PERIOD_HOUR) {
	return statsApiCall(
		`/payouts?coin=${coin}&wallet=${wallet}&period=${period}`
	);
}

function fetchMyBalance(coin = 'alephium', wallet) {
	return statsApiCall(`/balance?coin=${coin}&wallet=${wallet}`);
}

function fetchMyEvents(coin = 'alephium', wallet) {
	return statsApiCall(`/events?coin=${coin}&wallet=${wallet}`);
}
