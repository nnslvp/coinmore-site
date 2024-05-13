const statsApiUrl = 'https://api.coinmore.io';

function statsApiCall(action) {
	return fetch(`${statsApiUrl}${action}`).then(response => response.json());
}

function fetchCurrencyInfo(coin = 'alephium') {
	return statsApiCall(`/rate?coin=${coin}`);
}
function fetchHistoryPool(coin = 'alephium', period = 604800) {
	return statsApiCall(`/pool_history?coin=${coin}&period=${period}`);
}
function fetchHistoryWallet(coin = 'alephium', wallet, period = 604800) {
	return statsApiCall(
		`/wallet_history?coin=${coin}&wallet=${wallet}&period=${period}`
	);
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

function fetchPoolBlocks(coin = 'alephium', period = 3600) {
	return statsApiCall(`/blocks?coin=${coin}&period=${period}`);
}

function fetchRate(coin = 'alephium') {
	return statsApiCall(`/rate?coin=${coin}`);
}

function fetchMyHashrate(coin = 'alephium', wallet) {
	return Promise.all([
		statsApiCall(`/workers?coin=${coin}&wallet=${wallet}&period=3600`),
		statsApiCall(`/workers?coin=${coin}&wallet=${wallet}&period=86400`),
	]);
}

function fetchMyPayouts(coin = 'alephium', wallet) {
	return Promise.all([
		statsApiCall(`/payouts?coin=${coin}&wallet=${wallet}&period=3600`),
		statsApiCall(`/payouts?coin=${coin}&wallet=${wallet}&period=86400`),
		statsApiCall(`/payouts?coin=${coin}&wallet=${wallet}&period=604800`),
	]);
}

function fetchMyBalance(coin = 'alephium', wallet) {
	return statsApiCall(`/balance?coin=${coin}&wallet=${wallet}`);
}

function fetchMyEvents(coin = 'alephium', wallet) {
	return statsApiCall(`/events?coin=${coin}&wallet=${wallet}`);
}
