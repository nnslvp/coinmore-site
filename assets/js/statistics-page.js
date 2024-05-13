const CHART_HASH_RATE = document.querySelector('#chartYourHashrate');
const MODAL = document.querySelector('.modal');
const OPEN_MODAL_BTN = document.querySelector('.open-button');
const [tabHourChartHashrate, tabDayButtonChartHashrate] = getTabs(
	'.tabs__chart-hashrate'
);

const CHART_BASE_OPTIONS = {
	type: 'line',
	data: {
		labels: [
			'Value 1',
			'Value 2',
			'Value 3',
			'Value 4',
			'Value 5',
			'Value 6',
			'Value 7',
			'Value 8',
			'Value 9',
		],
		datasets: [
			{
				label: 'Hashrate',
				data: [30, 33, 29, 20, 28, 17, 18, 29, 30],
				backgroundColor: 'rgba(155, 77, 202, 0.24)',
				borderColor: '#9B4DCA',
				borderWidth: 2,
				fill: true,
				pointRadius: 0,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
				min: 0,
				max: 40,
				ticks: {
					stepSize: 10,
				},
				grid: {
					display: false,
				},
			},
			x: {
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
				display: true,
				text: 'EH/s',
				font: {
					size: 14,
				},
				color: '#606C76',
				position: 'top',
				align: 'start',
				font: { weight: 'normal' },
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	},
};
const CHART_HISTORY_CELL_TABLE_OPTIONS = getChartOptions({
	options: {
		scales: {
			y: {
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

function initializeChart(chartElement, chartOptions, initialData) {
	const ctx = chartElement.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(155, 77, 202, 0.24)');
	gradient.addColorStop(1, 'rgba(155, 77, 202, 0)');

	if (initialData) {
		chartOptions.data.datasets[0].data = initialData;
	}

	chartOptions.data.datasets.forEach(dataset => {
		dataset.backgroundColor = gradient;
	});

	let chart = new Chart(ctx, chartOptions);
	return chart;
}

function getChartOptions(newOptions) {
	if (!newOptions) {
		return CHART_BASE_OPTIONS;
	}
	const options = JSON.parse(JSON.stringify(CHART_BASE_OPTIONS));
	return deepMerge(options, newOptions);
}

function updateChartData(chart, newData) {
	chart.data.datasets[0].data = newData;
	chart.update();
}

function getTabs(containerSelector) {
	const container = document.querySelector(containerSelector);
	const tabs = container.querySelectorAll('.tab');
	return tabs;
}

function activateTabsOnClick(containerSelector) {
	const tabs = getTabs(containerSelector);

	tabs.forEach(tab => {
		tab.addEventListener('click', e => {
			tabs.forEach(t => t.classList.remove('active'));
			e.currentTarget.classList.add('active');
		});
	});
}

activateTabsOnClick('.tabs__chart-hashrate');
activateTabsOnClick('.tabs-tables__workers-payouts');

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

function showChartYourHashrate(hashrate1h, hashrate24h) {
	const hashRateChart = initializeChart(CHART_HASH_RATE, getChartOptions(), [
		hashrate1h,
	]);

	tabHourChartHashrate.addEventListener('click', function (e) {
		updateChartData(hashRateChart, [hashrate1h]);
	});

	tabDayButtonChartHashrate.addEventListener('click', function (e) {
		updateChartData(hashRateChart, [hashrate24h]);
	});
}

function showSelectPayouts(payouts24hResponse, payoutsWeekResponse) {
	const selectPayouts = ItcCustomSelect.create('#select-payouts', {
		name: 'interval',
		targetValue: 'day',
		options: [
			['day', '24 hours'],
			['week', 'Week'],
		],
		onSelected(select, option) {
			console.log(`Выбранное значение: ${select.value}`);
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
		fetchMyPayouts(coin, wallet),
		fetchMyBalance(coin, wallet),
		// fetchMyEvents(coin, wallet),
		fetchCurrencyInfo(),
	])
		.then(
			([
				[hashrate1hResponse, hashrate24hResponse],
				[payouts1hResponse, payouts24hResponse, payoutsWeekResponse],
				myBalanceResponse,
				// myEventsResponse,
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

				showChartYourHashrate(hashrate1h, hashrate24h);

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

	document
		.getElementById('workers-tab')
		.addEventListener('click', e => switchTab(e, 'workers'));
	document
		.getElementById('payouts-tab')
		.addEventListener('click', e => switchTab(e, 'payouts'));
}

function switchTab(event, tabId) {
	// document.querySelectorAll('.tab').forEach(tab => {
	// 	tab.classList.remove('active');
	// });
	// document.querySelectorAll('.tab-links .button').forEach(tab => {
	// 	tab.classList.remove('button-outline');
	// 	tab.classList.add('button-clear');
	// });
	// document.getElementById(tabId).classList.add('active');
	// event.currentTarget.classList.add('button-outline');
	// event.currentTarget.classList.remove('button-clear');
}

function init() {
	assignFormListener();

	const walletFromParams = getWalletParam();

	if (walletFromParams) {
		// Cookies.set('wallet', walletFromParams, { expires: 365 });
		setWalletForm(walletFromParams);
		drawData(COIN, walletFromParams);
	} else {
		// const walletFromCookies = Cookies.get('wallet');
		// if (walletFromCookies) {
		// 	setWalletParam(walletFromCookies);
		// }
	}
}

init();
