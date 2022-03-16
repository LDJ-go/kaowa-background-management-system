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
			needAdd="/carousel-manage/add-carousel"
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
	const selectOptions = [
		{
			label: "所属分区",
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
				{
					label: "蝌学备考",
					value: "c",
				},
			],
		},
	];
	let formData = ref({
		partition: "",
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
				carousel: "https://p3.itc.cn/q_70/images03/20210424/18331e57af2743db9d8245a884218ef8.jpeg",
				partition: "青蛙乐园",
				linkAddress: "www.baidu.com",
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
