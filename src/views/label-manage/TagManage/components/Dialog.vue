<template>
	<el-dialog model-value="dialogTableVisible" :title="dialogTitle" width="40%" @close="handleClose">
		<el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
			<el-form-item label="页签名" prop="tagName">
				<el-input v-model="form.tagName"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">取消</el-button>
				<el-button type="primary" @click="handleConfirm">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
	import { defineEmits, ref, defineProps, watch } from "vue";
	import { tagApi } from "@/api";

	import { ElMessage } from "element-plus";

	const emits = defineEmits(["update:dialogTableVisible", "initTableData"]);
	const handleClose = function () {
		emits("update:dialogTableVisible", false);
	};

	const props = defineProps({
		dialogTitle: {
			type: String,
			default: "",
			required: true,
		},
		dialogTableValue: {
			type: Object,
			default: () => {},
		},
	});

	const formRef = ref(null);
	const form = ref({
		tagName: "",
	});

	watch(
		() => {
			return props.dialogTableValue;
		},
		() => {
			// console.log(props.dialogTableValue);
			form.value = props.dialogTableValue;
		},
		{
			deep: true,
			immediate: true,
		}
	);

	const rules = ref({
		tagName: [
			{
				required: true,
				message: "Please input Activity name",
				trigger: "blur",
			},
		],
	});
	const handleConfirm = function () {
		formRef.value.validate(async (valid) => {
			if (valid) {
				// props.dialogTitle === "添加页签" ? await addTag(form.value) : await editTag(form.value);
				ElMessage({
					message: "message.updeteSuccess",
					type: "success",
				});
				emits("initTableData");
				handleClose();
			} else {
				console.log("error submit!");
				return false;
			}
		});
	};
</script>

<style lang="scss" scoped></style>
