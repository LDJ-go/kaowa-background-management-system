<template>
	<div>
		<Form @handle-table-data="handleTableData" />
		<!-- <el-table
			ref="multipleTableRef"
			:data="tableData"
			style="width: 100%"
			@selection-change="handleSelectionChange"
			:header-cell-style="{ backgroundColor: '#D6F2CC' }"
			border="true"
			highlight-current-row
		>
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column
				:width="item.width"
				:prop="item.prop"
				:label="item.label"
				v-for="(item, index) in options"
				:key="index"
				show-overflow-tooltip
				resizable="true"
				align="center"
			>
				<template v-slot="{ row }" v-if="item.prop === 'operation'">
					<div class="operation">
						<span @click="toggleFix(row)">冻结</span>
						<span @click="toggleFix(row)">查看</span>
					</div>
				</template>
			</el-table-column>
		</el-table> -->
		<Table :table-header="options" :table-data="tableData" :needCheckbox="true"></Table>

		<div class="table-footer">
			<div>
				<el-button @click="batchFreeze">批量冻结</el-button>
				<el-button @click="batchThaw">批量启用</el-button>
			</div>
			<el-pagination
				v-model:currentPage="tableForm.pagenum"
				v-model:page-size="tableForm.pagesize"
				:page-sizes="[2, 5, 10, 15]"
				:small="small"
				:background="true"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentPageChange"
				class="pagination"
			></el-pagination>
		</div>
	</div>
</template>

<script setup>
	import Form from "./form.vue";
	import { ref, computed } from "vue";
	import { ElMessage } from "element-plus";
	import Table from "@/components/Table";
	import { options } from "./options";
	import cancelELButtonFocus from "@/utils/cancel-el-button-focus.js";

	// 表格的请求表单数据
	const tableForm = ref({
		query: "",
		pagenum: 1,
		pagesize: 2,
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
		// TODO 根据tableForm发送请求
	};

	// 筛选表格中的数据
	const handleTableData = function (data) {
		tableData.value = data;
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
		console.log("asd");
		return tableData.value.length;
	});

	const handleSizeChange = function (pageSize) {
		tableForm.value.pagenum = 1;
		tableForm.value.pagesize = pageSize;
		initUserList();
	};
	const handleCurrentPageChange = function (pageNum) {
		tableForm.value.pagenum = pageNum;
		initUserList();
	};
</script>

<style lang="scss">
	$bgColor: #d6f2cc;

	.container {
		background-color: #f6f6f6;
	}

	.el-table th {
		color: rgb(70, 69, 69);
		border: 0.5px solid black;
	}

	.el-table td {
		border: 0.5px solid black;
	}

	.el-table__empty-block {
		border-left: 0.5px solid black;
		border-top: 0.5px solid black;
	}

	.el-table {
		// color: black;
		border: 0.5px solid #000;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: $bgColor;
		color: gray;
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
