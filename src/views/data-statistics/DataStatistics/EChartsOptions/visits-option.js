export default {
	title: {
		text: "访问量趋势",
	},
	tooltip: {
		trigger: "axis",
		axisPointer: {
			// 坐标轴指示器，坐标轴触发有效
			type: "line", // 默认为直线，可选为：'line' | 'shadow'
		},
	},
	xAxis: {
		type: "category",
		data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	},
	yAxis: {
		type: "value",
	},
	grid: {
		bottom: "15%",
	},
	series: [
		{
			name: "访问量",
			data: [600, 800, 850, 980, 1320, 1620, 1500, 1650, 1400, 1360, 1880, 2062],
			type: "line",
		},
	],
};
