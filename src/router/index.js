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
				component: () => import("@/views/user-manage/UserList"),
			},
			{
				path: "organization-list",
				name: "OrganizationList",
				component: () => import("@/views/user-manage/OrganizationList"),
			},
			{
				path: "official-article-list",
				name: "OfficialArticleList",
				component: () => import("@/views/content-manage/OfficialArticleList"),
				children: [
					{
						path: "official-article-detail",
						name: "OfficialArticleDetail",
						component: () => import("@/views/content-manage/OfficialArticleDetail"),
					},
					{
						path: "official-article-publish",
						name: "OfficialArticlePublish",
						component: () => import("@/views/content-manage/OfficialArticlePublish"),
					},
					{
						path: "official-article-edit",
						name: "OfficialArticleEdit",
						component: () => import("@/views/content-manage/OfficialArticleEdit"),
					},
				],
			},
			{
				path: "user-article-list",
				name: "UserArticleList",
				component: () => import("@/views/content-manage/UserArticleList"),
				children: [
					{
						path: "user-article-detail",
						name: "UserArticleDetail",
						component: () => import("@/views/content-manage/UserArticleDetail"),
					},
				],
			},
			{
				path: "article-examine",
				name: "ArticleExamine",
				component: () => import("@/views/content-manage/ArticleExamine"),
			},
			{
				path: "comment-manage",
				name: "CommentManage",
				component: () => import("@/views/content-manage/CommentManage"),
			},
			{
				path: "tag-manage",
				name: "TagManage",
				component: () => import("@/views/label-manage/TagManage"),
			},
			{
				path: "partition-manage",
				name: "PartitionManage",
				component: () => import("@/views/label-manage/PartitionManage"),
			},
			{
				path: "carousel-manage",
				name: "CarouselManage",
				component: () => import("@/views/label-manage/CarouselManage"),
			},
			{
				path: "auto-recommend",
				name: "AutoRecommend",
				component: () => import("@/views/recommend-manage/AutoRecommend"),
			},
			{
				path: "manual-recommend",
				name: "ManualRecommend",
				component: () => import("@/views/recommend-manage/ManualRecommend"),
			},
			{
				path: "administrator-manage",
				name: "AdministratorManage",
				component: () => import("@/views/system-authority/AdministratorManage"),
			},
			{
				path: "role-manage",
				name: "RoleManage",
				component: () => import("@/views/system-authority/RoleManage"),
			},
			{
				path: "data-statistics",
				name: "DataStatistics",
				component: () => import("@/views/data-statistics/DataStatistics"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
