// 将path路径转换成中文显示
export default function (path) {
	switch (path) {
		case "/":
			return "首页";
		case "UserList":
			return "用户管理 / 用户列表";
		case "OrganizationList":
			return "用户管理 / 机构号列表";
		case "OfficialArticleList":
			return "官方文章列表";
		case "OfficialArticleDetail":
			return "官方文章详情";
		case "OfficialArticlePublish":
			return "发布文章";
		case "UserArticleList":
			return "用户文章列表";
		case "UserArticleDetail":
			return "用户文章详情";
		case "ArticleExamine":
			return "牛蛙内容审核";
		case "CommentManage":
			return "评论区管理";
		case "TagManage":
			return "页签管理";
		case "PartitionManage":
			return "分区管理";
		case "CarouselManage":
			return "轮播图管理";
		case "AutoRecommend":
			return "自动推荐";
		case "ManualRecommend":
			return "手动推荐";
		case "AdministratorManage":
			return "管理员账号管理";
		case "RoleManage":
			return "角色权限管理";
		case "DataStatistics":
			return "数据统计";
		default:
			"考蛙";
	}
}
