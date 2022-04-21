<template>
	<el-row :gutter="20" class="el-row">
		<el-col :span="6" v-for="(item, index) in dataList" :key="index">
			<div class="grid-content bg-purple daily-user-counts">
				<div>{{ item.title }}</div>
				<h2>{{ item.counts }}</h2>
				<div>
					<span>周同比：</span>
					<span>{{ item.weekRatio }}%</span>
					<span>日环比：</span>
					<span>{{ item.dayRatio }}%</span>
				</div>
				<el-divider />
				<div>{{ item.averageName }}：{{ item.averageCounts }}</div>
			</div>
		</el-col>
	</el-row>
	<el-row class="el-row">
		<el-col :span="24">
			<div class="grid-content grid-content-visits bg-purple" id="visits"></div>
		</el-col>
	</el-row>
	<el-row :gutter="20" class="el-row">
		<el-col :span="13">
			<div class="grid-content grid-content-hot-search bg-purple" id="hot-search"></div>
		</el-col>
		<el-col :span="11">
			<div class="grid-content grid-content-user-region bg-purple" id="user-region"></div>
		</el-col>
	</el-row>
</template>

<script setup>
	import * as echarts from "echarts";
	import { onMounted, ref } from "vue";
	import VisitsOption from "./EChartsOptions/visits-option.js";
	import HotSearchOption from "./EChartsOptions/hot-search-option.js";
	import UserRegionOption from "./EChartsOptions/user-region-option.js";

	const dataList = ref([
		{
			title: "日活用户",
			counts: "1,563",
			weekRatio: 10,
			dayRatio: 10,
			averageName: "日均活跃用户",
			averageCounts: "423",
		},
		{
			title: "访问量",
			counts: "81,563",
			weekRatio: 15,
			dayRatio: 12,
			averageName: "日均访问量",
			averageCounts: "2,423",
		},
		{
			title: "访问IP",
			counts: "2,213",
			weekRatio: 6,
			dayRatio: 8,
			averageName: "平均IP数",
			averageCounts: "1,513",
		},
		{
			title: "新增用户",
			counts: "78",
			weekRatio: 5,
			dayRatio: 7,
			averageName: "平均新增",
			averageCounts: "50",
		},
	]);

	onMounted(() => {
		const visitsChart = echarts.init(document.getElementById("visits"));
		visitsChart.setOption(VisitsOption);

		const hotSearchChart = echarts.init(document.getElementById("hot-search"));
		hotSearchChart.setOption(HotSearchOption);

		const UserRegionChart = echarts.init(document.getElementById("user-region"));
		UserRegionChart.setOption(UserRegionOption);

		window.addEventListener("resize", function () {
			visitsChart.resize();
			hotSearchChart.resize();
		});
	});
</script>

<style lang="scss" scoped>
	.el-row {
		margin: 20px 0;
	}
	.grid-content {
		padding: 20px 0 0 20px;
		border-radius: 10px;
		min-height: 36px;
		height: 200px;
	}
	.grid-content-visits,
	.grid-content-hot-search,
	.grid-content-user-region {
		height: 300px;
	}
	.bg-purple {
		background: rgba(211, 220, 230, 0.5);
	}

	.daily-user-counts {
		padding: 20px;
		div:nth-child(1) {
			color: #888888;
			font-weight: 300;
			font-size: 18px;
		}
		h2:nth-child(2) {
			margin: 20px 0;
		}
		div:nth-child(3) {
			margin: 20px 0;
			font-size: 14px;
			position: relative;
			span:nth-child(1),
			span:nth-child(3) {
				margin-right: 15px;
			}
			span:nth-child(1)::after {
				content: "";
				width: 0;
				height: 0;
				border-top: 7px solid transparent;
				border-bottom: 7px solid #00b929;
				border-left: 7px solid transparent;
				border-right: 7px solid transparent;
				position: absolute;
				top: -1px;
			}
			span:nth-child(2) {
				margin-right: 25px;
			}
			span:nth-child(3)::after {
				content: "";
				width: 0;
				height: 0;
				border-bottom: 7px solid transparent;
				border-top: 7px solid #f31d00;
				border-left: 7px solid transparent;
				border-right: 7px solid transparent;
				position: absolute;
				top: 6px;
			}
		}
		.el-divider--horizontal {
			margin: 0 0 10px;
		}
		div:nth-child(5) {
			font-size: 14px;
		}
	}
	// ::v-deep
</style>
