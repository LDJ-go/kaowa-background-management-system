import router from "@/router";
import { ElMessage } from "element-plus";

export default {
	namespaced: true,
	state: () => ({
		siderType: true, // 侧边栏的缩放
	}),
	actions: {
		login(context, userInfo) {
			if (userInfo.username === "admin" && userInfo.password === "123456") {
				router.replace("/"); // 路由跳转到首页
			} else {
				ElMessage.error("用户名或密码错误");
			}
		},
		logout() {
			router.replace("/login"); // 路由跳转到登录页
		},
	},
	mutations: {
		changeSiderType(state) {
			state.siderType = !state.siderType;
		},
	},
};
