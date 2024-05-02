const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT = document.querySelector('#profitChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
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

function updateChartData(chart, newData) {
	chart.data.datasets[0].data = newData;
	chart.update();
}

const poolHashRateChart = initializeChart(
	CHART_POOL_HASH_RATE,
	getChartOptions()
);

const profitChart = initializeChart(
	CHART_PROFIT,
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: 'ALPH',
				},
			},
		},
	})
);

const workersActivityChart = initializeChart(
	CHART_WORKERS,
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: 'Workers',
				},
			},
		},
	})
);
