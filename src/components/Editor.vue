<template>
	<div>
		<el-input v-model="title" maxlength="64" placeholder="请输入文章标题" show-word-limit type="text" />
		<!-- 富文本编辑框 -->
		<div ref="editor" style="margin: 10px 0"></div>
		<el-input
			v-model="summary"
			maxlength="120"
			show-word-limit
			:autosize="{ minRows: 2, maxRows: 4 }"
			type="textarea"
			placeholder="请输入文章摘要（选填，默认为文章正文前25字）"
			style="margin-bottom: 10px"
		/>
		<!-- <button @click="syncHTML">同步内容</button> -->
	</div>
</template>

<script setup>
	import WangEditor from "wangeditor";
	import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

	// 标题
	const title = ref("");
	// 摘要
	const summary = ref("");

	const editor = ref();
	const content = reactive({
		html: "",
		text: "",
	});
	let instance;

	const syncHTML = () => {
		content.html = instance.txt.html();
		content.text = instance.txt.text();
		console.log(content);
	};

	onMounted(() => {
		instance = new WangEditor(editor.value);
		// 规定Base64的图片格式
		instance.config.uploadImgShowBase64 = true;
		// 隐藏网络图片，只能上传本地图片
		instance.config.showLinkImg = false;
		instance.config.zIndex = 500;

		// 编辑区域 blur（失焦）时触发的回调函数。
		// instance.config.onblur = function (newHtml) {
		// 	console.log("onblur", newHtml); // 获取最新的 html 内容
		// };
		// 创建
		instance.create();
	});

	onBeforeUnmount(() => {
		instance.destroy();
		instance = null;
	});
</script>

<style lang="scss">
	.w-e-toolbar .w-e-menu {
		// 取消全屏功能
		&:last-child {
			display: none;
		}
	}
</style>
