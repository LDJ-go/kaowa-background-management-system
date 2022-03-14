<template>
	<el-pagination
		v-model:currentPage="pageAbout.currentPage"
		v-model:page-size="pageAbout.pageSize"
		:page-sizes="[2, 5, 10, 15]"
		:small="small"
		:background="true"
		layout="total, sizes, prev, pager, next, jumper"
		:total="total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentPageChange"
		class="pagination"
	></el-pagination>
</template>

<script setup>
	import { defineEmits, defineProps, ref } from "vue";

	// props
	const props = defineProps({
		pageNum: {
			type: Number,
			required: true,
		},
		pageSize: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
	});

	const emit = defineEmits(["handle-size-change", "handle-current-page-change"]);

	const pageAbout = ref({
		currentPage: props.pageNum,
		pageSize: props.pageSize,
	});

	function handleSizeChange(pageSize) {
		emit("handle-size-change", pageSize);
	}

	function handleCurrentPageChange(pageNum) {
		emit("handle-current-page-change", pageNum);
	}
</script>

<style lang="scss">
	$bgColor: #d6f2cc;

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: $bgColor;
		color: gray;
	}
</style>
