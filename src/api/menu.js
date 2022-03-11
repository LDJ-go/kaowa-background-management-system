function getMenuList() {
	return new Promise((resolve) => {
		resolve([
			{
				id: 1,
				authName: "用户管理",
				children: [
					{
						id: 10,
						authName: "用户列表",
						children: [],
						order: null,
						path: "user-list",
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
						id: 20,
						authName: "官方文章列表",
						children: [],
						order: null,
						path: "official",
					},
					{
						id: 21,
						authName: "用户文章列表",
						children: [],
						order: null,
						path: "official",
					},
					{
						id: 22,
						authName: "牛蛙内容审核",
						children: [],
						order: null,
						path: "examine",
					},
					{
						id: 23,
						authName: "评论区",
						children: [],
						order: null,
						path: "comment",
					},
				],
				order: 2,
				path: "content",
			},
			{
				id: 3,
				authName: "标签管理",
				children: [],
				order: 3,
				path: "label",
			},
			{
				id: 4,
				authName: "推荐管理",
				children: [],
				order: 4,
				path: "recommend",
			},
			{
				id: 5,
				authName: "系统管理",
				children: [],
				order: 5,
				path: "system",
			},
			{
				id: 6,
				authName: "数据统计",
				children: [],
				order: 6,
				path: "statistics",
			},
		]);
	});
}

export default getMenuList;
