<template>
	<div class="author-info">
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-light">
					<h3>作者信息</h3>
				</div>
			</el-col>
		</el-row>
		<div>
			<el-row>
				<el-col :span="12">
					<el-row class="article-info-item">
						<el-col :span="4"><div>用户账号：</div></el-col>
						<el-col :span="8"><div>201945612789</div></el-col>
					</el-row>
					<el-row class="article-info-item">
						<el-col :span="4"><div>用户昵称：</div></el-col>
						<el-col :span="8"><div>一路向北</div></el-col>
					</el-row>
					<el-row class="article-info-item">
						<el-col :span="4"><div>用户头像：</div></el-col>
						<el-col :span="8">
							<img src="../../../assets/avatar/avatar.jpg" alt="用户头像" class="avatar" />
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="12">
					<el-row class="article-info-item">
						<el-col :span="4"><div>身份认证：</div></el-col>
						<el-col :span="8">
							<img
								src="https://img1.baidu.com/it/u=3560216012,1308596030&fm=253&fmt=auto&app=138&f=JPEG?w=610&h=500"
								alt=""
								width="200"
							/>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
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
				<el-col :span="4"><div style="text-indent: 2em">页签：</div></el-col>
				<el-col :span="18"><div>考研</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div style="text-indent: 2em">分区：</div></el-col>
				<el-col :span="18"><div>青蛙乐园</div></el-col>
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
			<el-row class="article-info-item">
				<el-col :span="4"><div>复用数：</div></el-col>
				<el-col :span="18"><div>30</div></el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>阅读数：</div></el-col>
				<el-col :span="18"><div>30</div></el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss">
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
		.avatar {
			width: 77px;
			height: 77px;
			border-radius: 50%;
			margin: 0 0 10px px 0;
		}
	}
</style>
