<template>
	<!-- 指定文章详情路由组件的呈现位置 -->
	<template v-if="route.matched.length === 3">
		<router-view></router-view>
	</template>
	<!-- 文章列表页 -->
	<template v-else>
		<Form
			:selectOptions="selectOptions"
			:inputOptions="inputOptions"
			:formData="formData"
			:needPublishBtn="true"
			@query-table-data="queryTableData"
		/>
		<Table :table-header="tableHeader" v-model:table-data="tableData" @delete-article="deleteArticle"></Table>
		<div class="footer">
			<Pagination
				v-model:pageNum="paginationParams.pageNum"
				v-model:pageSize="paginationParams.pageSize"
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
	import { officialArticleApi } from "@/api";

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
	];
	const selectOptions = [
		{
			label: "文章状态",
			prop: "status",
			width: "100%",
			options: [
				{
					label: "已上线",
					value: "1",
				},
				{
					label: "已下线",
					value: "0",
				},
				{
					label: "草稿",
					value: "2",
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
			label: "排序",
			prop: "orderType",
			width: "100%",
			options: [
				{
					label: "按照阅读数从高到低",
					value: "0",
				},
				{
					label: "按照阅读数从低到高",
					value: "1",
				},
				{
					label: "按照发布时间从近至远",
					value: "2",
				},
				{
					label: "按照发布时间从远至今",
					value: "3",
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
	});
	let paginationParams = ref({
		pageNum: 1,
		pageSize: 5,
	});
	// 表单请求方法
	let queryTableData = async function () {
		const res = await officialArticleApi.searchOfficialArticle(paginationParams.value, formData.value);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	};

	let tableData = ref([]);
	let total = ref(0);

	// 初始化表格数据，分页请求表格数据
	async function initTableData() {
		const res = await officialArticleApi.getOfficialArticle(paginationParams.value);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	}
	initTableData();

	// 删除一条文章
	const deleteArticle = async function (examPostId, userId) {
		// TODO 改 UserID
		// const res = await officialArticleApi.deleteOfficialArticle(examPostId, "123");
	};

	// 分页器
	function handleSizeChange(pageSize) {
		// paginationParams.value.pageNum = 1;
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
