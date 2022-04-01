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
				<template v-slot="{ row }" v-if="item.prop === 'operation-UL' || item.prop === 'operation-OL'">
					<!-- 用户列表 机构号列表 -->
					<div class="operation">
						<span v-if="row.freeze == '正常'" @click="toggleFreeze(row.id, 0)">冻结</span>
						<span v-if="row.freeze == '冻结'" @click="toggleFreeze(row.id, 1)">启用</span>
						<span @click="toggleFix(row)">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-OAL'">
					<!-- 官方文章管理 -->
					<div class="operation">
						<span @click="routerToEdit(row, 'OfficialArticleEdit')">编辑</span>
						<span @click="toggleFix(row)">
							{{ row.status == "下线" || row.status == "草稿" ? "上线" : "" }}
							{{ row.status == "上线" ? "下线" : "" }}
						</span>
						<span @click="deleteArticle(row)">删除</span>
						<span @click="routerToDetail(row, 'OfficialArticleDetail')">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-COM'">
					<!-- 评论管理 -->
					<div class="operation">
						<span @click="toggleFix(row)" v-if="item.commentState == '已启用'">停用</span>
						<span @click="toggleFix(row)">启动</span>
						<span @click="routerToDetail(row, '/official-article-list/official-article-detail')">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-UAL'">
					<!-- 用户文章管理 -->
					<div class="operation">
						<span @click="toggleFix(row)">
							{{ row.status == "下线" || row.status == "草稿" ? "上线" : "" }}
							{{ row.status == "上线" ? "下线" : "" }}
						</span>
						<span @click="deleteArticle(row)">删除</span>
						<span @click="routerToDetail(row, 'UserArticleDetail')">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-AE'">
					<!-- 牛蛙内容审核 -->
					<div class="operation">
						<span @click="toggleFix(row)">上线</span>
						<span @click="toggleFix(row)">下线</span>
						<span @click="toggleFix(row)">删除</span>
						<span @click="routerToDetail(row, '/user-article-list/user-article-detail')">查看</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-TM'">
					<!-- 页签管理 -->
					<div class="operation">
						<span @click="toggleFix(row)">上线</span>
						<span @click="toggleFix(row)">下线</span>
						<span @click="editTag(row)">编辑</span>
						<span @click="toggleFix(row)">上移</span>
						<span @click="toggleFix(row)">下移</span>
					</div>
				</template>

				<template v-slot="{ row }" v-else-if="item.prop === 'operation-CM'">
					<!-- 轮播图管理 -->
					<div class="operation">
						<span @click="deleteCarousel(row)">删除</span>
						<span @click="editCarousel(row)">编辑</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'imageUrl'">
					<!-- 展示图片 -->
					<div>
						<img :src="row.imageUrl" alt="" height="100" />
					</div>
				</template>

				<template v-slot="{ row }" v-else-if="item.prop === 'operation-PM'">
					<!-- 分区管理 -->
					<div class="operation">
						<span @click="toggleFix(row)">删除</span>
						<span @click="toggleFix(row)">编辑</span>
					</div>
				</template>

				<template v-slot="{ row }" v-else-if="item.prop === 'operation-AM'">
					<!-- 管理员账号管理 -->
					<div class="operation">
						<span @click="toggleFix(row)">删除</span>
						<span @click="toggleFix(row)">编辑</span>
					</div>
				</template>
				<template v-slot="{ row }" v-else-if="item.prop === 'operation-LM'">
					<!-- 日志管理 -->
					<div class="operation">
						<span @click="toggleFix(row)">查看</span>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
	import { ref, defineProps, defineEmits } from "vue";
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
	// emits
	const emits = defineEmits(["delete-article", "edit-tag", "delete-carousel", "selection-change", "toggleFreeze"]);
	// router
	const router = useRouter();

	// 多选框
	const handleSelectionChange = function (data) {
		emits("selection-change", data);
	};
	// 冻结用户
	const toggleFreeze = function (id, type) {
		emits("toggleFreeze", id, type);
	};

	// 文章管理
	const routerToDetail = function (data, routerName) {
		router.push({
			name: routerName,
			params: data,
		});
	};
	const deleteArticle = function ({ id }) {
		emits("delete-article", id);
	};
	const routerToEdit = function (row, routerName) {
		router.push({
			name: routerName,
			params: {
				articleInfo: JSON.stringify(row),
				articleEdit: true,
			},
		});
	};

	// 页签管理-编辑页签
	const editTag = function (row) {
		emits("edit-tag", row);
	};

	// 轮播图管理
	const editCarousel = function (row) {
		router.push({
			name: "CarouselEdit",
			params: {
				carousel: JSON.stringify(row),
			},
		});
	};
	const deleteCarousel = function ({ id }) {
		emits("delete-carousel", id);
	};
</script>

<style lang="scss" scoped>
	$bgColor: #d6f2cc;
	$tableBorderColor: #b9bbbe;

	.container {
		background-color: #f6f6f6;
	}

	::v-deep .el-table tr th {
		color: rgb(70, 69, 69);
		border: 0.5px solid $tableBorderColor;
	}

	::v-deep .el-table td {
		border: 0.5px solid $tableBorderColor;
	}

	// .el-table__empty-block {
	// 	border-left: 0.5px solid black;
	// 	border-top: 0.5px solid black;
	// }
	::v-deep .el-table__body-wrapper {
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
