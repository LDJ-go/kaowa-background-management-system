export default {
	title: {
		text: "用户地区分布",
	},
	tooltip: {
		trigger: "item",
	},
	// legend: {
	// 	orient: "horizontal",
	// 	left: "center",
	// 	top: "bottom",
	// },
	series: [
		{
			name: "Access From",
			type: "pie",
			radius: "50%",
			data: [
				{ value: 1048, name: "广东" },
				{ value: 735, name: "广西" },
				{ value: 580, name: "浙江" },
				{ value: 484, name: "湖南" },
				{ value: 300, name: "江苏" },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: "rgba(0, 0, 0, 0.5)",
				},
			},
		},
	],
};
