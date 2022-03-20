<template>
	<div>
		<!-- 富文本编辑框 -->
		<div ref="editor" style="margin: 10px 0"></div>
	</div>
</template>

<script setup>
	import WangEditor from "wangeditor";
	import { ref, reactive, onMounted, onBeforeUnmount, defineEmits } from "vue";

	const emits = defineEmits(["updata:moduleValue"]);

	const editor = ref();

	let instance;

	onMounted(() => {
		instance = new WangEditor(editor.value);
		// 规定Base64的图片格式
		instance.config.uploadImgShowBase64 = true;
		// 隐藏网络图片，只能上传本地图片
		instance.config.showLinkImg = false;
		// 上传图片的接口地址
		instance.config.uploadImgServer = "";
		// 限制上传图片格式
		instance.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
		// 设置编辑器页面层级
		instance.config.zIndex = 500;

		// 编辑区域 blur（失焦）时触发的回调函数。
		// instance.config.onblur = function (newHtml) {
		// 	emits("update:modelValue", newHtml);
		// };

		// 配置 onchange 回调函数
		instance.config.onchange = function (newHtml) {
			emits("update:modelValue", newHtml);
		};
		// 配置触发 onchange 的时间频率，默认为 200ms
		// instance.config.onchangeTimeout = 500; // 修改为 500ms

		// 创建
		instance.create();
	});

	// const content = reactive({
	// 	html: "",
	// 	text: "",
	// });
	// const syncHTML = () => {
	// 	content.html = instance.txt.html();
	// 	content.text = instance.txt.text();
	// 	console.log(content);
	// };

	// 组件销毁时，也及时销毁编辑器
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
