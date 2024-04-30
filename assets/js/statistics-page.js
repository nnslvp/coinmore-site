initCustomSelect();

var options = {
	chart: {
		type: 'area',
		width: '100%',
		height: '100%',
		zoom: {
			enabled: false,
		},
		toolbar: {
			show: false,
		},
	},
	series: [
		{
			name: 'Hashrate',
			data: [30, 33, 29, 20, 28, 17, 18, 29, 30],
		},
	],
	xaxis: {
		categories: [
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

		axisBorder: {
			show: true,
			color: '#AFB8BF',
			height: 1,
			offsetX: 0,
			offsetY: 0,
		},

		axisTicks: {
			show: false,
		},
	},

	yaxis: {
		show: true,
		showAlways: true,
		tickAmount: 4,
		min: 0,
		max: 40,
		axisBorder: {
			show: true,
			color: '#AFB8BF',
			offsetX: 0,
			offsetY: 0,
		},

		title: {
			text: 'H/S',
			rotate: 0,
			offsetX: 20,
			offsetY: -130,
			style: {
				color: undefined,
				cssClass: 'apexcharts-yaxis-title',
			},
		},
	},

	stroke: {
		curve: 'smooth',
		width: 2,
		colors: ['#9B4DCA'],
	},

	fill: {
		colors: ['rgba(155, 77, 202, 0.24)', 'rgba(155, 77, 202, 0)'],
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'vertical',
			shadeIntensity: 1,
			opacityFrom: 0.7,
			opacityTo: 1,
			stops: [0, 90, 100],
			colorStops: [],
		},
	},

	tooltip: {
		enabled: false,
	},

	dataLabels: {
		enabled: false,
	},
};

var chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();

function updateChartData(data, label) {
	myChart.data.datasets[0].data = data;
	myChart.data.datasets[0].label = label;
	myChart.update();
}

document.querySelector('.hourButton').addEventListener('click', function () {
	updateChartData([25, 26, 27, 30, 29, 28, 30, 32, 31], '1 Hour');
});

document.querySelector('.dayButton').addEventListener('click', function () {
	updateChartData([22, 23, 24, 26, 25, 25, 27, 28, 26], '24 Hours');
});

const tabsWorkersAndPayouts = document
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
