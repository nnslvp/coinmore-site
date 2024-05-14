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

FORM_MIN_PAYOUTS.addEventListener('submit', e => {
	e.preventDefault();
	STAT_MIN_PAYOUTS_VALUE.textContent = INPUT_MIN_PAYOUTS.value;
	MODAL.close();
});

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

function showMyHashrate({ day, hour }) {
	const shortHourHashRate = shortenHm(hour.hashrate, 2);
	const shortDayHashRate = shortenHm(day.hashrate, 2);

	document.getElementById(
		'my_hashrate_1h'
	).textContent = `${shortHourHashRate.hashrate} ${shortHourHashRate.units}`;

	document.getElementById(
		'my_hashrate_24h'
	).textContent = `${shortDayHashRate.hashrate} ${shortDayHashRate.units}`;
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

function showMyPayouts({ day, hour }, currencyRate) {
	document.getElementById('my_payouts_1h').textContent = parseFloat(
		hour.amount
	).toFixed(8);
	document.getElementById('my_payouts_1h_usd').textContent = `${amountUSD(
		hour.amount,
		currencyRate
	)} USD`;

	document.getElementById('my_payouts_24h').textContent = parseFloat(
		day.amount
	).toFixed(8);
	document.getElementById('my_payouts_24h_usd').textContent = `${amountUSD(
		day.amount,
		currencyRate
	)} USD`;
}

function showMyBalance(myBalanceData, currencyRate) {
	document.getElementById('balance').textContent = parseFloat(
		myBalanceData?.amount
	).toFixed(8);
	document.getElementById('balance_usd').textContent = `${amountUSD(
		myBalanceData?.amount,
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

function showSelectPayouts(payouts24hResponse, payoutsWeekResponse) {
	const selectPayouts = ItcCustomSelect.create('#select-payouts', {
		name: 'interval',
		targetValue: 'day',
		options: [
			['day', SELECT_PAYOUTS_NAME_OPTIONS.day],
			['week', SELECT_PAYOUTS_NAME_OPTIONS.week],
		],
		onSelected(select) {
			if (select.value === 'day') {
				showPayoutsTable(payouts24hResponse.payouts);
			} else {
				showPayoutsTable(payoutsWeekResponse.payouts);
			}
		},
	});
}

function drawData(coin, wallet) {
	disableButton();
	Promise.all([
		fetchMyHashrate(coin, wallet),
		fetchMyHashrate(coin, wallet, 86400),
		fetchMyPayouts(coin, wallet),
		fetchMyPayouts(coin, wallet, 86400),
		fetchMyPayouts(coin, wallet, 640800),
		fetchMyBalance(coin, wallet),
		fetchHistoryWallet(coin, wallet),
		fetchHistoryWallet(coin, wallet, 86400),
		// fetchMyEvents(coin, wallet),
		// createUserValue(coin, wallet),
		// fetchUserValue(coin, wallet),
		fetchCurrencyInfo(),
	])
		.then(
			([
				hashrate1hResponse,
				hashrate24hResponse,
				payouts1hResponse,
				payouts24hResponse,
				payoutsWeekResponse,
				myBalanceResponse,
				historyWalletWeekResponse,
				historyWallet24hResponse,
				// createUserValue,
				// myEventsResponse,
				// minPayoutsResponse,
				currencyRate,
			]) => {
				const hashrate1h = calculateTotalByKey(
					hashrate1hResponse.workers,
					'hashrate'
				);
				const hashrate24h = calculateTotalByKey(
					hashrate24hResponse.workers,
					'hashrate'
				);
				const payouts1h = calculateTotalByKey(
					payouts1hResponse.payouts,
					'amount'
				);
				const payouts24h = calculateTotalByKey(
					payouts24hResponse.payouts,
					'amount'
				);

				const labelsWeek = historyWalletWeekResponse.wallet_history.map(item =>
					item.day.slice(0, 10)
				);

				const dataWeek = historyWalletWeekResponse.wallet_history.map(item =>
					parseFloat(item.sum_difficulty)
				);

				const labelsDay = historyWallet24hResponse.wallet_history.map(item =>
					item.day.slice(0, 10)
				);

				const dataDay = historyWallet24hResponse.wallet_history.map(item =>
					parseFloat(item.sum_difficulty)
				);

				showChartYourHashrate({ labelsWeek, dataWeek, labelsDay, dataDay });

				showMyHashrate({
					hour: { hashrate: hashrate1h, units: hashrate1hResponse.units },
					day: { hashrate: hashrate24h, units: hashrate1hResponse.units },
				});

				showWorkersTable(
					hashrate1hResponse.workers,
					hashrate24hResponse.workers
				);

				showMyPayouts(
					{ hour: { amount: payouts1h }, day: { amount: payouts24h } },
					currencyRate.rate.value
				);

				showPayoutsTable(payouts24hResponse.payouts);

				showSelectPayouts(payouts24hResponse, payoutsWeekResponse);

				showMyBalance(myBalanceResponse, currencyRate.rate?.value);
				// showEventsTable(myEventsResponse.events);
				showStats();
				enableButton();
			}
		)
		.catch(e => console.log(e));
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

function init() {
	assignFormListener();

	const walletFromParams = getWalletParam();

	if (walletFromParams) {
		setCookie('wallet', walletFromParams, 365);
		setWalletForm(walletFromParams);
		drawData(COIN, walletFromParams);
	} else {
		const walletFromCookies = getCookie('wallet');
		if (walletFromCookies) {
			setWalletParam(walletFromCookies);
		}
	}
}

init();
