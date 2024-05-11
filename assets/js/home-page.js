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
