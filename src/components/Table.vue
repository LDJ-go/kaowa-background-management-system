<template>
	<div>
		<el-table
			ref="multipleTableRef"
			:data="tableData"
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
				<template v-slot="{ row }" v-if="item.prop === 'operation-UL'">
					<div class="operation">
						<span @click="toggleFix(row)">冻结</span>
						<span @click="toggleFix(row)">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-OAL'">
					<div class="operation">
						<span @click="toggleFix(row)">编辑</span>
						<span @click="toggleFix(row)">上线</span>
						<span @click="routerToDetail(row, '/official-article-list/official-article-detail')">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-UAL'">
					<div class="operation">
						<span @click="toggleFix(row)">上线</span>
						<span @click="routerToDetail(row, '/user-article-list/user-article-detail')">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-AE'">
					<div class="operation">
						<span @click="toggleFix(row)">上线</span>
						<span @click="toggleFix(row)">下线</span>
						<span @click="toggleFix(row)">删除</span>
						<span @click="routerToDetail(row, '/user-article-list/user-article-detail')">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-TM'">
					<div class="operation">
						<span @click="toggleFix(row)">上线</span>
						<span @click="toggleFix(row)">下线</span>
						<span @click="toggleFix(row)">编辑</span>
					</div>
				</template>
				<!-- 轮播图管理 -->
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-CM'">
					<div class="operation">
						<span @click="toggleFix(row)">删除</span>
						<span @click="toggleFix(row)">编辑</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'carousel'">
					<div>
						<img :src="row.carousel" alt="" height="100" />
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
	import { ref, defineProps } from "vue";
	import { useRouter } from "vue-router";

	// props
	const props = defineProps({
		tableHeader: {
			required: true,
		},
		// 表格数据
		tableData: {
			type: Array,
			default: () => [],
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

	// 初始化表格数据
	const initUserList = function () {
		console.log("调用接口请求数据 -> 进行渲染");
		// TODO 根据tableForm发送请求
	};

	// 筛选表格中的数据
	const handletableData = function (data) {
		// tableData.value = data;
	};

	// 路由跳转到文章详情页
	const router = useRouter();
	const routerToDetail = function (data, path) {
		router.push(path);
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
