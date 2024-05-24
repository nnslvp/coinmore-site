function init(coin, symbol) {
	const poolProfitPromise = fetchPoolProfit(coin);
	const currencyInfoPromise = fetchCurrencyInfo(coin);
	const poolHashRatePromise = fetchPoolHashRate(coin);
	const networkHashRatePromise = fetchNetworkHashRate(coin);
	const minersOnlinePromise = fetchMinersOnline(coin);
	const poolValueMinPayoutsPromise = fetchPoolValue(coin, KIND.minPayout);
	const poolValueFeePromise = fetchPoolValue(coin, KIND.fee);
	const COIN_SYMBOL = symbol;

	currencyInfoPromise
		.then(({ rate: { value } }) => {
			showRate(value, `coin-price_${coin}`);
			return value;
		})
		.then(rate => {
			poolProfitPromise.then(({ profit }) => {
				showPoolProfit(profit, `pool_profit_${coin}`, COIN_SYMBOL);
				showPoolProfitUSD(profit, rate, `pool_profit_usd_${coin}`);
			});
			return rate;
		})
		.then(rate => {
			poolValueMinPayoutsPromise.then(({ value }) => {
				showPoolMinPayout(value, `pool_min_payout_${coin}`, COIN_SYMBOL);
				showPoolMinPayoutUSD(rate, value, `pool_min_payout_usd_${coin}`);
			});
		});

	poolHashRatePromise.then(({ hashrate }) => {
		showPoolHashrate(hashrate.hashrate, `pool_hashrate_${coin}`);
	});

	networkHashRatePromise.then(({ network_hashrate }) => {
		showNetworkHashrate(network_hashrate.hashrate, `network_hashrate_${coin}`);
	});

	minersOnlinePromise.then(({ workers_online }) => {
		showMinersOnline(workers_online, `miners_${coin}`);
	});

  poolValueFeePromise.then(({ value }) => {
		showPoolFee(value, `pool_fee_${coin}`);
	});
}

COINS.forEach(({ name, symbol }) => {
	init(name, symbol);
});
