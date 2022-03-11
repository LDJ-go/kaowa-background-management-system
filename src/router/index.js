import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/login"),
	},
	{
		path: "/",
		name: "/",
		component: () => import("../pages"),
		redirect: "/user-list",
		children: [
			{
				path: "user-list",
				name: "user-list",
				component: () => import("@/views/user-list/index.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
