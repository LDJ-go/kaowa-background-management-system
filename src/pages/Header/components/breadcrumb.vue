<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
			<span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{ filterPath(item.name) }}</span>
			<span class="redirect" v-else @click="handleRedirect(item.path)">{{ filterPath(item.name) }}</span>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script setup>
	import { ref, watch } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import filterPath from "@/utils/filter-path.js";

	const route = useRoute();

	const breadcrumbList = ref([]);
	const initBreadcrumbList = function () {
		breadcrumbList.value = route.matched;
	};
	watch(
		route,
		(newValue, oldValue) => {
			initBreadcrumbList();
		},
		{
			deep: true,
			immediate: true,
		}
	);

	const router = useRouter();
	const handleRedirect = function (path) {
		router.push(path);
	};
</script>

<style lang="scss" scoped>
	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
	.redirect {
		color: #666;
		font-weight: 600;
		cursor: pointer;
		&:hover {
			color: $menuBg;
		}
	}
</style>
