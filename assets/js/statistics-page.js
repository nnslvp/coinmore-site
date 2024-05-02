initCustomSelect();

const CHART_HASH_RATE = document.querySelector('#chartYourHashrate');
const CHARTS_HISTORY_CELL_TABLE = document.querySelectorAll('#historyChart');
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

function initializeChart(chartElement, chartOptions) {
	const ctx = chartElement.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(155, 77, 202, 0.24)');
	gradient.addColorStop(1, 'rgba(155, 77, 202, 0)');

	chartOptions.data.datasets.forEach(dataset => {
		dataset.backgroundColor = gradient;
	});

	let chart = new Chart(ctx, chartOptions);
	return chart;
}

function deepMerge(target, source) {
	Object.keys(source).forEach(key => {
		if (source[key] && typeof source[key] === 'object') {
			target[key] = target[key] || (Array.isArray(source[key]) ? [] : {});
			deepMerge(target[key], source[key]);
		} else {
			target[key] = source[key];
		}
	});
	return target;
}

function getChartOptions(newOptions) {
	if (!newOptions) {
		return CHART_BASE_OPTIONS;
	}
	const options = JSON.parse(JSON.stringify(CHART_BASE_OPTIONS));
	return deepMerge(options, newOptions);
}

const hashRateChart = initializeChart(CHART_HASH_RATE, getChartOptions());

CHARTS_HISTORY_CELL_TABLE.forEach(chart => {
	initializeChart(chart, getChartOptions(CHART_HISTORY_CELL_TABLE_OPTIONS));
});

function updateChartData(chart, newData) {
	chart.data.datasets[0].data = newData;
	chart.update();
}

document.querySelector('.hourButton').addEventListener('click', function (e) {
	updateChartData(hashRateChart, [25, 26, 27, 30, 29, 28, 30, 32, 31]);
});

document.querySelector('.dayButton').addEventListener('click', function (e) {
	updateChartData(hashRateChart, [22, 23, 24, 26, 25, 25, 27, 28, 26]);
});

const tabsWorkersAndPayouts = document
	.querySelector('.chart-interval__workers-payouts-container')
	.querySelectorAll('.tab');

const tabsIntervalHourAndDay = document
	.querySelector('.chart-interval__workers-payouts-container')
	.querySelectorAll('.tab');

tabsWorkersAndPayouts.forEach(tab => {
	tab.addEventListener('click', e => {
		tabsWorkersAndPayouts.forEach(e => e.classList.remove('active'));
		e.currentTarget.classList.toggle('active');
	});
});

const modal = document.querySelector('.modal');
const openButton = document.querySelector('.open-button');

openButton.addEventListener('click', () => {
	modal.showModal();
});

modal.addEventListener('click', e => {
	const dialogDimensions = modal.getBoundingClientRect();
	if (
		e.clientX < dialogDimensions.left ||
		e.clientX > dialogDimensions.right ||
		e.clientY < dialogDimensions.top ||
		e.clientY > dialogDimensions.bottom
	) {
		modal.close();
	}
});

// var ctx = document.getElementById('chart').getContext('2d');
