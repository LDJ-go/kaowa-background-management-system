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
			label: "机构号ID",
			prop: "OrganizationID",
			width: "100%",
		},
		{
			label: "机构号名称",
			prop: "OrganizationName",
			width: "100%",
		},
		{ label: "手机号", prop: "phoneNumber", width: "100%" },
	];
	const selectOptions = [
		{
			label: "最近登陆时间",
			prop: "lastLoginTime",
			width: "100%",
			options: [
				{
					label: "最近一周",
					value: "last-week",
				},
				{
					label: "最近一月",
					value: "last-month",
				},
				{
					label: "最近一年",
					value: "last-year",
				},
			],
		},
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
		accountStatus: "",
		lastLoginTime: "",
		OrganizationName: "",
		OrganizationID: "",
		phoneNumber: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	// 表格数据
	const tableData = ref([
		{
			OrganizationID: 1001,
			OrganizationName: "考虫",
			phoneNumber: "xxxxxxxxxxx",
			registration_time: "2022-02-26 15：01",
			last_login_time: "2022-03-12 18：01",
			state: "正常",
		},
		{
			OrganizationID: 1002,
			OrganizationName: "新东方",
			phoneNumber: "xxxxxxxxxxx",
			registration_time: "2022-02-16 12：01",
			last_login_time: "2022-03-18 12：31",
			state: "正常",
		},
		{
			OrganizationID: 1003,
			OrganizationName: "高途",
			phoneNumber: "xxxxxxxxxxx",
			registration_time: "2022-02-06 22：01",
			last_login_time: "2022-03-24 12：51",
			state: "正常",
		},
		{
			OrganizationID: 1004,
			OrganizationName: "尚德机构",
			phoneNumber: "xxxxxxxxxxx",
			registration_time: "2022-02-06 08：15",
			last_login_time: "2022-03-24 14：01",
			state: "正常",
		},
		{
			OrganizationID: 1005,
			OrganizationName: "米堆学堂",
			phoneNumber: "xxxxxxxxxxx",
			registration_time: "2022-01-16 18：01",
			last_login_time: "2022-03-14 12：41",
			state: "正常",
		},
	]);

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

	// 初始化表格数据
	const initUserList = function () {
		console.log("调用接口请求数据 -> 进行渲染");
		total.value = 5;
		// TODO 根据tableReqParam发送请求
	};
	initUserList();
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f6f6f6;
	}

	.el-button:focus,
	.el-button:hover {
		color: $bgColor;
		border-color: $bgColor;
		background-color: $bgColor;
		color: #000;
	}

	.operation {
		color: #00bffc;
		display: flex;
		justify-content: space-around;
		span {
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}

	.table-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 16px;
	}
</style>
