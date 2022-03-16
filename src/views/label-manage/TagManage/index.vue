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
			:needAdd="true"
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

	// 路由信息
	const route = useRoute();

	// 表单相关数据
	const inputOptions = [
		{
			label: "页签名称",
			prop: "tagName",
			width: "100%",
		},
	];
	const selectOptions = [
		{
			label: "状态",
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
			label: "分区名称",
			prop: "partitionName",
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
				{
					label: "蝌学备考",
					value: "c",
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

	let tableData = ref([]);
	let tableReqParam = ref({});
	let total = ref(0);

	// 初始化表格数据
	function initTableData() {
		tableData.value = [
			{
				partition: "青蛙乐园",
				tag: "考研",
				contentTotal: 8888,
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
