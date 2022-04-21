export default {
	title: {
		text: "热门搜索",
	},
	tooltip: {
		trigger: "axis",
		axisPointer: {
			// 坐标轴指示器，坐标轴触发有效
			type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
		},
	},
	xAxis: {
		type: "category",
		data: ["考研", "考公", "四六级", "实习", "金融类", "出国留学", "计算机二级"],
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			data: [
				320,
				{
					value: 450,
					itemStyle: {
						color: "#6BE2BE",
					},
				},
				270,
				340,
				{
					value: 200,
					itemStyle: {
						color: "#FF7E78",
					},
				},
				290,
				330,
			],
			type: "bar",
		},
	],
	grid: {
		left: "5%",
		right: "10",
		bottom: "15%",
	},
};
