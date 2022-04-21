<!-- 用户文章列表页 -->
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
		{
			label: "用户名称",
			prop: "userName",
			width: "100%",
		},
	];
	const selectOptions = [
		{
			label: "评论状态",
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
					label: "全部",
					value: "all",
				},
			],
		},
	];
	let formData = ref({
		partition: "",
		categoryName: "",
		authorNickName: "",
		totalComments: "",
		commentsNumber: "",
		commentState: "",
		articleTitle: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	// 表格相关数据
	let tableData = ref([]);
	let tableReqParam = ref({
		pageNum: 1,
		pageSize: 5,
	});
	let total = ref(0);

	// 初始化表格数据，分页请求表格数据
	async function initTableData() {
		tableData.value = [
			{
				zone: "青蛙乐园",
				categoryName: "考研",
				title: "考研必看宝典",
				authorNickName: "一路向北",
				commentCount: "452",
				fansCommentCount: "55",
				status: "正常",
			},
			{
				zone: "青蛙乐园",
				categoryName: "考公",
				title: "考公必看宝典",
				authorNickName: "Peter",
				commentCount: "452",
				fansCommentCount: "45",
				status: "正常",
			},
			{
				zone: "牛蛙经验",
				categoryName: "四六级",
				title: "四六级必看宝典",
				authorNickName: "十六",
				commentCount: "662",
				fansCommentCount: "65",
				status: "正常",
			},
		];
		total.value = 3;
	}
	initTableData();

	// 分页器
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
