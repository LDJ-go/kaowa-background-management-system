<template>
	<!-- ffd04b -->
	<el-menu
		active-text-color="#3CB371"
		background-color="$menuBg"
		class="el-menu-vertical-demo"
		:default-active="defaultActive"
		text-color="#fff"
		router
		unique-opened
		:collapse="!$store.getters.siderType"
	>
		<el-sub-menu :index="item.id" v-for="(item, index) in menuList" :key="item.id">
			<template #title>
				<el-icon>
					<component :is="primaryIcon[index]"></component>
				</el-icon>
				<span>{{ item.authName }}</span>
			</template>
			<el-menu-item :index="`/${it.path}`" v-for="it in item.children" :key="it.id" @click="savePath(it.path)">
				<template #title>
					<el-icon>
						<component :is="secondaryIcon[0]"></component>
					</el-icon>
					<span>{{ it.authName }}</span>
				</template>
			</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<script setup>
	import getMenuList from "@/api/menu";
	import { ref, watchEffect } from "vue";
	import router from "@/router";

	const primaryIcon = ref(["user", "setting", "shop", "tickets", "pie-chart", "setting"]);
	const secondaryIcon = ref(["menu"]);

	const menuList = ref({});
	const initMenuList = async () => {
		const res = await getMenuList();
		menuList.value = res;
	};
	initMenuList();

	const defaultActive = ref(sessionStorage.getItem("path") || "/user");
	const savePath = (path) => {
		sessionStorage.setItem("path", `/${path}`);
	};
	watchEffect(() => {
		defaultActive.value = router.currentRoute.value.path;
	});
</script>

<style lang="scss" scoped>
	::v-deep .el-sub-menu__title:hover {
		background-color: $avatarBg;
	}
	::v-deep .el-menu-item:hover {
		background-color: $avatarBg;
	}
</style>
