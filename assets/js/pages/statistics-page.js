const CHART_HASH_RATE = document.querySelector('#chartYourHashrate');
const MODAL = document.querySelector('.modal');
const OPEN_MODAL_BTN = document.querySelector('.open-button');
const FORM_MIN_PAYOUTS = MODAL.querySelector('#form-min-payouts');
const INPUT_MIN_PAYOUTS = FORM_MIN_PAYOUTS.querySelector('#input-min-payouts');
const STAT_MIN_PAYOUTS_VALUE = document.querySelector(
	'#stat-min-payouts-value'
);
const [tabDayChartHashrate, tabWeekButtonChartHashrate] = getTabs(
	'.tabs__chart-hashrate'
);
const CHART_HISTORY_CELL_TABLE_OPTIONS = getChartOptions({
	data: {
		datasets: [
			{
				pointRadius: 0,
				pointHitRadius: 0,
				pointHoverRadius: 0, 
			},
		],
	},
	options: {
		scales: {
			y: {
				display: false,
				ticks: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
			x: {
				ticks: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
			title: {
				display: false,
			},
		},
	},
});


activateTabsOnClick('.tabs__chart-hashrate');
activateTabsOnClick('.tabs-tables__workers-payouts');

function init() {
	assignFormListener();

	const walletFromParams = getWalletParam();

	if (walletFromParams) {
		setCookie('wallet', walletFromParams, 365);
		setWalletForm(walletFromParams);
		drawData(COIN, walletFromParams);
		assignFormListenerMinPayoutsForm(walletFromParams);
	} else {
		const walletFromCookies = getCookie('wallet');
		if (walletFromCookies) {
			setWalletParam(walletFromCookies);
		}
	}
}

init();

function drawData(coin, wallet) {
	disableButton();

	const currencyInfoPromise = fetchCurrencyInfo();
	const payouts1hPromise = fetchMyPayouts(coin, wallet);
	const payouts24hPromise = fetchMyPayouts(coin, wallet, 86400);
	const payoutsWeekPromise = fetchMyPayouts(coin, wallet, 640800);
	const hashrate1hPromise = fetchMyHashrate(coin, wallet);
	const hashrate24hPromise = fetchMyHashrate(coin, wallet, 86400);
	const balancePromise = fetchMyBalance(coin, wallet);
	const historyWalletWeekPromise = fetchHistoryWallet(coin, wallet);
	const historyWalletDayPromise = fetchHistoryWallet(coin, wallet, 86400);
	const userValueMinPayoutsPromise = fetchUserValue(coin, wallet);

	let currencyInfo = null;

	userValueMinPayoutsPromise
		.then(({ value }) => showMinPayouts(value))
		.catch(_ => {
			showMinPayouts(0.1);
		});

	Promise.allSettled([currencyInfoPromise])
		.then(([currencyInfoResult]) => {
			if (currencyInfoResult.status === 'fulfilled') {
				currencyInfo = currencyInfoResult.value;
			}
			return Promise.allSettled([hashrate1hPromise, hashrate24hPromise]);
		})
		.then(hashrateResults => {
			const [
				{ status: statusHashrate1hPromise, value: valueHashrate1hPromise },
				{ status: statusHashrate24hPromise, value: valueHashrate24hPromise },
			] = hashrateResults;

			if (
				statusHashrate1hPromise === 'fulfilled' &&
				statusHashrate24hPromise === 'fulfilled'
			) {
				const hashrate24h = calculateTotalByKey(
					valueHashrate24hPromise.workers,
					'hashrate'
				);
				const hashrate1h = calculateTotalByKey(
					valueHashrate1hPromise.workers,
					'hashrate'
				);

				showMyHashrate(hashrate1h, 'my_hashrate_1h');
				showMyHashrate(hashrate24h, 'my_hashrate_24h');
				showWorkersTable(
					valueHashrate24hPromise.workers,
					valueHashrate1hPromise.workers
				);
			}

			return Promise.allSettled([
				payouts1hPromise,
				payouts24hPromise,
				payoutsWeekPromise,
			]);
		})
		.then(payoutsResults => {
			const [
				{ status: statusPayouts1hPromise, value: valuePayouts1hPromise },
				{ status: statusPayouts24hPromise, value: valuePayouts24hPromise },
				{ status: statusPayoutsWeekPromise, value: valuePayoutsWeekPromise },
			] = payoutsResults;

			if (
				statusPayouts1hPromise === 'fulfilled' &&
				statusPayouts24hPromise === 'fulfilled' &&
				currencyInfo
			) {
				const payoutsAmount1h = calculateTotalByKey(
					valuePayouts1hPromise.payouts,
					'amount'
				);
				const payoutsAmount24h = calculateTotalByKey(
					valuePayouts24hPromise.payouts,
					'amount'
				);

				showMyPayouts(payoutsAmount1h);
				showMyPayoutsUSD(
					payoutsAmount1h,
					currencyInfo.rate.value,
					'my_payouts_1h_usd'
				);
				showMyPayouts(payoutsAmount24h, 'my_payouts_24h');
				showMyPayoutsUSD(
					payoutsAmount24h,
					currencyInfo.rate.value,
					'my_payouts_24h_usd'
				);
				showPayoutsTable(valuePayouts24hPromise.payouts);

				if (statusPayoutsWeekPromise === 'fulfilled') {
					showSelectPayouts(
						valuePayouts24hPromise.payouts,
						valuePayoutsWeekPromise.payouts
					);
				}
			}

			return Promise.allSettled([
				historyWalletDayPromise,
				historyWalletWeekPromise,
			]);
		})
		.then(historyResults => {
			const [
				{
					status: statusHistoryWalletDayPromise,
					value: valueHistoryWalletDayPromise,
				},
				{
					status: statusHistoryWalletWeekPromise,
					value: valueHistoryWalletWeekPromise,
				},
			] = historyResults;

			if (
				statusHistoryWalletDayPromise === 'fulfilled' &&
				statusHistoryWalletWeekPromise === 'fulfilled'
			) {
				const labelsWeek = valueHistoryWalletWeekPromise.wallet_history.map(
					item => item.day.slice(0, 10)
				);
				const dataWeek = valueHistoryWalletWeekPromise.wallet_history.map(
					item => parseFloat(item.sum_difficulty)
				);

				const labelsDay = valueHistoryWalletDayPromise.wallet_history.map(
					item => item.day.slice(0, 10)
				);
				const dataDay = valueHistoryWalletDayPromise.wallet_history.map(item =>
					parseFloat(item.sum_difficulty)
				);

				showChartYourHashrate({ labelsWeek, dataWeek, labelsDay, dataDay });
			}

			return Promise.allSettled([balancePromise]);
		})
		.then(balanceResults => {
			const [
				{ status: statusBalancePromise, value: valueBalancePromise },
			] = balanceResults;

			if (statusBalancePromise === 'fulfilled' && currencyInfo) {
				showMyBalance(valueBalancePromise);
				showMyBalanceUSD(valueBalancePromise, currencyInfo.rate?.value);
			}

			showStats();
			enableButton();
		})
		.catch(error => {
			console.error('Error in drawData:', error);
			enableButton();
		});
}

function showStats() {
	document.getElementById('stats').classList.remove('empty-statistics');
}

function disableButton() {
	const button = document.getElementById('show');
	// button.textContent = 'Loading..';
	button.disabled = true;
}

function enableButton() {
	const button = document.getElementById('show');
	// button.textContent = 'Update';
	button.disabled = false;
}

function setWalletParam(wallet) {
	const urlParams = new URLSearchParams(window.location.search);

	urlParams.set('wallet', wallet);

	window.location.search = urlParams;
}

function getWalletParam() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get('wallet')?.trim();
}

function setWalletForm(wallet) {
	const walletInput = document.getElementById('wallet-input');
	walletInput.value = wallet;
}

function assignFormListener() {
	function processForm(e) {
		if (e.preventDefault) e.preventDefault();
		const walletInput = document.getElementById('wallet-input');
		if (walletInput.value) setWalletParam(walletInput.value);
		return false;
	}

	const form = document.getElementById('wallet-form');
	if (form.attachEvent) {
		form.attachEvent('submit', processForm);
	} else {
		form.addEventListener('submit', processForm);
	}
}

function assignFormListenerMinPayoutsForm(wallet) {
	FORM_MIN_PAYOUTS.addEventListener('submit', e => {
		e.preventDefault();
		const value = INPUT_MIN_PAYOUTS.value;
		createUserValue(COIN, wallet, 'min_payout', value)
			.then(() => {
				STAT_MIN_PAYOUTS_VALUE.textContent = value;
				MODAL.close();
			})
			.catch(error => {
				console.error('Error submitting form:', error);
			});
	});
}

OPEN_MODAL_BTN.addEventListener('click', () => {
	MODAL.showModal();
});

MODAL.addEventListener('click', e => {
	const dialogDimensions = MODAL.getBoundingClientRect();
	if (
		e.clientX < dialogDimensions.left ||
		e.clientX > dialogDimensions.right ||
		e.clientY < dialogDimensions.top ||
		e.clientY > dialogDimensions.bottom
	) {
		MODAL.close();
	}
});

function showMyHashrate(hashrate, id = 'my_hashrate_1h') {
	const shortHashRate = shortenHm(hashrate, 2);
	document.getElementById(
		id
	).textContent = `${shortHashRate.hashrate} ${shortHashRate.units}`;
}
function showMinPayouts(minPayoutsValue) {
	STAT_MIN_PAYOUTS_VALUE.textContent = minPayoutsValue;
}

function showWorkersTable(workersDay, workersHour) {
	const tableBody = document
		.getElementById('statistics-workers-table')
		.getElementsByTagName('tbody')[0];
	let rowsHtml = '';

	workersDay.forEach(workerDay => {
		const workerHour =
			workersHour.find(w => w.worker === workerDay.worker) || {};
		const shortHashRateHour = workerHour.hashrate
			? shortenHm(workerHour.hashrate, 2)
			: { hashrate: 'N/A', units: '' };
		const shortHashRateDay = workerDay.hashrate
			? shortenHm(workerDay.hashrate, 2)
			: { hashrate: 'N/A', units: '' };

		rowsHtml += `
                  <tr>
                    <td class="worker-cell" data="worker">
                      <span class="worker-value">
                      ${workerDay.worker || 'N/A'}
                      </span>
                    </td>
                    <td class="hashrate-cell" data="Hashrate 1h/24h">
                      <span class="hashrate-value">
                      ${shortHashRateHour.hashrate} 
                      ${shortHashRateHour.units} / 
                      ${shortHashRateDay.hashrate} 
                      ${shortHashRateDay.units}
                      </span>
                    </td>
                    <td class="history-cell" data="7 day history">
                      <canvas id="historyChart" class="history-сhart">

                      </canvas>
                    </td>
                    <td class="valid-shares-cell" data="Valid Shares 1h/24h">
                      <span class="electricity-costs__value">
                        ${workerHour.shares_count || 'N/A'} / 
                        ${workerDay.shares_count || 'N/A'}</span>
                    </td>
                    <td class="last-share-cell" data="Last Share At">
                      <span id="last-share-value">
                        ${
													workerDay.last_share_at
														? new Date(workerDay.last_share_at).toLocaleString()
														: 'N/A'
												}
                      </span>
                    </td>
                  </tr>`;
	});

	tableBody.innerHTML = rowsHtml;
	const CHARTS_HISTORY_CELL_TABLE = document.querySelectorAll('#historyChart');
	CHARTS_HISTORY_CELL_TABLE.forEach(chart => {
		initializeChart(chart, getChartOptions(CHART_HISTORY_CELL_TABLE_OPTIONS));
	});
}

function showMyPayouts(amount, id = 'my_payouts_1h') {
	document.getElementById(id).textContent = parseFloat(amount).toFixed(8);
}

function showMyPayoutsUSD(amount, currencyRate, id = 'my_payouts_1h_usd') {
	document.getElementById(id).textContent = `${amountUSD(
		amount,
		currencyRate
	)} USD`;
}

function showMyBalance(myBalanceData, id = 'balance') {
	document.getElementById(id).textContent = parseFloat(
		myBalanceData?.amount 
	).toFixed(8);
}

function showMyBalanceUSD(myBalanceData, currencyRate, id = 'balance_usd') {
	document.getElementById(id).textContent = `${amountUSD(
		myBalanceData?.amount ,
		currencyRate
	)} USD`;
}

function showPayoutsTable(payouts) {
	const tableBody = document
		.getElementById('statistics-payouts-table')
		.getElementsByTagName('tbody')[0];
	tableBody.innerHTML = '';
	let rowsHtml = '';

	payouts.forEach(payout => {
		rowsHtml += `
    <tr>
        <td data="Amount" class="amount-cell">
            <span class="amount-value">
            ${parseFloat(payout.amount).toFixed(8)}
            </span>
        </td>
        <td data="Timestamp" class="timestamp-cell">
            <span class="timestamp-value">
            ${new Date(payout.timestamp).toLocaleString()}
            </span>
        </td>
    </tr>`;
	});
	tableBody.innerHTML = rowsHtml;
}

function showChartYourHashrate({ labelsWeek, dataWeek, labelsDay, dataDay }) {
	const hashRateChart = initializeChart(
		CHART_HASH_RATE,
		getChartOptions(),
		dataWeek,
		labelsWeek
	);

	tabDayChartHashrate.addEventListener('click', function (e) {
		updateChartData(hashRateChart, dataDay, labelsDay);
	});

	tabWeekButtonChartHashrate.addEventListener('click', function (e) {
		updateChartData(hashRateChart, dataWeek, labelsWeek);
	});
}

function showSelectPayouts(payoutsDay, payoutsWeek) {
	const selectPayouts = ItcCustomSelect.create('#select-payouts', {
		name: 'interval',
		targetValue: 'day',
		options: [
			['day', SELECT_PAYOUTS_NAME_OPTIONS.day],
			['week', SELECT_PAYOUTS_NAME_OPTIONS.week],
		],
		onSelected(select) {
			if (select.value === 'day') {
				showPayoutsTable(payoutsDay);
			} else {
				showPayoutsTable(payoutsWeek);
			}
		},
	});
}



