<template>
	<!-- 指定文章详情路由组件的呈现位置 -->
	<template v-if="route.matched.length === 3">
		<router-view></router-view>
	</template>
	<!-- 文章列表页 -->
	<template v-else>
		<Form
			:selectOptions="selectOptions"
			:inputOptions="inputOptions"
			:formData="formData"
			needAdd="/carousel-manage/add-carousel"
			@query-table-data="queryTableData"
			@add-carousel="addCarousel"
		/>
		<Table :table-header="tableHeader" v-model:table-data="tableData" @delete-carousel="deleteCarousel"></Table>
		<div class="footer">
			<Pagination
				:pageNum="tableReqParams.pageNum"
				:pageSize="tableReqParams.pageSize"
				:total="total"
				@handle-size-change="handleSizeChange"
				@handle-current-page-change="handleCurrentPageChange"
			></Pagination>
		</div>
	</template>
</template>

<script setup>
	import { ref, watch } from "vue";
	// 引入表单组件
	import Form from "@/components/Form";
	// 引入表格组件
	import Table from "@/components/Table";
	// 引入分页器组件
	import Pagination from "@/components/Pagination.vue";
	// 引入表头行数据
	import tableHeader from "./table-header";
	// 引入路由
	import { useRouter, useRoute } from "vue-router";
	// 引入接口
	import { carouselApi } from "@/api";
	// 消息弹出框
	import { ElMessageBox, ElMessage } from "element-plus";

	// 路由信息
	const route = useRoute();
	// 路由操作
	const router = useRouter();

	watch(
		() => {
			return route.params.refresh;
		},
		() => {
			// 通过路由参数判断是否需要刷新页面
			if (route.params.refresh) {
				initTableData();
			}
		}
	);

	// 表单下拉框数据
	const selectOptions = [
		{
			label: "所属分区",
			prop: "kind",
			width: "100%",
			options: [
				{
					label: "青蛙乐园",
					value: "青蛙乐园",
				},
				{
					label: "牛蛙经验",
					value: "牛蛙经验",
				},
				{
					label: "蝌学备考",
					value: "蝌学备考",
				},
			],
		},
	];
	// 表单数据
	let formData = ref({
		kind: "",
	});
	// 表格请求数据
	let tableReqParams = ref({
		kind: "", // 空字符串即全部
		pageNum: 1,
		pageSize: 2,
	});
	let total = ref(0);
	// 表格数据
	let tableData = ref([]);

	// 表单请求方法
	let queryTableData = function ({ kind }) {
		tableReqParams.value.kind = kind;
		initTableData();
	};

	// 新增
	const addCarousel = function () {
		router.push({
			name: "CarouselEdit",
		});
	};

	// 删除
	const deleteCarousel = function (id) {
		ElMessageBox.confirm("确认删除？", "提醒", {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				await carouselApi.deleteCarousel(id);
				initTableData();
				ElMessage({
					type: "success",
					message: "删除成功",
				});
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消",
				});
			});
		// const res = await
	};

	// 初始化表格数据
	async function initTableData() {
		const res = await carouselApi.getCarousel({
			params: tableReqParams.value,
		});
		total.value = res.data.total;
		tableData.value = res.data.list;
	}
	initTableData();

	function handleSizeChange(pageSize) {
		tableReqParams.value.pageNum = 1;
		tableReqParams.value.pageSize = pageSize;
		initTableData();
	}

	function handleCurrentPageChange(pageNum) {
		tableReqParams.value.pageNum = pageNum;
		initTableData();
	}
</script>

<style lang="scss">
	.footer {
		margin-top: 20px;
		display: flex;
		justify-content: right;
	}
</style>
