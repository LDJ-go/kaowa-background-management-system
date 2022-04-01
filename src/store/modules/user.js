import router from "@/router";
import { loginApi } from "@/api";
import { setTokenTime } from "@/utils/auth";

export default {
	namespaced: true,
	state: () => ({
		token: localStorage.getItem("token") || "",
	}),
	actions: {
		// 登录
		async login(context, userInfo) {
			if (userInfo.username == "admin" && userInfo.password == "123456") {
				try {
					const res = await loginApi.login();
					context.commit("setToken", res.data.token); // 调用mutations里的方法存储token
					setTokenTime(); // 记录token的保存时间
					router.replace("/"); // 路由跳转到首页
				} catch (err) {
					console.log(err);
				}
			}
		},
		// 退出登录
		logout(context) {
			context.commit("setToken", "");
			localStorage.removeItem("token");
			router.replace("/login"); // 路由跳转到登录页
		},

		// async login(context, userInfo) {
		// 	try {
		// 		const res = await loginApi.login(userInfo);
		// 		context.commit("setToken", res); // 调用mutations里的方法存储token
		// 		setTokenTime(); // 记录token的保存时间
		// 		router.replace("/"); // 路由跳转到首页
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// },
		// // 退出登录
		// logout(context) {
		// 	context.commit("setToken", "");
		// 	localStorage.removeItem("token");
		// 	router.replace("/login"); // 路由跳转到登录页
		// },
	},
	mutations: {
		setToken: (state, token) => {
			state.token = token;
			localStorage.setItem("token", token);
		},
	},
};
