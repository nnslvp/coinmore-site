const statsApiUrl = 'https://api.coinmore.io';

function statsApiCall(action) {
	return fetch(`${statsApiUrl}${action}`).then(response => response.json());
}

function fetchCurrencyInfo(coin = 'alephium') {
	return statsApiCall(`/rate?coin=${coin}`);
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
