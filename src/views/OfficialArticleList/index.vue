<template>
	<Table :table-header="tableHeader" :table-data="tableData"></Table>
</template>

<script setup>
	import { ref } from "vue";
	// 引入表格组件
	import Table from "@/components/Table";
	// 引入表头行数据
	import tableHeader from "./table-header";

	const tableData = ref([
		{
			tag: "考研",
			articleTitle: "",
			publish_time: "2022.03.13",
			visits: 123,
			comments: 256,
			thumbs: 200,
			shares: 88,
			collections: 66,
			state: "已上线",
		},
	]);
</script>

<style lang="scss"></style>
