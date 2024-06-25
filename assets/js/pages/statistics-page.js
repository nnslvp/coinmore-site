const CHART_HASH_RATE = document.querySelector('#chartYourHashrate');
const MODAL = document.querySelector('.modal');
const OPEN_MODAL_BTNS = document.querySelectorAll('.open-modal-button');
const CLOSE_MODAL_BTN = document.querySelector('.close-modal-btn');
const FORM_MIN_PAYOUTS = MODAL.querySelector('#form-min-payouts');
const INPUT_MIN_PAYOUTS = FORM_MIN_PAYOUTS.querySelector('#input-min-payouts');
const STAT_MIN_PAYOUTS_VALUE = document.querySelector(
	'#stat-min-payouts-value'
);
const WALLET_FORM = document.querySelector('#wallet-form');
const WALLET_INPUT = WALLET_FORM.querySelector('#wallet-input');
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

const ERROR_MESSAGE_ELEMENT = document.getElementById('error-message');
const FORM_SUBMIT_BTN = MODAL.querySelector('.submit-btn');
const TOAST = document.querySelector('.toast');
const TOAST_CLOSE_BTN = TOAST.querySelector('.close-icon');
const TOAST_TEXT = TOAST.querySelector('.toast-text');


function showToast(params) {
  TOAST.classList.add('active');
  setTimeout(() => {
    TOAST.classList.remove('active');
  }, 5000);
};

TOAST_CLOSE_BTN.addEventListener('click', () => {
		TOAST_CLOSE_BTN.classList.remove('active');
});

function detectBrowserAndSetInputType() {
	const userAgent = navigator.userAgent;
	if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
		INPUT_MIN_PAYOUTS.setAttribute('type', 'text');
	} else {
		INPUT_MIN_PAYOUTS.setAttribute('type', 'number');
	}
}


activateTabsOnClick('.tabs__chart-hashrate');
activateTabsOnClick('.tabs-tables__workers-payouts');

function init() {
	assignFormListener();
  detectBrowserAndSetInputType();

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

	const currencyInfoPromise = fetchCurrencyInfo(coin);
	const payouts1hPromise = fetchMyPayouts(coin, wallet);
	const payouts24hPromise = fetchMyPayouts(coin, wallet, PERIOD_DAY);
	const payoutsWeekPromise = fetchMyPayouts(coin, wallet, PERIOD_WEEK);
	const hashrate1hPromise = fetchMyHashrate(coin, wallet);
	const hashrate24hPromise = fetchMyHashrate(coin, wallet, PERIOD_DAY);
	const balancePromise = fetchMyBalance(coin, '');
	const historyWalletWeekPromise = fetchHistoryWallet(coin, wallet);
	const historyWalletDayPromise = fetchHistoryWallet(coin, wallet, PERIOD_DAY);
	const historyWorkersDayPromise = fetchHistoryWorkers(coin, wallet);
	const userValueMinPayoutsPromise = fetchUserValue(coin, wallet);
	const poolValueMinPayoutsPromise = fetchPoolValue(coin, KIND.minPayout);
	const poolValueFeePromise = fetchPoolValue(coin, KIND.fee);
	let workers1h = [];
  let workers24h = [];
  let rate = null;

	Promise.allSettled([
		currencyInfoPromise,
		payouts1hPromise,
		payouts24hPromise,
		balancePromise,
		payoutsWeekPromise,
		hashrate1hPromise,
		hashrate24hPromise,
		historyWalletWeekPromise,
		historyWalletDayPromise,
		historyWorkersDayPromise,
		poolValueFeePromise,
		userValueMinPayoutsPromise.catch(error => {
			if (error.status === 404) {
				return poolValueMinPayoutsPromise;
			} else {
				throw error;
			}
		}),
	])
		.then(results => {
			const [
				currencyInfoResult,
				payouts1hResult,
				payouts24hResult,
				balanceResults,
				payoutsWeekResult,
				hashrate1hResults,
				hashrate24hResults,
				historyWalletWeekResult,
				historyWalletDayResult,
				historyWorkersDayResult,
				feeResult,
				minPayoutsResult,
			] = results.map(result =>
				result.status === 'fulfilled' ? result.value : result.reason
			);

			if (currencyInfoResult.value) {
				rate = currencyInfoResult.rate.value;
			} else {
				console.info(
					'Error in currencyInfoPromise:',
					currencyInfoResult.message
				);
			}

      console.log(results);

			if (payouts1hResult.value) {
				const payouts1h = payouts1hResult.payouts;
				const payoutsAmount1h = calculateTotalByKey(payouts1h, 'amount');
				showMyPayouts(payoutsAmount1h, 'my_payouts_1h', COIN_SYMBOL);
				showMyPayoutsUSD(payoutsAmount1h, rate, 'my_payouts_1h_usd');
			} else {
				console.info('Error in payouts1hPromise:', payouts1hResult.message);
			}

			if (balanceResults.value) {
				showMyBalance(balanceResults, 'balance', COIN_SYMBOL);
				showMyBalanceUSD(balanceResults, rate);
			} else  {
				console.info('Error in balancePromise:', balanceResults.message);
			}

			if (payouts24hResult.value) {
				const payouts24h = payouts24hResult.payouts;
				const payoutsAmount24h = calculateTotalByKey(payouts24h, 'amount');
				showMyPayouts(payoutsAmount24h, 'my_payouts_24h', COIN_SYMBOL);
				showMyPayoutsUSD(payoutsAmount24h, rate, 'my_payouts_24h_usd');
				showPayoutsTable(payouts24h);

				if (payoutsWeekResult.value) {
					const payoutsWeek = payoutsWeekResult.payouts;
					showSelectPayouts(payouts24h, payoutsWeek);
				} else {
					console.info(
						'Error in payoutsWeekPromise:',
						payoutsWeekResult.message
					);
				}
			} else {
				console.info('Error in payouts24hPromise:', payouts24hResult.message);
			}

			if (hashrate1hResults.value) {
				workers1h = hashrate1hResults.workers;
				const hashrate1h = calculateTotalByKey(workers1h, 'hashrate');
				showPoolHashrate(hashrate1h, 'my_hashrate_1h');
			} else {
				console.info('Error in hashrate1hPromise:', hashrate1hResults.message);
			}

			if (hashrate24hResults.value) {
				workers24h = hashrate24hResults.workers;
				const hashrate24h = calculateTotalByKey(workers24h, 'hashrate');
				showPoolHashrate(hashrate24h, 'my_hashrate_24h');
			} else {
				console.info('Error in hashrate24hPromise:', hashrate24hResults.message);
			}

			if (historyWorkersDayResult.value) {
				const workersHistory = historyWorkersDayResult.workers_history;
				const workersHistoryDay = workersHistory.filter(({ bucket }) => {
					const lastDayStart = new Date().setHours(0, 0, 0, 0);
					return new Date(bucket) >= lastDayStart;
				});
				showWorkersTable(workers24h, workers1h, workersHistoryDay);
			} else {
				console.info(
					'Error in historyWorkersDayPromise:',
					historyWorkersDayResult.message
				);
			}

			if (historyWalletWeekResult.value && historyWalletDayResult.value) {
				const historyWalletWeek = historyWalletWeekResult.wallet_history;
				const historyWalletDay = historyWalletDayResult.wallet_history;
				const labelsWeek = historyWalletWeek.map(item => item.bucket);
				const dataWeek = historyWalletWeek.map(item => item.hashrate);
				const labelsDay = historyWalletDay.map(item => item.bucket);
				const dataDay = historyWalletDay.map(item => shortenHm(item.hashrate));
				showChartYourHashrate({ labelsWeek, dataWeek, labelsDay, dataDay });
			} else {
				if (historyWalletWeekResult.message) {
					console.info(
						'Error in historyWalletWeekPromise:',
						historyWalletWeekResult.message
					);
				}
				if (historyWalletDayResult.message) {
					console.info(
						'Error in historyWalletDayPromise:',
						historyWalletDayResult.message
					);
				}
			}

			if (feeResult.value) {
				showPoolFee(feeResult.value);
			} else {
				console.info('Error in poolValueFeePromise:', feeResult.message);
			}

			if (minPayoutsResult.value) {
				showMinPayouts(minPayoutsResult.value);
			} else  {
				console.info(
					'Error in userValueMinPayoutsPromise or poolValueMinPayoutsPromise:',
					minPayoutsResult.message
				);
			}

			showStats();
		})
		.catch(error => {
			console.info('Error draw data', error);
		})
		.finally(() => enableButton());
}

function showStats() {
	document.getElementById('stats').classList.remove('empty-statistics');
}

function disableButton() {
	const button = document.getElementById('show');
	button.disabled = true;
}

function enableButton() {
	const button = document.getElementById('show');
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
	WALLET_INPUT.value = wallet;
}

function assignFormListener() {
	function processForm(e) {
		if (e.preventDefault){
      e.preventDefault();
    }

		if (WALLET_INPUT.value){
      setWalletParam(WALLET_INPUT.value);
    }

		return false;
	}

	if (WALLET_FORM.attachEvent) {
		WALLET_FORM.attachEvent('submit', processForm);
	} else {
		WALLET_FORM.addEventListener('submit', processForm);
	}
}

function validationInput(value) {
	const isNumeric = num => /^\d*[.,]?\d+$/.test(num);
	const isNegativeNumeric = num => /^-\d*\.?\d+$/.test(num);

	if (!value.trim().length) {
		INPUT_MIN_PAYOUTS.classList.add('invalid');
		ERROR_MESSAGE_ELEMENT.textContent = "Value can't be blank";
		return false;
	}

	if (isNegativeNumeric(value)) {
		INPUT_MIN_PAYOUTS.classList.add('invalid');
		ERROR_MESSAGE_ELEMENT.textContent = 'Value should be positive number';
		return false;
	}

	if (!isNumeric(value)) {
		INPUT_MIN_PAYOUTS.classList.add('invalid');
		ERROR_MESSAGE_ELEMENT.textContent = 'Value should be number';
		return false;
	}

	INPUT_MIN_PAYOUTS.classList.remove('invalid');
	ERROR_MESSAGE_ELEMENT.textContent = '';
	return true;
}

function assignFormListenerMinPayoutsForm(wallet) {
	FORM_MIN_PAYOUTS.addEventListener('submit', handleSubmit.bind(null, wallet));
}

MODAL.addEventListener('close', () => {
	INPUT_MIN_PAYOUTS.value = STAT_MIN_PAYOUTS_VALUE.textContent;
	INPUT_MIN_PAYOUTS.classList.remove('invalid');
});

function handleSubmit(wallet, e) {
	e.preventDefault();
	const newValue = INPUT_MIN_PAYOUTS.value.trim();
	const validInput = validationInput(newValue);
	if (validInput) {
		disableSubmitButton();

		createUserValue(COIN, wallet, 'min_payout', newValue.replace(',', '.'))
			.then(handleSuccess)
			.catch(handleError)
			.finally(resetSubmitButton);
	}
}

function disableSubmitButton() {
	FORM_SUBMIT_BTN.disabled = true;
	FORM_SUBMIT_BTN.classList.add('loading');
	FORM_SUBMIT_BTN.textContent = 'Saving...';
}

function resetSubmitButton() {
	FORM_SUBMIT_BTN.disabled = false;
	FORM_SUBMIT_BTN.textContent = 'Save Changes';
	FORM_SUBMIT_BTN.classList.remove('loading');
}

function handleSuccess(res) {
	showMinPayouts(res.value);
	ERROR_MESSAGE_ELEMENT.textContent =
		'The minimum payout was successfully updated.';
	INPUT_MIN_PAYOUTS.classList.remove('invalid');
	MODAL.close();
}

function handleError(error) {
	const errorMessage = error.message || error;
	const sanitizedMessage = errorMessage.replace(
		/because Kind is "min_payout".*/,
		''
	);
  TOAST_TEXT.textContent = sanitizedMessage;
  showToast()
}

OPEN_MODAL_BTNS.forEach(btn => {
	btn.addEventListener('click', () => {
		MODAL.showModal();
	});
});

CLOSE_MODAL_BTN.addEventListener('click', () => {
	MODAL.close();
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

function showMinPayouts(minPayoutsValue) {
	STAT_MIN_PAYOUTS_VALUE.textContent = minPayoutsValue;
	INPUT_MIN_PAYOUTS.value = minPayoutsValue;
}

function showWorkersTable(workersDay, workersHour, workersHistory) {
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
                    <td class="history-cell">
                      <canvas id="${workerDay.worker}" class="history-сhart">

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
	const workersByGroupe = Object.groupBy(
		workersHistory,
		({ worker }) => worker
	);

	const CHARTS_HISTORY_CELL_TABLE = document.querySelectorAll('.history-сhart');
	CHARTS_HISTORY_CELL_TABLE.forEach(chart => {
		const workerHistory = workersByGroupe[chart.id];
		const chartLabels = workerHistory.map(item => item.bucket);
		const chartData = workerHistory.map(
			item => shortenHm(parseFloat(item.hashrate), 2).hashrate
		);
		initializeChart(
			chart,
			getChartOptions(CHART_HISTORY_CELL_TABLE_OPTIONS),
			chartData,
			chartLabels
		);
	});
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
		getChartOptions({
			options: {
				plugins: {
					tooltip: {
						callbacks: {
							label: tooltipItem => {
								const label = tooltipItem.dataset.label || '';
								const { hashrate, units } = shortenHm(tooltipItem.raw, 2);
								return `${label}: ${hashrate} ${units}`;
							},
						},
					},
				},
			},
		}),
		dataWeek,
		labelsWeek
	);

	tabDayChartHashrate.addEventListener('click', function (e) {
		updateChartData(hashRateChart, dataDay, labelsDay, CHART_PERIOD.day);
	});

	tabWeekButtonChartHashrate.addEventListener('click', function (e) {
		updateChartData(hashRateChart, dataWeek, labelsWeek, CHART_PERIOD.week);
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
