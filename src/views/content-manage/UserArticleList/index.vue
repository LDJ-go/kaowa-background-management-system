<template>
	<!-- 指定文章详情路由组件的呈现位置 -->
	<template v-if="route.matched.length === 3">
		<router-view></router-view>
	</template>

	<!-- 用户文章列表页 -->
	<template v-else>
		<Form
			:selectOptions="selectOptions"
			:inputOptions="inputOptions"
			:formData="formData"
			@query-table-data="queryTableData"
		/>
		<Table :table-header="tableHeader" v-model:table-data="tableData"></Table>
		<div class="footer">
			<Pagination
				:pageNum="paginationParams.pageNum"
				:pageSize="paginationParams.pageSize"
				:total="total"
				@handle-size-change="handleSizeChange"
				@handle-current-page-change="handleCurrentPageChange"
			></Pagination>
		</div>
	</template>
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
	// 引入路由
	import { useRoute } from "vue-router";
	// 引入接口
	import { userArticleApi } from "@/api";

	// 路由信息
	const route = useRoute();

	// 表单相关数据
	const inputOptions = [
		{
			label: "文章标题",
			prop: "title",
			width: "100%",
		},
		{
			label: "发布时间",
			prop: "date",
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
			label: "文章状态",
			prop: "status",
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
		{
			label: "页签",
			prop: "category",
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
			label: "分区",
			prop: "zone",
			width: "100%",
			options: [
				{
					label: "青蛙乐园",
					value: "a",
				},
				{
					label: "牛蛙经验",
					value: "b",
				},
			],
		},
		{
			label: "排序",
			prop: "orderType",
			width: "100%",
			options: [
				{
					label: "从按照阅读数从高到低",
					value: "a",
				},
				{
					label: "从按照从按照阅读数从低到高",
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
		title: "", // 文章标题
		date: "", // 发布时间
		status: "", // 账号状态
		category: "", // 页签
		orderType: "", // 排序
		userName: "", // 用户名
		zone: "", // 分区
	});
	let paginationParams = ref({
		pageNum: 1,
		pageSize: 2,
	});
	// 表单请求方法
	let queryTableData = async function () {
		const res = await userArticleApi.searchUserPost(paginationParams.value, formData.value);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	};

	// 表格相关数据
	let tableData = ref([]);
	let total = ref(0);

	// 初始化表格数据，分页请求表格数据
	async function initTableData() {
		const res = await userArticleApi.getUserPostByPage(paginationParams.value);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	}
	initTableData();

	// 分页器
	function handleSizeChange(pageSize) {
		paginationParams.value.pageNum = 1;
		paginationParams.value.pageSize = pageSize;
		queryTableData();
	}
	function handleCurrentPageChange(pageNum) {
		paginationParams.value.pageNum = pageNum;
		queryTableData();
	}

	// 过滤函数-将接口返回的数字类型数据转成中文
	function filter() {
		tableData.value.map(function (value) {
			if (value.status == 0) {
				value.status = "下线";
			} else if (value.status == 1) {
				value.status = "上线";
			} else if (value.status == 2) {
				value.status = "草稿";
			}
			if (value.zone == 0) {
				value.zone = "青蛙乐园";
			} else if (value.zone == 1) {
				value.zone = "牛蛙经验";
			}
		});
	}
</script>

<style lang="scss">
	.footer {
		margin-top: 20px;
		display: flex;
		justify-content: right;
	}
</style>
