<template>
	<div class="article-info">
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-light">
					<h3>文章信息</h3>
				</div>
			</el-col>
		</el-row>
		<div>
			<el-row class="article-info-item">
				<el-col :span="4"><div>文章标题：</div></el-col>
				<el-col :span="18"><div>考研必看宝典</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>文章摘要：</div></el-col>
				<el-col :span="18"><div>xxxxxxxxxxxxxxxxxxx</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>文章正文：</div></el-col>
				<el-col :span="18"><div>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>文章封面：</div></el-col>
				<el-col :span="18">
					<img
						src="https://img1.baidu.com/it/u=3354940591,649439089&fm=253&fmt=auto&app=120&f=PNG?w=1246&h=698"
						alt="文章标题"
						width="200"
					/>
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>发布时间：</div></el-col>
				<el-col :span="18"><div>2022-02-19 11:11:20</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>话题标签：</div></el-col>
				<el-col :span="18"><div>#考研 #学习方法</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>发布区域：</div></el-col>
				<el-col :span="18"><div>考研</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>参考链接：</div></el-col>
				<el-col :span="18">
					<a href="www.baidu.com">百度</a>
				</el-col>
			</el-row>
		</div>
	</div>
	<div class="interact-info">
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-light">
					<h3>互动信息</h3>
				</div>
			</el-col>
		</el-row>
		<div>
			<el-row class="article-info-item">
				<el-col :span="4"><div>点赞数：</div></el-col>
				<el-col :span="18"><div>36</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>分享数：</div></el-col>
				<el-col :span="18"><div>111</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>评论数：</div></el-col>
				<el-col :span="18"><div>15</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>收藏数：</div></el-col>
				<el-col :span="18"><div>30</div></el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss">
	// .el-row {
	// 	margin-bottom: 20px;
	// }
	// .el-row:last-child {
	// 	margin-bottom: 0;
	// }
	// .el-col {
	// 	border-radius: 4px;
	// }
	// .bg-purple-dark {
	// 	background: #99a9bf;
	// }
	// .bg-purple {
	// 	background: #d3dce6;
	// }
	// .row-bg {
	// 	padding: 10px 0;
	// 	background-color: #f9fafc;
	// }
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		height: 36px;
		line-height: 36px;
		padding-left: 10px;
	}

	.article-info-item {
		margin: 10px 0 10px 30px;
		.el-col {
			&:nth-child(1) {
				font-weight: 500;
			}
		}
		a {
			color: #00bffc;
			text-decoration: underline;
		}
	}
</style>
