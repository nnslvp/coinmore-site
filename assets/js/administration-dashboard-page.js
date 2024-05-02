const CHART_POOL_HASH_RATE = document.querySelector('#poolHashrateChart');
const CHART_PROFIT_PER_GH = document.querySelector('#profitPerGHChart');
const CHART_WORKERS = document.querySelector('#workersActivityChart');
const CHART_BLOCKS = document.querySelector('#blocksChart');
const CHART_GROSS_NET_PROFIT = document.querySelector('#grossNetProfitChart');
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
	const gradient = ctx.createLinearGradient(0, 0, 0, 300);
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
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: '',
				},
			},
		},
	})
);

const profitChart = initializeChart(
	CHART_PROFIT_PER_GH,
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: '',
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
					text: '',
				},
			},
		},
	})
);

const grossNetProfitChart = initializeChart(
	CHART_GROSS_NET_PROFIT,
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: '',
				},
			},
		},
	})
);

const blocksChart = initializeChart(
	CHART_BLOCKS,
	getChartOptions({
		options: {
			plugins: {
				title: {
					text: '',
				},
			},
		},
	})
);

ItcCustomSelect.create('#select-currency', {
	name: 'interval',
	placeholder: 'Select currency',
	targetValue: '',
	options: [
		['day', '24 hours'],
		['week', 'Week'],
	],
	onSelected(select, option) {
		// выбранное значение
		console.log(`Выбранное значение: ${select.value}`);
		// индекс выбранной опции
		console.log(`Индекс выбранной опции: ${select.selectedIndex}`);
		// выбранный текст опции
		const text = option ? option.textContent : '';
		console.log(`Выбранный текст опции: ${text}`);
	},
});

ItcCustomSelect.create('#select-region', {
	name: 'interval',
	placeholder: 'Select currency',
	targetValue: '',
	options: [
		['day', '24 hours'],
		['week', 'Week'],
	],
	onSelected(select, option) {
		// выбранное значение
		console.log(`Выбранное значение: ${select.value}`);
		// индекс выбранной опции
		console.log(`Индекс выбранной опции: ${select.selectedIndex}`);
		// выбранный текст опции
		const text = option ? option.textContent : '';
		console.log(`Выбранный текст опции: ${text}`);
	},
});

const datepickerContainer = document.querySelector(
	'.datepicker-range__container'
);
window.addEventListener('load', function (event) {
	new DateRangePicker('date-time-range-input');
});

datepickerContainer.addEventListener('click', e => {
	e.currentTarget.classList.add('active');
});
