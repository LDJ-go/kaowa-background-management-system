<template>
	<div>
		<!-- <Form @handle-table-data="handleTableData" /> -->
		<Form
			:selectOptions="selectOptions"
			:inputOptions="inputOptions"
			:formData="formData"
			@query-table-data="queryTableData"
		/>

		<Table
			:table-header="tableHeader"
			v-model:table-data="tableData"
			:needCheckbox="true"
			@selection-change="handleSelectionChange"
			@freeze="freeze"
		></Table>

		<div class="table-footer">
			<Pagination
				:pageNum="paginationParams.pageNum"
				:pageSize="paginationParams.pageSize"
				:total="total"
				@handle-size-change="handleSizeChange"
				@handle-current-page-change="handleCurrentPageChange"
			></Pagination>
		</div>
	</div>
</template>

<script setup>
	import Form from "@/components/Form";
	import { ref, computed } from "vue";
	import { ElMessage } from "element-plus";
	import Table from "@/components/Table";
	import Pagination from "@/components/Pagination.vue";
	import tableHeader from "./table-header.js";
	import cancelELButtonFocus from "@/utils/cancel-el-button-focus.js";

	// 表单相关数据
	const inputOptions = [
		{
			label: "账号名称",
			prop: "accountName",
			width: "100%",
		},
		{ label: "管理员姓名", prop: "name", width: "100%" },
	];
	const selectOptions = [
		{
			label: "账号状态",
			prop: "accountStatus",
			width: "100%",
			options: [
				{
					label: "全部",
					value: "all",
				},
				{
					label: "正常",
					value: "normal",
				},
				{
					label: "冻结",
					value: "freeze",
				},
			],
		},
	];
	let formData = ref({
		accountName: "",
		name: "",
		accountStatus: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	// 表格数据
	const tableData = ref([
		{
			logID: "1101",
			administratorsAccount: "201943333333",
			operationTime: "2022.03.25 19:23:14",
			operationType: "新增",
			operationDetail: "新增文章（ID 10011）",
		},
	]);

	// 初始化表格数据
	const initUserList = function () {
		console.log("调用接口请求数据 -> 进行渲染");
		// TODO 根据tableReqParam发送请求
	};

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
</script>

<style lang="scss" scoped>
	.table-footer {
		display: flex;
		justify-content: right;
		margin-top: 20px;
	}
</style>
