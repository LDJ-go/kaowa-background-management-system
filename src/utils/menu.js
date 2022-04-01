const MENU_LIST = [
	{
		id: 1,
		authName: "用户管理",
		children: [
			{
				id: 11,
				authName: "用户列表",
				children: [],
				order: null,
				path: "user-list",
			},
			{
				id: 12,
				authName: "机构号列表",
				children: [],
				order: null,
				path: "organization-list",
			},
		],
		order: 1,
		path: "users",
	},
	{
		id: 2,
		authName: "内容管理",
		children: [
			{
				id: 21,
				authName: "官方文章列表",
				children: [],
				order: null,
				path: "official-article-list",
			},
			{
				id: 22,
				authName: "用户文章列表",
				children: [],
				order: null,
				path: "user-article-list",
			},
			{
				id: 23,
				authName: "牛蛙内容审核",
				children: [],
				order: null,
				path: "article-examine",
			},
			{
				id: 24,
				authName: "评论区管理",
				children: [],
				order: null,
				path: "comment-manage",
			},
		],
		order: 2,
		path: "content",
	},
	{
		id: 3,
		authName: "标签管理",
		children: [
			{
				id: 31,
				authName: "页签管理",
				children: [],
				order: null,
				path: "tag-manage",
			},
			{
				id: 32,
				authName: "分区管理",
				children: [],
				order: null,
				path: "partition-manage",
			},
			{
				id: 33,
				authName: "轮播图管理",
				children: [],
				order: null,
				path: "carousel-manage",
			},
		],
		order: 3,
		path: "label",
	},
	{
		id: 4,
		authName: "推荐管理",
		children: [
			{
				id: 41,
				authName: "自动推荐",
				children: [],
				order: null,
				path: "auto-recommend",
			},
			{
				id: 42,
				authName: "手动推荐",
				children: [],
				order: null,
				path: "manual-recommend",
			},
		],
		order: 4,
		path: "recommend",
	},
	{
		id: 5,
		authName: "系统管理",
		children: [
			{
				id: 51,
				authName: "管理员账号管理",
				children: [],
				order: null,
				path: "administrator-manage",
			},
			{
				id: 52,
				authName: "日志管理",
				children: [],
				order: null,
				path: "log-manage",
			},
		],
		order: 5,
		path: "system-authority",
	},
	{
		id: 6,
		authName: "数据统计",
		children: [
			{
				id: 61,
				authName: "数据统计",
				children: [],
				order: null,
				path: "data-statistics",
			},
		],
		order: 6,
		path: "statistics",
	},
];
export default MENU_LIST;
