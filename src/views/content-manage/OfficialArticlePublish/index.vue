<template>
	<Editor></Editor>

	<div class="flex">
		<Upload />
		<div class="link-container">
			<span>参考链接：</span>
			<el-input v-model="link" placeholder="请输入参考链接" />
		</div>
		<div class="label-container">
			<span>话题标签：</span>
			<el-input v-model="label" placeholder="请输入话题标签" />
		</div>
		<div class="publish-region">
			<span>发布区域：</span>
			<el-select v-model="region" placeholder="请选择发布区域">
				<el-option label="考研" value="postgraduate" />
				<el-option label="考公" value="civilServant" />
				<el-option label="就业" value="job" />
			</el-select>
		</div>
	</div>

	<div class="btn-container">
		<el-button @click="save">保存为草稿</el-button>
		<el-button @click="reset">重置</el-button>
		<el-button @click="publish">发布</el-button>
	</div>
</template>

<script setup>
	import Editor from "@/components/Editor.vue";
	import Upload from "@/components/Upload.vue";
	import { ref } from "vue";

	let region = ref("");
</script>

<style lang="scss">
	.flex {
		display: flex;
		.link-container {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-left: 50px;
		}
		.label-container {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-left: 20px;
		}
		.publish-region {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-left: 20px;
		}
		span {
			font-size: 15px;
			margin-bottom: 10px;
		}
	}
	.btn-container {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
	}
</style>
