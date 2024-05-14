function init(coin) {
	fetchPoolProfit(coin).then(({ profit }) => {
		fetchCurrencyInfo(coin).then(({ rate: { value } }) =>
			showPoolProfitUSD(profit, value, `pool_profit_usd_${coin}`)
		);
	});

	fetchPoolHashRate(coin).then(({ hashrate }) => {
		showPoolHashrate(hashrate.hashrate, `pool_hashrate_${coin}`);
	});

	fetchNetworkHashRate(coin).then(({ network_hashrate }) => {
		showNetworkHashrate(network_hashrate.hashrate, `network_hashrate_${coin}`);
	});

	fetchMinersOnline(coin).then(({ workers_online }) => {
		showMinersOnline(workers_online, `miners_${coin}`);
	});

	fetchRate(coin).then(({ rate }) => {
		showRate(rate, `coin-price_${coin}`);
	});
}

COINS.forEach(coin => {
  init(coin);
});

