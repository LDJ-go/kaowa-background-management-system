<template>
	<div class="form-container">
		<el-form ref="formRef" :model="formData" :rules="rules" size="medium" label-width="100px">
			<el-row type="default" justify="left" align="center" gutter="15">
				<!-- 输入框 -->
				<el-col :span="7" class="elCol" v-for="(item, index) in props.inputOptions" :key="index">
					<el-form-item :label="item.label" :prop="item.prop">
						<el-input
							v-model="formData[item.prop]"
							:placeholder="`请输入${item.prop != 'date' ? item.label : 'YYYY(-MM(-DD))格式'}`"
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
			<el-button @click="routerToPublish" v-if="needPublishBtn">+发布</el-button>
			<el-button @click="routerToAdd" v-if="needAdd">+新增</el-button>
		</div>
	</div>
</template>

<script setup>
	import { ref, defineProps, defineEmits } from "vue";
	import cancelELButtonFocus from "@/utils/cancel-el-button-focus.js";
	import { useRouter } from "vue-router";

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
		needPublishBtn: {
			type: Boolean,
			default: false,
			required: false,
		},
		needAdd: {
			type: Boolean,
			default: false,
			required: false,
		},
	});
	const emit = defineEmits(["query-table-data", "add-tag", "add-carousel"]);

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

	// 路由跳转至发布官方文章
	const router = useRouter();
	const routerToPublish = function () {
		router.push("/official-article-list/official-article-publish");
	};

	// 路由跳转至新增xxx页面
	const routerToAdd = function () {
		emit("add-tag");
		emit("add-carousel");
	};

	// 表单提交与重置
	const formRef = ref(null);

	// 提交按钮
	const submitForm = function (event) {
		formRef.value.validate((valid) => {
			if (valid) {
				// TODO 发送请求
				// 传递数据
				emit("query-table-data", formData.value);
			} else {
				console.log("error submit!");
			}
		});
		// 取消按钮的focus状态
		cancelELButtonFocus(event);
	};
	// 重置按钮
	const resetForm = function (event) {
		formRef.value.resetFields();
		// 取消按钮的focus状态
		cancelELButtonFocus(event);
	};
</script>

<style lang="scss" scoped>
	.form-container {
		padding: 20px 0 0 0;
		margin-bottom: 20px;
		background-color: #dedddd;
	}

	.btn-container {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
	}

	.el-button:focus,
	.el-button:hover {
		color: $bgColor;
		border-color: $bgColor;
		background-color: $bgColor;
		color: #000;
	}
</style>
