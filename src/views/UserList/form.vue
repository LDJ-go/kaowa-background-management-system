<template>
	<div class="form-container">
		<el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="80px">
			<el-row type="default" justify="left" align="center" gutter="0">
				<el-col :span="5">
					<el-form-item label="用户ID :" prop="userID">
						<el-input
							v-model="formData.userName"
							placeholder="请输入用户ID"
							clearable
							:style="{ width: '83%' }"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="用户昵称 :" prop="userName">
						<el-input
							v-model="formData.field102"
							placeholder="请输入用户昵称"
							clearable
							:style="{ width: '83%' }"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="用户账号 :" prop="account">
						<el-input
							v-model="formData.field102"
							placeholder="请输入用户账号"
							clearable
							:style="{ width: '83%' }"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="登陆时间 :" prop="field103">
						<el-select
							v-model="formData.field103"
							placeholder="请选择登陆时间"
							clearable
							:style="{ width: '83%' }"
						>
							<el-option
								v-for="(item, index) in field103Options"
								:key="index"
								:label="item.label"
								:value="item.value"
								:disabled="item.disabled"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="elCol">
					<el-form-item label="账户状态 :" prop="field104">
						<el-select
							v-model="formData.field104"
							placeholder="请选择账户状态"
							clearable
							:style="{ width: '83%' }"
						>
							<el-option
								v-for="(item, index) in field104Options"
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

<script>
	export default {
		components: {},
		props: [],
		data() {
			return {
				formData: {
					field101: undefined,
					field102: undefined,
					field103: undefined,
					field104: undefined,
				},
				rules: {
					field101: [
						{
							required: true,
							message: "请输入单行文本",
							trigger: "blur",
						},
					],
					field102: [
						{
							required: true,
							message: "请输入单行文本",
							trigger: "blur",
						},
					],
					field103: [],
					field104: [],
				},
				field103Options: [
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
				],
				field104Options: [
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
				],
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			submitForm() {
				this.$refs["elForm"].validate((valid) => {
					if (!valid) return;
					// TODO 提交表单
				});
			},
			resetForm() {
				this.$refs["elForm"].resetFields();
			},
		},
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
