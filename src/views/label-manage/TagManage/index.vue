<template>
	<Form
		:selectOptions="selectOptions"
		:inputOptions="inputOptions"
		:formData="formData"
		:needAdd="true"
		@add-tag="addTag"
		@query-table-data="queryTableData"
	/>
	<Table :table-header="tableHeader" v-model:table-data="tableData" @edit-tag="editTag"></Table>
	<div class="footer">
		<Pagination
			:pageNum="tableReqParam.pageNum"
			:pageSize="tableReqParam.pageSize"
			:total="total"
			@handle-size-change="handleSizeChange"
			@handle-current-page-change="handleCurrentPageChange"
		></Pagination>
	</div>
	<Dialog
		v-model:dialogTableVisible="dialogTableVisible"
		:dialogTitle="dialogTitle"
		:dialogTableValue="dialogTableValue"
		v-if="dialogTableVisible"
		@initTableData="initTableData"
	/>
</template>

<script setup>
	import { ref } from "vue";
	// 引入表单组件
	import Form from "@/components/Form";
	// 引入表格组件
	import Table from "@/components/Table";
	// 引入分页器组件
	import Pagination from "@/components/Pagination.vue";
	// 引入对话框组件
	import Dialog from "./components/Dialog.vue";
	// 引入表头行数据
	import tableHeader from "./table-header";
	// 引入路由
	import { useRoute } from "vue-router";
	// 引入请求接口
	import { tagApi } from "@/api/index.js";

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
			prop: "state",
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
		tagName: "",
		state: "all",
		partitionName: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	let tableData = ref([]);
	let tableReqParam = ref({});
	let total = ref(0);

	// 初始化表格数据
	async function initTableData() {
		console.log(tagApi);
		const res = await tagApi.getAllCategory();
		console.log(res);
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

	// 新增页签
	const dialogTableVisible = ref(false);
	const dialogTitle = ref("");
	const dialogTableValue = ref({});
	function addTag() {
		dialogTitle.value = "添加页签";
		dialogTableValue.value = {};
		dialogTableVisible.value = true;
	}
	// 编辑页签
	function editTag(item) {
		console.log(item);
	}
</script>

<style lang="scss">
	.footer {
		margin-top: 20px;
		display: flex;
		justify-content: right;
	}
</style>
