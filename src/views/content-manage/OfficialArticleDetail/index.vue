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
				<el-col :span="4">文章标题：</el-col>
				<el-col :span="18">
					{{ articleDetail.title }}
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">文章摘要：</el-col>
				<el-col :span="18">
					{{ articleDetail.summary }}
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">文章正文：</el-col>
				<el-col :span="18">
					{{ articleDetail.content }}
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">文章封面：</el-col>
				<el-col :span="18">
					<img
						:src="articleDetail.titleImageUrl"
						alt="文章标题"
						width="200"
						style="border: 2px dashed gray"
					/>
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">发布时间：</el-col>
				<el-col :span="18">
					{{ articleDetail.startTime }}
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">话题标签：</el-col>
				<el-col :span="18">
					{{ articleDetail.tags }}
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">发布区域：</el-col>
				<el-col :span="18">
					{{ articleDetail.categoryName }}
				</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">参考链接：</el-col>
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
				<el-col :span="4">点赞数：</el-col>
				<el-col :span="18">{{ articleDetail.likeCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">分享数：</el-col>
				<el-col :span="18">{{ articleDetail.shareCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">评论数：</el-col>
				<el-col :span="18">{{ articleDetail.commentCount }}</el-col>
			</el-row>
			<el-row class="article-info-item">
				<el-col :span="4">收藏数：</el-col>
				<el-col :span="18">{{ articleDetail.favCount }}</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { officialArticleApi } from "@/api";

	const route = useRoute();
	const router = useRouter();
	if (route.params.id == null || route.params.id == undefined) {
		router.push({
			name: "OfficialArticleList",
		});
	}

	// 文章详情信息
	const articleDetail = ref({});

	const initArticleDetail = async function () {
		const res = await officialArticleApi.getOfficialArticleDetail(route.params.id);
		articleDetail.value = res.data;
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
		margin: 15px 0 15px 30px;
		.el-col {
			&:nth-child(1) {
				font-weight: 500;
			}
		}
		span {
			margin-right: 10px;
			a {
				color: #00bffc;
				text-decoration: underline;
			}
		}
	}
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
</style>
