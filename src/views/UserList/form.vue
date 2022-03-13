<template>
	<div class="form-container">
		<el-form ref="formRef" :model="formData" :rules="rules" size="medium" label-width="80px">
			<el-row type="default" justify="left" align="center" gutter="0">
				<el-col :span="5">
					<el-form-item label="用户ID :" prop="userID">
						<el-input
							v-model="formData.userID"
							placeholder="请输入用户ID"
							clearable
							:style="{ width: '83%' }"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="用户昵称 :" prop="userName">
						<el-input
							v-model="formData.userName"
							placeholder="请输入用户昵称"
							clearable
							:style="{ width: '83%' }"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="用户账号 :" prop="account">
						<el-input
							v-model="formData.account"
							placeholder="请输入用户账号"
							clearable
							:style="{ width: '83%' }"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="登陆时间 :" prop="lastLoginTime">
						<el-select
							v-model="formData.lastLoginTime"
							placeholder="请选择登陆时间"
							clearable
							:style="{ width: '83%' }"
						>
							<el-option
								v-for="(item, index) in lastLoginTimeOptions"
								:key="index"
								:label="item.label"
								:value="item.value"
								:disabled="item.disabled"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="账号状态 :" prop="accountStatus">
						<el-select
							v-model="formData.accountStatus"
							placeholder="请选择账号状态"
							clearable
							:style="{ width: '83%' }"
						>
							<el-option
								v-for="(item, index) in accountStatusOptions"
								:key="index"
								:label="item.label"
								:value="item.value"
								:disabled="item.disabled"
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
	import { ref, defineEmits } from "vue";
	import cancelELButtonFocus from "@/utils/cancel-el-button-focus.js";

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
	// 下拉菜单
	const lastLoginTimeOptions = [
		{
			label: "最近一周",
			value: "last-week",
		},
		{
			label: "最近一月",
			value: "last-month",
		},
		{
			label: "最近一年",
			value: "last-year",
		},
	];
	const accountStatusOptions = [
		{
			label: "全部",
			value: "all",
		},
		{
			label: "正常",
			value: "normal",
		},
		{
			label: "冻结",
			value: "freeze",
		},
	];

	// 表单数据
	let formData = ref({
		userID: undefined,
		userName: undefined,
		account: undefined,
		lastLoginTime: undefined,
		accountStatus: undefined,
	});
	// 表单提交与重置
	const formRef = ref(null);
	const emit = defineEmits(["handle-table-data"]);

	const submitForm = function () {
		formRef.value.validate((valid) => {
			if (valid) {
				// TODO 发送请求
				// 传递数据
				emit("handle-table-data", [
					{
						userID: 234,
						userName: "XH",
						account: "18122226666",
						sex: "男",
						registration_time: "2022-01-26 12：01",
						last_login_time: "2022-03-12 12：01",
						state: "正常",
					},
				]);
			} else {
				console.log("error submit!");
			}
		});
		cancelELButtonFocus(event);
	};
	const resetForm = function () {
		formRef.value.resetFields();
		cancelELButtonFocus(event);
	};
</script>

<style>
	.form-container {
		padding: 20px 0 0 0;
		margin-bottom: 20px;
		background-color: #dedddd;
	}

	.elCol {
		margin-left: -16px;
	}

	.btn-container {
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
	}
</style>
