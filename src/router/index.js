import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login"),
	},
	{
		path: "/",
		name: "/",
		component: () => import("../pages"),
		redirect: "/user-list",
		children: [
			{
				path: "user-list",
				name: "UserList",
				component: () => import("@/views/UserList"),
			},
			{
				path: "organization-list",
				name: "OrganizationList",
				component: () => import("@/views/OrganizationList"),
			},
			{
				path: "official-article-list",
				name: "OfficialArticleList",
				component: () => import("@/views/OfficialArticleList"),
			},
			{
				path: "user-article-list",
				name: "UserArticleList",
				component: () => import("@/views/UserArticleList"),
			},
			{
				path: "article-examine",
				name: "ArticleExamine",
				component: () => import("@/views/ArticleExamine"),
			},
			{
				path: "comment-manage",
				name: "CommentManage",
				component: () => import("@/views/CommentManage"),
			},
			{
				path: "tag-manage",
				name: "TagManage",
				component: () => import("@/views/TagManage"),
			},
			{
				path: "partition-manage",
				name: "PartitionManage",
				component: () => import("@/views/PartitionManage"),
			},
			{
				path: "carousel-manage",
				name: "CarouselManage",
				component: () => import("@/views/CarouselManage"),
			},
			{
				path: "auto-recommend",
				name: "AutoRecommend",
				component: () => import("@/views/AutoRecommend"),
			},
			{
				path: "manual-recommend",
				name: "ManualRecommend",
				component: () => import("@/views/ManualRecommend"),
			},
			{
				path: "administrator-manage",
				name: "AdministratorManage",
				component: () => import("@/views/AdministratorManage"),
			},
			{
				path: "role-manage",
				name: "RoleManage",
				component: () => import("@/views/RoleManage"),
			},
			{
				path: "data-statistics",
				name: "DataStatistics",
				component: () => import("@/views/DataStatistics"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
