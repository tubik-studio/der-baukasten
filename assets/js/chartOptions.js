const chartOptions = {
	chart: {
		width: '100%',
		height: '100%',
		parentHeightOffset: 0,
		offsetX: 0,
		offsetY: 0,
		type: 'area',
		fontFamily: 'Inter, Arial, sans-serif',
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false
		},
		animations: {
			enabled: false
		}
	},
	dataLabels: {
		enabled: true,
		offsetX: 0,
		offsetY: 0,
		style: {
			fontFamily: 'Inter, Arial, sans-serif',
			fontWeight: '700',
			colors: ["#ffffff"]
		},
		background: {
			enabled: false,
		}
	},
	stroke: {
		curve: 'straight',
		width: 2,
		colors: ['#D99C63'],
	},
	xaxis: {
		show: true,
		type: "numeric",
		tickAmount: 12,
		min: 1.5,
		max: 7.5,
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		},
		labels: {
			show: false
		},
		tooltip: {
			enabled: false
		},
		crosshairs: {
			show: false
		}
	},
	yaxis: {
		show: true,
		type: "numeric",
		min: -5,
		max: 35,
		tickAmount: 8,
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false,
		},
		labels: {
			show: false
		},
		tooltip: {
			enabled: false
		},
		crosshairs: {
			show: false
		}
	},
	grid: {
		show: true,
		borderColor: '#212121',
		strokeDashArray: 0,
		position: 'back',
		xaxis: {
			lines: {
				show: true
			}
		},
		yaxis: {
			lines: {
				show: true
			}
		},
		padding: {
			top: -32,
			right: -3,
			bottom: 25,
			left: -11
		},
	},
	legend: {
		show: false
	},
	fill: {
		gradient: {
			colorStops: [
				[
					{
						offset: 0,
						color: '#D99C63',
						opacity: 0.08
					},
					{
						offset: 100,
						color: '#D99C63',
						opacity: 0
					}
				],
			]
		}
	},
	markers: {
		size: 4.5,
		strokeWidth: 0,
		colors: "#D99C63"
	},
	title: {
		margin: 0
	},
	tooltip: {
		enabled: false,
	}
}

export default chartOptions;
