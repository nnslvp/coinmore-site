const CHART_PERIOD = {
	day: 'day',
	week: 'week',
};

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

	if (initialData && initialData.length) {
		const { minY, maxY, stepSize } = calculateYAxisSettings(initialData);
		chartOptions.options.scales.y.min = minY;
		chartOptions.options.scales.y.max = maxY;
		chartOptions.options.scales.y.ticks.stepSize = stepSize;
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
			labels: [],
			datasets: [
				{
          period: CHART_PERIOD.week,
					label: 'Hashrate',
					data: [],
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
						callback: function (value) {
              const label = this.chart.options.plugins.title.text;
							const valueAxis = this.getLabelForValue(value);
							if (label === 'HASHRATE') {
                const {_, units } = shortenHm(parseFloat(valueAxis), 2);
								return `${valueAxis} ${units}/s`;
							}
              return  valueAxis;
						},
					},
					grid: {
						display: true,
						drawTicks: false,
						color: 'rgba(175, 184, 191, 1)',
					},
				},
				x: {
					ticks: {
						callback: function (value) {
              const period = this.chart.data.datasets[0].period;
							const valueAxis = this.getLabelForValue(value);
							if (period === 'week') {
								return formatDate(valueAxis);
							} else {
								return valueAxis.split('T')[1].split(':', 2).join(':');
							}
						},
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
              const period = this.chart.data.datasets[0].period;
							const label = tooltipItems[0].label;
							const date = label.split('T')[0];
							const time = label.split('T')[1].split('.')[0];
							if (period === 'week') {
								return date;
							} else {
								return `${date} ${time}`;
							}
						},
						label: function (tooltipItem) {
							const label = tooltipItem.dataset.label || '';
							const value = tooltipItem.raw;
							const titleText = this.chart.options.plugins.title.text;
							return `${label}: ${value} ${titleText}`;
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

function updateChartData(chart, newData, labels, period, label) {
	if (labels) {
		chart.data.labels = labels;
	}

	if (newData && newData.length) {
		const { minY, maxY, stepSize } = calculateYAxisSettings(newData);
		chart.options.scales.y.min = minY;
		chart.options.scales.y.max = maxY;
		chart.options.scales.y.ticks.stepSize = stepSize;
		chart.data.datasets[0].data = newData;
	}

	if (label) {
		chart.data.datasets[0].label = label;
	}

	if (period) {
		chart.data.datasets[0].period = period;
	}

	chart.update();
}

function calculateYAxisSettings(data) {
	const minY = Math.min(...data);
	const maxY = Math.max(...data);

  if (minY === 0 && maxY === 0) {
		return {
			minY: 0,
			maxY: 1,
			stepSize: 0.1, 
		};
	}

	const range = maxY - minY;
	const padding = range;
	const minYWithPadding = Math.max(0, minY - padding);
	const maxYWithPadding = maxY + padding;
	const stepSize = (range + padding * 2) / 6;


	return {
		minY: minYWithPadding,
		maxY: maxYWithPadding,
		stepSize: stepSize,
	};
}
