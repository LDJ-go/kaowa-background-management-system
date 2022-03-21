<template>
	<el-row>
		<el-col :span="2">轮播图</el-col>
		<el-col :span="5">
			<Upload
				@handle-img-url="handleCarouselUrl"
				@remove-img-url="removeCarouselUrl"
				:carouselUrl="carouselUrl"
			/>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="2">选择分区</el-col>
		<el-col :span="5">
			<el-select v-model="selectValue" class="m-2" placeholder="请选择分区">
				<el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="2">跳转地址</el-col>
		<el-col :span="5">
			<el-input v-model="inputValue" placeholder="请输入跳转地址" @blur="validate" />
		</el-col>
	</el-row>
	<div class="btn-container">
		<el-button size="large" @click="save">保存</el-button>
	</div>
</template>

<script setup>
	import Upload from "@/components/Upload.vue";
	import { useRoute, useRouter } from "vue-router";
	import { ref } from "vue";
	import { carouselApi } from "@/api";
	import { ElMessage } from "element-plus";

	// 路由信息
	const route = useRoute();
	const routerParams = route.params.carousel ? JSON.parse(route.params.carousel) : "";

	// 路由操作
	const router = useRouter();

	// 轮播图
	const carouselUrl = routerParams ? routerParams.imageUrl : ref("");
	// 接收轮播图
	const handleCarouselUrl = function (url) {
		carouselUrl.value = url;
	};
	// 删除轮播图
	const removeCarouselUrl = function (url) {
		carouselUrl.value = url;
	};

	// 下拉选择框
	const selectValue = routerParams ? routerParams.kind : ref("");
	const selectOptions = [
		{
			value: "科学备考",
			label: "科学备考",
		},
		{
			value: "青蛙乐园",
			label: "青蛙乐园",
		},
		{
			value: "牛蛙经验",
			label: "牛蛙经验",
		},
	];

	// 输入框-跳转地址
	const inputValue = routerParams ? routerParams.skipUrl : ref("");
	const validate = function () {};
	function isURL(str_url) {
		var strRegex =
			"^((https|http|ftp|rtsp|mms)?://)" +
			"?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
			"(([0-9]{1,3}.){3}[0-9]{1,3}" + // IP形式的URL- 199.194.52.184
			"|" + // 允许IP和DOMAIN（域名）
			"([0-9a-z_!~*'()-]+.)*" + // 域名- www.
			"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + // 二级域名
			"[a-z]{2,6})" + // first level domain- .com or .museum
			"(:[0-9]{1,4})?" + // 端口- :80
			"((/?)|" + // a slash isn't required if there is no file name
			"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
		var re = new RegExp(strRegex);
		return re.test(str_url);
	}

	// 保存
	const save = async function () {
		if (carouselUrl.value == "" || selectValue.value == "" || inputValue.value == "") {
			ElMessage({
				type: "error",
				message: "请填入正确的内容",
			});
			return;
		}
		const res = await carouselApi.addCarousel({
			imageUrl: carouselUrl.value,
			kind: selectValue.value,
			skipUrl: inputValue.value,
			status: 0,
		});
		// 方案一：通过跳转到一个刷新页面再二次跳转到轮播图管理页实现刷新功能
		// router.push({
		// 	name: "Refresh",
		// });
		// 方案二：通过传递路由参数决定是否刷新页面
		router.push({
			name: "CarouselManage",
			params: {
				refresh: true,
			},
		});
	};
</script>

<style lang="scss" scoped>
	.el-row {
		margin-bottom: 20px;
	}
	.el-col {
		line-height: 150px;
		height: 150px;
		margin-left: 10px;
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
