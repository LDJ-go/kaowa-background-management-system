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
		<Upload
			@handle-cover-img-url="handleCoverImgUrl"
			@remove-cover-img-url="removeCoverImgUrl"
			:imgUrl="titleImageUrl"
		/>
		<div class="elInput-container">
			<span>参考链接：</span>

			<el-input
				v-for="(item, index) in linkUrlList"
				:key="index"
				v-model="linkUrlList[index].url"
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
			<el-input v-model="tags" placeholder="请输入话题标签" />
		</div>
		<div class="elInput-container">
			<span>发布区域：</span>
			<el-select v-model="category" placeholder="请选择发布区域">
				<el-option label="考研" :value="1" />
				<el-option label="考公" :value="2" />
				<el-option label="就业" :value="3" />
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
	import { useRoute } from "vue-router";
	import { officialArticleApi } from "@/api";

	const route = useRoute();

	// 标题
	const title = ref("");
	// 编辑器内容
	const editorHtml = ref("");
	// 摘要
	const summary = ref("");
	// 封面图
	const titleImageUrl = ref("");

	// 参考链接
	const linkUrlList = ref([{ name: "", url: "" }]);
	const addLink = function () {
		linkUrlList.value.push({ name: "", url: "" });
	};
	const removeLink = function () {
		if (linkUrlList.value.length > 1) linkUrlList.value.pop();
	};

	// 话题标签
	const tags = ref("");
	//发布区域
	const category = ref("");

	// 接收封面图
	const handleCoverImgUrl = function (url) {
		titleImageUrl.value = url;
	};
	// 删除封面图
	const removeCoverImgUrl = function (url) {
		titleImageUrl.value = url;
	};

	// 初始化页面
	const articleDetail = ref({});
	const initArticleDetail = async function () {
		const res = await officialArticleApi.getOfficialArticleDetail(route.params.id);
		articleDetail.value = res.data;

		title.value = articleDetail.value.title;
		editorHtml.value = articleDetail.value.content;
		summary.value = articleDetail.value.summary;
		titleImageUrl.value = articleDetail.value.titleImageUrl;
		linkUrlList.value = articleDetail.value.linkUrlList;
		tags.value = articleDetail.value.tags;
		category.value = articleDetail.value.categoryId;
	};
	if (route.params.id != null || route.params.id != undefined) {
		// 如果路由参数不为空，则初始化-修改文章
		initArticleDetail();
	}

	// 保存为草稿
	const save = function () {
		console.log(typeof category.value);
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
