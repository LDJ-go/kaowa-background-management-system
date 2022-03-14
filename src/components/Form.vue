<template>
	<div class="form-container">
		<el-form ref="formRef" :model="formData" :rules="rules" size="medium" label-width="100px">
			<el-row type="default" justify="left" align="center" gutter="15">
				<!-- 输入框 -->
				<el-col :span="7" class="elCol" v-for="(item, index) in props.inputOptions" :key="index">
					<el-form-item :label="item.label" :prop="item.prop">
						<el-input
							v-model="formData[item.prop]"
							:placeholder="`请输入${item.label}`"
							clearable
							:style="{ width: item.width }"
						></el-input>
					</el-form-item>
				</el-col>
				<!-- 下拉框 -->
				<el-col :span="7" class="elCol" v-for="(item, index) in props.selectOptions" :key="index">
					<el-form-item :label="item.label" :prop="item.prop">
						<el-select
							v-model="formData[item.prop]"
							:placeholder="`请选择${item.label}`"
							clearable
							:style="{ width: item.width }"
						>
							<el-option
								v-for="(option, index) in item.options"
								:key="index"
								:label="option.label"
								:value="option.value"
								:disabled="option.disabled"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn-container">
			<el-button @click="submitForm">查询</el-button>
			<el-button @click="resetForm">重置</el-button>
		</div>
	</div>
</template>

<script setup>
	import { ref, defineProps, defineEmits } from "vue";
	import cancelELButtonFocus from "@/utils/cancel-el-button-focus.js";

	const props = defineProps({
		formData: {
			type: Object,
			default: () => ({}),
			required: true,
		},
		inputOptions: {
			type: Array,
			default: () => [],
			required: false,
		},
		selectOptions: {
			type: Array,
			default: () => [],
			required: false,
		},
	});

	let formData = ref(props.formData);

	// 校验规则
	const rules = {
		userID: [
			{
				required: false,
				message: "请输入用户ID",
				trigger: "blur",
			},
		],
		userName: [
			{
				required: false,
				message: "请输入用户昵称",
				trigger: "blur",
			},
		],
		lastLoginTime: [],
		accountStatus: [],
	};

	// 表单数据
	// let formData = ref({
	// 	userID: undefined,
	// 	userName: undefined,
	// 	account: undefined,
	// 	lastLoginTime: undefined,
	// 	accountStatus: undefined,
	// });

	// 表单提交与重置
	const formRef = ref(null);
	const emit = defineEmits(["query-table-data"]);

	// 提交按钮
	const submitForm = function () {
		formRef.value.validate((valid) => {
			if (valid) {
				// TODO 发送请求
				// 传递数据
				emit("query-table-data", ["data"]);
			} else {
				console.log("error submit!");
			}
		});
	};
	// 重置按钮
	const resetForm = function () {
		formRef.value.resetFields();
	};
</script>

<style>
	.form-container {
		padding: 20px 0 0 0;
		margin-bottom: 20px;
		background-color: #dedddd;
	}

	.elCol {
		/* margin-left: -16px; */
	}

	.btn-container {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
	}
</style>
