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
			<div>
				<el-button @click="batchFreeze">批量冻结</el-button>
				<el-button @click="batchThaw">批量启用</el-button>
				<el-button>新增账户</el-button>
			</div>
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
			accountName: "admin",
			name: "admin",
			phoneNumber: "181xxxx6666",
			state: "正常",
		},
	]);

	// 初始化表格数据
	const initUserList = function () {
		console.log("调用接口请求数据 -> 进行渲染");
		// TODO 根据tableReqParam发送请求
	};

	// 多选选中的数据
	let selectedUserList = ref([]);
	const handleSelectionChange = function (data) {
		selectedUserList.value = data;
		// console.log(data);
	};

	// 冻结一条数据
	const freeze = function (data) {
		console.log(data);
	};

	// 批量冻结
	const batchFreeze = function (event) {
		for (let i = 0; i < selectedUserList.value.length; i++) {
			console.log(selectedUserList.value[i]);
		}
		ElMessage({
			message: "批量冻结成功",
			type: "success",
		});
		cancelELButtonFocus(event);
	};
	// 批量启用
	const batchThaw = function () {};

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
	.el-button:focus,
	.el-button:hover {
		color: $bgColor;
		border-color: $bgColor;
		background-color: $bgColor;
		color: #000;
	}

	.table-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
</style>
