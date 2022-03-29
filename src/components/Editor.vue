<template>
	<div>
		<!-- 富文本编辑框 -->
		<div ref="editor" style="margin: 10px 0"></div>
	</div>
</template>

<script setup>
	import WangEditor from "wangeditor";
	import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps } from "vue";
	import { ElMessage } from "element-plus";

	const emits = defineEmits(["updata:moduleValue"]);
	const props = defineProps({
		editorHtml: {
			type: String,
			required: false,
		},
	});

	const editor = ref();

	let instance;

	onMounted(() => {
		instance = new WangEditor(editor.value);
		// 规定Base64的图片格式
		instance.config.uploadImgShowBase64 = true;
		// 隐藏网络图片，只能上传本地图片
		instance.config.showLinkImg = false;
		// 上传图片的接口地址
		instance.config.uploadImgServer = "/api/file/upload";
		// formdata中的name属性
		instance.config.uploadFileName = "file";
		// 限制上传图片格式
		instance.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
		// 设置编辑器页面层级
		instance.config.zIndex = 500;
		// 图片上传成功的回调函数
		instance.config.uploadImgHooks = {
			// 图片上传并返回了结果，但图片插入时出错了
			fail: function (xhr, editor, resData) {
				ElMessage({
					message: "图片无法插入编辑器",
					type: "error",
				});
			},
			// 上传图片出错，一般为 http 请求的错误
			error: function (xhr, editor, resData) {
				ElMessage({
					message: "上传图片出错",
					type: "error",
				});
			},
			// 上传图片超时
			timeout: function (xhr) {
				ElMessage({
					message: "上传图片超时",
					type: "error",
				});
			},
			// 图片上传并返回了结果，想要自己把图片插入到编辑器中
			// 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
			customInsert: function (insertImgFn, result) {
				// insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
				insertImgFn(result.data);
			},
		};

		// 编辑区域 blur（失焦）时触发的回调函数。
		// instance.config.onblur = function (newHtml) {
		// 	emits("update:modelValue", newHtml);
		// };

		// 配置 onchange 回调函数
		instance.config.onchange = function (newHtml) {
			// emits("update:modelValue", newHtml);
		};
		// 配置触发 onchange 的时间频率，默认为 200ms
		// instance.config.onchangeTimeout = 500; // 修改为 500ms

		// 创建
		instance.create();
		// 初始化内容
		instance.txt.html(props.editorHtml);
	});

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
