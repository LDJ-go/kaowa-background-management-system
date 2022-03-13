<template>
	<div>
		<el-table
			ref="multipleTableRef"
			:data="tableList"
			style="width: 100%"
			@selection-change="handleSelectionChange"
			:header-cell-style="{ backgroundColor: '#D6F2CC' }"
			border="true"
			highlight-current-row
		>
			<el-table-column type="selection" width="55" align="center" v-if="props.needCheckbox" />
			<el-table-column
				:width="item.width"
				:prop="item.prop"
				:label="item.label"
				v-for="(item, index) in props.tableHeader"
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
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-OAL'">
					<div class="operation">
						<span @click="toggleFix(row)">编辑</span>
						<span @click="toggleFix(row)">上线</span>
						<span @click="toggleFix(row)">查看</span>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
	import { ref, defineProps } from "vue";

	// props
	const props = defineProps({
		tableHeader: {
			required: true,
		},
		tableData: {
			default: [],
			require: true,
		},
		needCheckbox: { default: false },
	});

	// 表格的请求表单数据
	const tableForm = ref({
		query: "",
		pagenum: 1,
		pagesize: 2,
	});

	// 表格数据
	// const tableList = ref(props.tableData.value);

	let tableList = ref([
		{
			tag: "考研",
			articleTitle: "132",
			publish_time: "2022.03.13",
			visits: 123,
			comments: 256,
			thumbs: 200,
			shares: 88,
			collections: 66,
			state: "已上线",
		},
	]);

	// 初始化表格数据
	const initUserList = function () {
		console.log("调用接口请求数据 -> 进行渲染");
		// TODO 根据tableForm发送请求
	};

	// 筛选表格中的数据
	const handleTableList = function (data) {
		tableList.value = data;
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
		border-top: 0px solid #000;
	}

	// .el-table__empty-block {
	// 	border-left: 0.5px solid black;
	// 	border-top: 0.5px solid black;
	// }
	.el-table__body-wrapper {
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
