<template>
	<Form
		:selectOptions="selectOptions"
		:inputOptions="inputOptions"
		:formData="formData"
		:needAdd="true"
		@add-category="addCategory"
		@query-table-data="queryTableData"
	/>
	<Table :table-header="tableHeader" v-model:table-data="tableData" @edit-category="editCategory"></Table>
	<div class="footer">
		<Pagination
			:pageNum="paginationParams.pageNum"
			:pageSize="paginationParams.pageSize"
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
	import { categoryApi } from "@/api/index.js";

	// 路由信息
	const route = useRoute();

	// 表单相关数据
	const inputOptions = [
		{
			label: "页签名称",
			prop: "categoryName",
			width: "100%",
		},
	];
	const selectOptions = [
		{
			label: "状态",
			prop: "status",
			width: "100%",
			options: [
				{
					label: "已上线",
					value: 1,
				},
				{
					label: "已下线",
					value: 2,
				},
				{
					label: "全部",
					value: null,
				},
			],
		},
		{
			label: "分区名称",
			prop: "areaId",
			width: "100%",
			options: [
				{
					label: "青蛙乐园",
					value: 1,
				},
				{
					label: "牛蛙经验",
					value: 2,
				},
				{
					label: "蝌学备考",
					value: 3,
				},
			],
		},
	];
	let formData = ref({
		areaId: "",
		status: "",
		categoryName: "",
	});
	// 表单请求方法
	let queryTableData = async function () {
		const res = await categoryApi.searchCategory(paginationParams.value, formData.value);
		// console.log(res);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	};

	let tableData = ref([]);
	let paginationParams = ref({ pageNum: 1, pageSize: 5 });
	let total = ref(0);

	// 初始化表格数据
	async function initTableData() {
		const res = await categoryApi.getCategoryList(paginationParams.value);
		// console.log(res.data.list);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	}
	initTableData();

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

	// 新增页签
	const dialogTableVisible = ref(false);
	const dialogTitle = ref("");
	const dialogTableValue = ref({});
	function addCategory() {
		dialogTitle.value = "添加页签";
		dialogTableValue.value = {};
		dialogTableVisible.value = true;
	}
	// 编辑页签
	function editCategory(item) {
		console.log(item);
	}

	// 过滤函数-将接口返回的数字类型数据转成中文
	function filter() {
		tableData.value.map(function (value) {
			if (value.is_delete) {
				value.is_delete = "已下线";
			} else {
				value.is_delete = "已上线";
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
