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
						<el-col :span="5"><div>用户账号：</div></el-col>
						<el-col :span="7">{{ articleDetail.account }}</el-col>
					</el-row>
					<el-row class="article-info-item">
						<el-col :span="5"><div>用户昵称：</div></el-col>
						<el-col :span="7">{{ articleDetail.authorNickName }}</el-col>
					</el-row>
					<el-row class="article-info-item">
						<el-col :span="5"><div>用户头像：</div></el-col>
						<el-col :span="7">
							<img :src="articleDetail.authorAvatarUrl" alt="用户头像" class="avatar" />
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="12">
					<el-row class="article-info-item">
						<el-col :span="5"><div>身份认证：</div></el-col>
						<el-col :span="7">
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
				<el-col :span="18">{{ articleDetail.title }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>文章摘要：</div></el-col>
				<el-col :span="18">{{ articleDetail.summary }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>文章正文：</div></el-col>
				<el-col :span="18">{{ articleDetail.content }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>文章封面：</div></el-col>
				<el-col :span="18">
					<img :src="articleDetail.titleImageUrl" alt="文章标题" width="200" />
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>发布时间：</div></el-col>
				<el-col :span="18">{{ articleDetail.startTime }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>话题标签：</div></el-col>
				<el-col :span="18">{{ articleDetail.tags }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div style="text-indent: 2em">页签：</div></el-col>
				<el-col :span="18">{{ articleDetail.categoryName }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div style="text-indent: 2em">分区：</div></el-col>
				<el-col :span="18">{{ articleDetail.zone ? "青蛙乐园" : "牛蛙经验" }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>参考链接：</div></el-col>
				<el-col :span="18">
					<span v-for="(item, index) in articleDetail.linkUrlList" :key="index">
						<a :href="item.url">{{ item.name }}</a>
					</span>
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
				<el-col :span="18">{{ articleDetail.likeCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>分享数：</div></el-col>
				<el-col :span="18">{{ articleDetail.shareCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>评论数：</div></el-col>
				<el-col :span="18">{{ articleDetail.commentCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>收藏数：</div></el-col>
				<el-col :span="18">{{ articleDetail.favCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>复用数：</div></el-col>
				<el-col :span="18">{{ articleDetail.tryingCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4"><div>阅读数：</div></el-col>
				<el-col :span="18">{{ articleDetail.viewCount }}</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { bullfrogApi } from "@/api";

	const route = useRoute();
	const router = useRouter();
	if (route.params.id == null || route.params.id == undefined) {
		router.push({
			name: "BullfrogArticleExamine",
		});
	}

	// 文章详情信息
	const articleDetail = ref({});

	const initArticleDetail = async function () {
		const res = await bullfrogApi.getPostDetail(route.params.id);
		articleDetail.value = res.data;
		console.log(articleDetail.value);
	};

	initArticleDetail();
</script>

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
		span {
			margin-right: 10px;
			a {
				color: #00bffc;
				text-decoration: underline;
			}
		}
	}
</style>
