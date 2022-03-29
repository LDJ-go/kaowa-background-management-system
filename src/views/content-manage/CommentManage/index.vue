<template>
	<Form
		:selectOptions="selectOptions"
		:inputOptions="inputOptions"
		:formData="formData"
		@query-table-data="queryTableData"
	/>
	<Table :table-header="tableHeader" v-model:table-data="tableData" @delete-article="deleteArticle"></Table>
	<div class="footer">
		<Pagination
			:pageNum="paginationParams.pageNum"
			:pageSize="paginationParams.pageSize"
			:total="total"
			@handle-size-change="handleSizeChange"
			@handle-current-page-change="handleCurrentPageChange"
		></Pagination>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	// 引入表单组件
	import Form from "@/components/Form";
	// 引入表格组件
	import Table from "@/components/Table";
	// 引入分页器组件
	import Pagination from "@/components/Pagination.vue";
	// 引入表头行数据
	import tableHeader from "./table-header";

	// 表单相关数据
	const inputOptions = [
		{
			label: "文章标题",
			prop: "title",
			width: "100%",
		},
		{
			label: "发布时间",
			prop: "date",
			width: "100%",
		},
		{
			label: "用户名称",
			prop: "userName",
			width: "100%",
		},
	];
	const selectOptions = [
		{
			label: "文章状态",
			prop: "status",
			width: "100%",
			options: [
				{
					label: "已上线",
					value: "1",
				},
				{
					label: "已下线",
					value: "0",
				},
				{
					label: "草稿",
					value: "2",
				},
			],
		},
	];
	let formData = ref({
		title: "", // 文章标题
		date: "", // 发布时间
		status: "", // 账号状态
		category: "", // 页签
		orderType: "", // 排序
		userName: "", // 用户名
		zone: "", // 分区
	});
	let paginationParams = ref({
		pageNum: 1,
		pageSize: 5,
	});
	// 表单请求方法
	let queryTableData = async function () {};

	// 表格相关数据
	let tableData = ref([]);
	let total = ref(0);

	// 分页器
	function handleSizeChange(pageSize) {
		// paginationParams.value.pageNum = 1;
		paginationParams.value.pageSize = pageSize;
		queryTableData();
	}
	function handleCurrentPageChange(pageNum) {
		paginationParams.value.pageNum = pageNum;
		queryTableData();
	}
</script>

<style lang="scss"></style>
