<template>
	<Form
		:selectOptions="selectOptions"
		:inputOptions="inputOptions"
		:formData="formData"
		@query-table-data="queryTableData"
	/>
	<Table :table-header="tableHeader" v-model:table-data="tableData"></Table>
	<div class="footer">
		<Pagination
			:pageNum="tableReqParam.pageNum"
			:pageSize="tableReqParam.pageSize"
			:total="total"
			@handle-size-change="handleSizeChange"
			@handle-current-page-change="handleCurrentPageChange"
		></Pagination>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	// 引入表单组件
	import Form from "@/components/Form";
	// 引入表格组件
	import Table from "@/components/Table";
	// 引入分页器组件
	import Pagination from "@/components/Pagination.vue";
	// 引入表头行数据
	import tableHeader from "./table-header";

	// 表单相关数据
	const inputOptions = [
		{
			label: "文章标题",
			prop: "articleTitle",
			width: "100%",
		},
		{
			label: "发布时间",
			prop: "publishTime",
			width: "100%",
		},
	];
	const selectOptions = [
		{
			label: "文章状态",
			prop: "articleState",
			width: "100%",
			options: [
				{
					label: "已上线",
					value: "online",
				},
				{
					label: "已下线",
					value: "offline",
				},
				{
					label: "草稿",
					value: "draft",
				},
				{
					label: "全部",
					value: "all",
				},
			],
		},
		{
			label: "页签",
			prop: "tag",
			width: "100%",
			options: [
				{
					label: "考公",
					value: "civilServant",
				},
				{
					label: "考研",
					value: "postgraduate",
				},
				{
					label: "就业",
					value: "job",
				},
				{
					label: "全部",
					value: "all",
				},
			],
		},
		{
			label: "排序",
			prop: "sort",
			width: "100%",
			options: [
				{
					label: "从按照阅读数从高到低",
					value: "a",
				},
				{
					label: "从按照阅读数从低到高",
					value: "b",
				},
				{
					label: "从按照发布时间从近至远",
					value: "c",
				},
				{
					label: "从按照发布时间从远至今",
					value: "d",
				},
			],
		},
	];
	let formData = ref({
		articleTitle: "",
		publishTime: "",
		articleState: "",
		tag: "",
		sort: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	let tableData = ref([]);
	let tableReqParam = ref({});
	let total = ref(0);

	// 初始化表格数据
	function initTableData() {
		tableData.value = [
			{
				tag: "考研",
				articleTitle: "考研必看宝典",
				publish_time: "2022.03.13",
				visits: 123,
				comments: 256,
				thumbs: 200,
				shares: 88,
				collections: 66,
				state: "已上线",
			},
		];
		tableReqParam.value = {
			pageNum: 1,
			pageSize: 5,
		};
		total.value = tableData.value.length;
	}
	initTableData();

	// 根据表单查询表格数据
	function queryData() {}

	function handleSizeChange(pageSize) {
		console.log("asd");
	}

	function handleCurrentPageChange(pageNum) {
		console.log("zxc");
	}
</script>

<style lang="scss">
	.footer {
		margin-top: 20px;
		display: flex;
		justify-content: right;
	}
</style>
