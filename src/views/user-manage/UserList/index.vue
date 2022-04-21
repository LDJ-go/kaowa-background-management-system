<template>
	<div>
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
			@toggle-freeze="toggleFreeze"
		></Table>

		<div class="table-footer">
			<div>
				<el-button @click="toggleBatchFreeze($event, 0)">批量冻结</el-button>
				<el-button @click="toggleBatchFreeze($event, 1)">批量启用</el-button>
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
	import { ElMessage, ElMessageBox } from "element-plus";
	import Table from "@/components/Table";
	import Pagination from "@/components/Pagination.vue";
	import { options as tableHeader } from "./options.js";
	import cancelELButtonFocus from "@/utils/cancel-el-button-focus.js";
	import { userApi } from "@/api";

	// 表单相关数据
	const inputOptions = [
		{
			label: "用户ID",
			prop: "id",
			width: "100%",
		},
		{
			label: "用户名称",
			prop: "nickName",
			width: "100%",
		},
		{ label: "用户账号", prop: "account", width: "100%" },
	];
	const selectOptions = [
		{
			label: "最近登陆时间",
			prop: "loginTime",
			width: "100%",
			options: [
				{
					label: "最近一周",
					value: 0,
				},
				{
					label: "最近一月",
					value: 1,
				},
				{
					label: "最近一年",
					value: 2,
				},
			],
		},
		{
			label: "账号状态",
			prop: "freeze",
			width: "100%",
			options: [
				{
					label: "全部",
					value: null,
				},
				{
					label: "正常",
					value: false,
				},
				{
					label: "冻结",
					value: true,
				},
			],
		},
	];
	let formData = ref({
		id: "",
		freeze: "", //true是冻结、false是正常、null是全部
		loginTime: "",
		nickName: "",
		phone: "",
	});
	// 表单请求方法
	let queryTableData = async function () {
		if (!formData.value.id && !formData.value.freeze && !formData.value.nickName && !formData.value.phone) {
			ElMessage({
				type: "warning",
				message: "请输入正确的参数",
			});
		}
		const res = await userApi.searchUser(tableReqParam.value, formData.value);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	};

	// 表格的请求参数
	const tableReqParam = ref({
		pageNum: 1,
		pageSize: 5,
	});
	// 表格数据
	const tableData = ref([]);

	// 多选选中的数据
	let selectedUserList = ref([]);
	const handleSelectionChange = function (selected) {
		selectedUserList.value = selected;
	};

	// 冻结或启用用户
	const toggleFreeze = function (id, type) {
		ElMessageBox.confirm(type ? "确认启用该用户？" : "确认冻结该用户？", "提示", {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				const res = await userApi.toggleFreezeUser({
					idList: id,
					type,
				});
				ElMessage({
					message: type ? "启用成功" : "冻结成功",
					type: "success",
				});
				//刷新页面
				if (!formData.value.id && !formData.value.freeze && !formData.value.nickName && !formData.value.phone) {
					initUserList();
				} else {
					queryTableData();
				}
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消",
				});
			});
	};

	// 批量冻结或启用
	const toggleBatchFreeze = function (event, type) {
		ElMessageBox.confirm(type ? "确认启用这批用户？" : "确认冻结这批用户？", "提示", {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				let selectUserIdList = selectedUserList.value.map((item) => {
					return item.id;
				});
				const res = await userApi.toggleFreezeUser({
					idList: selectUserIdList.toString(),
					type,
				});
				ElMessage({
					message: type ? "批量启用成功" : "批量冻结成功",
					type: "success",
				});
				//刷新页面
				if (!formData.value.id && !formData.value.freeze && !formData.value.nickName && !formData.value.phone) {
					initUserList();
				} else {
					queryTableData();
				}
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消",
				});
			});

		cancelELButtonFocus(event);
	};

	// 分页器-总数
	let total = ref(0);

	const handleSizeChange = function (pageSize) {
		// console.log(pageSize);
		tableReqParam.value.pageNum = 1;
		tableReqParam.value.pageSize = pageSize;
		initUserList();
	};
	const handleCurrentPageChange = function (pageNum) {
		// console.log(pageNum);
		tableReqParam.value.pageNum = pageNum;
		initUserList();
	};

	// 初始化页面数据
	const initUserList = async function () {
		const res = await userApi.getUserList(tableReqParam.value);
		console.log(res.data.list);
		tableData.value = res.data.list;
		filter();
		total.value = res.data.total;
	};
	initUserList();

	// 过滤函数-将接口返回的数字类型数据转成中文
	function filter() {
		tableData.value.map(function (value) {
			if (value.gender == 0) {
				value.gender = "女";
			} else if (value.gender == 1) {
				value.gender = "男";
			}
			if (value.freeze) {
				value.freeze = "冻结";
			} else {
				value.freeze = "正常";
			}
		});
	}
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
