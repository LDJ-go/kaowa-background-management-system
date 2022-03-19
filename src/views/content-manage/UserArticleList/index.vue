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
				:pageNum="tableReqParam.pageNum"
				:pageSize="tableReqParam.pageSize"
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
			label: "分区",
			prop: "partition",
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
			prop: "sort",
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
		articleTitle: "",
		publishTime: "",
		userName: "",
		articleState: "",
		tag: "",
		sort: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	// 表格相关数据
	let tableData = ref([]);
	let tableReqParam = ref({
		pageNum: 1,
		pageSize: 2,
	});
	let total = ref(0);

	// 初始化表格数据，分页请求表格数据
	async function initTableData() {
		const res = await userArticleApi.getUserPostByPage(tableReqParam.value);
		console.log(res);
		tableData.value = res.data.list;
		total.value = res.data.total;
		/* [
			{
				partition: "青蛙乐园",
				tag: "考研",
				articleTitle: "张三丰的高数小技巧",
				userName: "张三丰",
				publish_time: "2022.03.06",
				visits: 123,
				quotes: 16,
				comments: 256,
				shares: 88,
				collections: 66,
				state: "已上线",
			},
		]; */
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
