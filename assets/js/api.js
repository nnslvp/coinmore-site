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
	return fetch(`${statsApiUrl}${action}`).then(response => response.json());
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
// 	userValueMinPayoutsPromise
// 		.then(({ value }) => showMinPayouts(value))
// 		.catch(_ => {
// 			showMinPayouts(0.1);
// 		});

// 	Promise.allSettled([currencyInfoPromise])
// 		.then(([currencyInfoResult]) => {
// 			if (currencyInfoResult.status === 'fulfilled') {
// 				currencyInfo = currencyInfoResult.value;
// 			}
// 			return Promise.allSettled([hashrate1hPromise, hashrate24hPromise]);
// 		})
// 		.then(hashrateResults => {
// 			const [
// 				{ status: statusHashrate1hPromise, value: valueHashrate1hPromise },
// 				{ status: statusHashrate24hPromise, value: valueHashrate24hPromise },
// 			] = hashrateResults;

// 			if (
// 				statusHashrate1hPromise === 'fulfilled' &&
// 				statusHashrate24hPromise === 'fulfilled'
// 			) {
// 				const hashrate24h = calculateTotalByKey(
// 					valueHashrate24hPromise.workers,
// 					'hashrate'
// 				);
// 				const hashrate1h = calculateTotalByKey(
// 					valueHashrate1hPromise.workers,
// 					'hashrate'
// 				);

// 				showMyHashrate(hashrate1h, 'my_hashrate_1h');
// 				showMyHashrate(hashrate24h, 'my_hashrate_24h');
// 				// showWorkersTable(
// 				// 	valueHashrate24hPromise.workers,
// 				// 	valueHashrate1hPromise.workers
// 				// );
// 			}

// 			return Promise.allSettled([
// 				payouts1hPromise,
// 				payouts24hPromise,
// 				payoutsWeekPromise,
// 			]);
// 		})
// 		.then(payoutsResults => {
// 			const [
// 				{ status: statusPayouts1hPromise, value: valuePayouts1hPromise },
// 				{ status: statusPayouts24hPromise, value: valuePayouts24hPromise },
// 				{ status: statusPayoutsWeekPromise, value: valuePayoutsWeekPromise },
// 			] = payoutsResults;

// 			if (
// 				statusPayouts1hPromise === 'fulfilled' &&
// 				statusPayouts24hPromise === 'fulfilled' &&
// 				currencyInfo
// 			) {
// 				const payoutsAmount1h = calculateTotalByKey(
// 					valuePayouts1hPromise.payouts,
// 					'amount'
// 				);
// 				const payoutsAmount24h = calculateTotalByKey(
// 					valuePayouts24hPromise.payouts,
// 					'amount'
// 				);

// 				showMyPayouts(payoutsAmount1h);
// 				showMyPayoutsUSD(
// 					payoutsAmount1h,
// 					currencyInfo.rate.value,
// 					'my_payouts_1h_usd'
// 				);

// 				showMyPayouts(payoutsAmount24h, 'my_payouts_24h');
// 				showMyPayoutsUSD(
// 					payoutsAmount24h,
// 					currencyInfo.rate.value,
// 					'my_payouts_24h_usd'
// 				);
// 				showPayoutsTable(valuePayouts24hPromise.payouts);

// 				if (statusPayoutsWeekPromise === 'fulfilled') {
// 					showSelectPayouts(
// 						valuePayouts24hPromise.payouts,
// 						valuePayoutsWeekPromise.payouts
// 					);
// 				}
// 			}

// 			return Promise.allSettled([
// 				historyWalletDayPromise,
// 				historyWalletWeekPromise,
// 			]);
// 		})
// 		.then(historyResults => {
// 			const [
// 				{
// 					status: statusHistoryWalletDayPromise,
// 					value: valueHistoryWalletDayPromise,
// 				},
// 				{
// 					status: statusHistoryWalletWeekPromise,
// 					value: valueHistoryWalletWeekPromise,
// 				},
// 			] = historyResults;

// 			if (
// 				statusHistoryWalletDayPromise === 'fulfilled' &&
// 				statusHistoryWalletWeekPromise === 'fulfilled'
// 			) {
// 				const labelsWeek = valueHistoryWalletWeekPromise.wallet_history.map(
// 					item => item.day.slice(0, 10)
// 				);
// 				const dataWeek = valueHistoryWalletWeekPromise.wallet_history.map(
// 					item => parseFloat(item.sum_difficulty)
// 				);

// 				const labelsDay = valueHistoryWalletDayPromise.wallet_history.map(
// 					item => item.day.slice(0, 10)
// 				);
// 				const dataDay = valueHistoryWalletDayPromise.wallet_history.map(item =>
// 					parseFloat(item.sum_difficulty)
// 				);

// 				showChartYourHashrate({ labelsWeek, dataWeek, labelsDay, dataDay });
// 			}

// 			return Promise.allSettled([balancePromise]);
// 		})
// 		.then(balanceResults => {
// 			const [
// 				{ status: statusBalancePromise, value: valueBalancePromise },
// 			] = balanceResults;

// 			if (statusBalancePromise === 'fulfilled' && currencyInfo) {
// 				showMyBalance(valueBalancePromise);
// 				showMyBalanceUSD(valueBalancePromise, currencyInfo.rate?.value);
// 			}

// 			showStats();
// 			enableButton();
// 		})
// 		.catch(error => {
// 			console.error('Error in drawData:', error);
// 			enableButton();
// 		});
// }