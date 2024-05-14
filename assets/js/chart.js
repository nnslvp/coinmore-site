

function initializeChart(
	chartElement,
	chartOptions,
	initialData,
	initialLabels
) {
	const ctx = chartElement.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(155, 77, 202, 0.24)');
	gradient.addColorStop(1, 'rgba(155, 77, 202, 0)');

	if (initialData) {
		chartOptions.data.datasets[0].data = initialData;
	}

	if (initialLabels) {
		chartOptions.data.labels = initialLabels;
	}

	chartOptions.data.datasets.forEach(dataset => {
		dataset.backgroundColor = gradient;
	});

	let chart = new Chart(ctx, chartOptions);
	return chart;
}

function getChartOptions(newOptions) {
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
					max: 400000,
					ticks: {
						stepSize: 100000,
						callback: function (value, index, values) {
							return value / 10000;
						},
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
  
	if (!newOptions) {
		return CHART_BASE_OPTIONS;
	}
	return deepMerge(CHART_BASE_OPTIONS, newOptions);
}

function updateChartData(chart, newData) {
	chart.data.datasets[0].data = newData;
	chart.update();
}
