<template>
	<div>
		<Form
			:selectOptions="selectOptions"
			:inputOptions="inputOptions"
			:formData="formData"
			@query-table-data="queryTableData"
		/>

		<Table :table-header="tableHeader" v-model:table-data="tableData" :needCheckbox="true"></Table>

		<div class="table-footer">
			<div>
				<el-button @click="batchFreeze">批量冻结</el-button>
				<el-button @click="batchThaw">批量启用</el-button>
			</div>
			<Pagination
				:pageNum="tableReqParam.pageNum"
				:pageSize="tableReqParam.pageSize"
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
	import { options as tableHeader } from "./options.js";
	import cancelELButtonFocus from "@/utils/cancel-el-button-focus.js";
	import { userApi } from "@/api";

	// 表单相关数据
	const inputOptions = [
		{
			label: "用户ID",
			prop: "userID",
			width: "100%",
		},
		{
			label: "用户名称",
			prop: "userName",
			width: "100%",
		},
		{ label: "用户账号", prop: "account", width: "100%" },
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
		account: "",
		accountStatus: "",
		lastLoginTime: "",
		userName: "",
		userID: "",
	});
	// 表单请求方法
	let queryTableData = function (param) {
		console.log(param);
	};

	// 表格的请求参数
	const tableReqParam = ref({
		query: "",
		pageNum: 1,
		pageSize: 2,
	});
	// 表格数据
	const tableData = ref([
		{
			userID: 123,
			userName: "DJ",
			account: "18122226666",
			sex: "男",
			registration_time: "2022-01-26 12：01",
			last_login_time: "2022-03-12 12：01",
			state: "正常",
		},
		{
			userID: 456,
			userName: "Peter",
			account: "13366665555",
			sex: "男",
			registration_time: "2022-02-16 12：01",
			last_login_time: "2022-03-10 12：01",
			state: "正常",
		},
		{
			userID: 789,
			userName: "LH",
			account: "13577776666",
			sex: "女",
			registration_time: "2022-01-26 12：01",
			last_login_time: "2022-03-02 12：01",
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
	const handleSelectionChange = function (selected) {
		selectedUserList.value = selected;
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

	// 分页器-总数
	let total = ref(0);
	total = computed(() => {
		return tableData.value.length;
	});

	const handleSizeChange = function (pageSize) {
		console.log(pageSize);
		tableReqParam.value.pageNum = 1;
		tableReqParam.value.pageSize = pageSize;
		initUserList();
	};
	const handleCurrentPageChange = function (pageNum) {
		console.log(pageNum);
		tableReqParam.value.pageNum = pageNum;
		initUserList();
	};
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
