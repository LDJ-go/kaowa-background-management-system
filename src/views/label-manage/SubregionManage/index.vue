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
			:pageNum="paginationParams.pageNum"
			:pageSize="paginationParams.pageSize"
			:total="total"
			@handle-size-change="handleSizeChange"
			@handle-current-page-change="handleCurrentPageChange"
		></Pagination>
	</div>
	<!-- <Dialog
		v-model:dialogTableVisible="dialogTableVisible"
		:dialogTitle="dialogTitle"
		:dialogTableValue="dialogTableValue"
		v-if="dialogTableVisible"
		@initTableData="initTableData"
	/> -->
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
	// import Dialog from "./components/Dialog.vue";
	// 引入表头行数据
	import tableHeader from "./table-header";
	// 引入路由
	import { useRoute } from "vue-router";
	// 引入请求接口
	import { subregionApi } from "@/api/index.js";

	// 路由信息
	const route = useRoute();

	// 表单相关数据
	const inputOptions = [
		{
			label: "分区名称",
			prop: "name",
			width: "100%",
		},
	];
	const selectOptions = [
		{
			label: "状态",
			prop: "isDelete",
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
		tagName: "",
		state: "all",
		partitionName: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	// 表格数据
	let tableData = ref([]);

	// 初始化表格数据
	async function initTableData() {
		const res = await subregionApi.getAllSubregion();
		tableData.value = res.data;
		filter();
		total.value = res.data.length;
	}
	initTableData();

	// 分页器
	let total = ref(0);
	let paginationParams = ref({
		pageNum: 1,
		pageSize: 5,
	});
	const handleSizeChange = function (pageSize) {
		// paginationParams.value.pageNum = 1;
		paginationParams.value.pageSize = pageSize;
		queryTableData();
	};
	const handleCurrentPageChange = function (pageNum) {
		paginationParams.value.pageNum = pageNum;
		queryTableData();
	};

	// 新增页签
	// const dialogTableVisible = ref(false);
	// const dialogTitle = ref("");
	// const dialogTableValue = ref({});
	// function addTag() {
	// 	dialogTitle.value = "添加页签";
	// 	dialogTableValue.value = {};
	// 	dialogTableVisible.value = true;
	// }
	// // 编辑页签
	// function editTag(item) {
	// 	console.log(item);
	// }

	// 过滤函数-将接口返回的数字类型数据转成中文
	function filter() {
		tableData.value.map(function (value) {
			if (value.isDelete) {
				value.isDelete = "已下线";
			} else {
				value.isDelete = "已上线";
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
