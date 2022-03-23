<template>
	<el-input v-model="title" maxlength="64" placeholder="请输入文章标题" show-word-limit type="text" />

	<!-- <Editor @handle-editor-data="handleEditorData" v-model="editorHtml"></Editor> -->
	<Editor v-model="editorHtml"></Editor>

	<el-input
		v-model="summary"
		maxlength="120"
		show-word-limit
		:autosize="{ minRows: 3, maxRows: 4 }"
		type="textarea"
		placeholder="请输入文章摘要（选填，默认为文章正文前25字）"
		style="margin-bottom: 10px"
	/>

	<div class="flex">
		<Upload @handle-cover-img-url="handleCoverImgUrl" @remove-cover-img-url="removeCoverImgUrl" />
		<div class="elInput-container">
			<span>参考链接：</span>

			<el-input
				v-for="(item, index) in linkList"
				:key="index"
				v-model="linkList[index].link"
				placeholder="请输入参考链接"
				class="input-link"
			/>
			<div class="btn-container">
				<el-button plain class="add-link-btn" size="large" :icon="Plus" @click="addLink"></el-button>
				<el-button plain class="add-link-btn" size="large" :icon="Minus" @click="removeLink"></el-button>
			</div>
		</div>
		<div class="elInput-container">
			<span>话题标签：</span>
			<el-input v-model="label" placeholder="请输入话题标签" />
		</div>
		<div class="elInput-container">
			<span>发布区域：</span>
			<el-select v-model="region" placeholder="请选择发布区域">
				<el-option label="考研" value="postgraduate" />
				<el-option label="考公" value="civilServant" />
				<el-option label="就业" value="job" />
			</el-select>
		</div>
	</div>

	<div class="btn-container">
		<el-button @click="save">更改</el-button>
		<el-button @click="reset">重置</el-button>
		<el-button @click="publish">发布</el-button>
	</div>
</template>

<script setup>
	import Editor from "@/components/Editor.vue";
	import Upload from "@/components/Upload.vue";
	import { ElMessage } from "element-plus";
	import { Plus, Minus } from "@element-plus/icons-vue";
	import { ref } from "vue";

	// 标题
	const title = ref("");
	// 编辑器内容
	const editorHtml = ref("");
	// 摘要
	const summary = ref("");
	// 封面图
	const coverUrl = ref("");

	// 参考链接
	const linkList = ref([{ link: "" }]);
	const addLink = function () {
		linkList.value.push({ link: "" });
	};
	const removeLink = function () {
		if (linkList.value.length > 1) linkList.value.pop();
	};

	//发布区域
	const region = ref("");

	// 接收封面图
	const handleCoverImgUrl = function (url) {
		coverUrl.value = url;
	};
	// 删除封面图
	const removeCoverImgUrl = function (url) {
		coverUrl.value = url;
	};

	// 保存为草稿
	const save = function () {
		console.log(linkList.value);
	};

	// 重置
	const reset = function () {
		title.value = "";
	};

	// 发布
	const publish = function () {
		if (title.value == "" || editorHtml.value == "") {
			ElMessage({
				message: "标题或内容不能为空！",
				type: "error",
			});
			return;
		}
	};
</script>

<style lang="scss">
	.flex {
		display: flex;
		.elInput-container {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-left: 20px;

			.add-link-btn {
				height: 20px;
				// margin-top: 5px;
				span {
					margin: 0;
				}
			}
			.input-link {
				margin-bottom: 5px;
			}
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
