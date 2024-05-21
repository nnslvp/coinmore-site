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

	Chart.Tooltip.positioners.myCustomPositioner = function (
		elements,
		eventPosition
	) {
		const tooltip = this;

		if (!elements.length) {
			return false;
		}

		const element = elements[0];

		return {
			x: element.element.x + 15,
			y: element.element.y + 18,
		};
	};

	if (!chartOptions.options.plugins.tooltip) {
		chartOptions.options.plugins.tooltip = {};
	}

	chartOptions.options.plugins.tooltip.position = 'myCustomPositioner';

	let chart = new Chart(ctx, chartOptions);

	chartElement.addEventListener('mousemove', function (event) {
		const points = chart.getElementsAtEventForMode(
			event,
			'nearest',
			{ intersect: true },
			false
		);
		const containsPointElement = points.some(
			point => point.element instanceof Chart.elements.PointElement
		);

		if (containsPointElement) {
			chartElement.style.cursor = 'pointer';
		} else {
			chartElement.style.cursor = 'default';
		}
	});

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
					pointHitRadius: 10,
					pointHoverRadius: 8,
					pointHoverBackgroundColor: '#ffffff',
					pointHoverBorderColor: '#9B4DCA',
					pointHoverBorderWidth: 2,
					tension: 0.1,
				},
			],
		},
		options: {
			onHover: (event, chartElement) => {
				if (chartElement[0]?.element) {
					event.native.target.style.cursor = 'pointer';
				}
			},
			scales: {
				y: {
					beginAtZero: false,	
					ticks: {
						// callback: function (value, index, values) {
						// 	   if (value >= 1000000) {
						// 				return (value / 1000000).toFixed(1) + 'M';
						// 			} else if (value >= 1000) {
						// 				return (value / 1000).toFixed(1) + 'k';
						// 			}
						// 			return value.toString();
						// },
					},
					grid: {
						display: true,
						drawTicks: false,
						color: 'rgba(175, 184, 191, 1)',
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
					enabled: true,
					mode: 'index',
					position: 'myCustomPositioner',
					intersect: false,
					backgroundColor: 'rgba(97, 20, 143, 1)',
					bodyColor: '#FFFFFF',
					padding: 12,
					caretSize: 0,
					bodyFont: {
						weight: 'bold',
						lineHeight: 1.2,
					},
					titleMarginBottom: 12,
					cornerRadius: 10,
					displayColors: false,
					xAlign: 'left',
					yAlign: 'top',
					callbacks: {
						title: function (tooltipItems) {
							// console.log(tooltipItems);
							const date = tooltipItems[0].label.split(' ')[0];
							const time = tooltipItems[0].label.split(' ')[1];
							return `${date}  11:11:11`;
						},
						label: function (tooltipItem) {
							// console.log('Tooltip label item:', tooltipItem);
							const label = tooltipItem.dataset.label || '';
							const value = tooltipItem.raw;
							return `${label}: ${Math.round(value)} EH/s`;
						},
					},
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

function updateChartData(chart, newData, labels) {
	if (labels) {
		chart.data.labels = labels;
	}
	chart.data.datasets[0].data = newData;
	chart.update();
}
