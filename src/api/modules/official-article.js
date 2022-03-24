// 官方文章

import request from "../axios";

async function getOfficialArticle(params) {
	return request({
		url: "/portal/exampost/manage/list",
		type: "GET",
		params,
	});
}
async function searchOfficialArticle(params, data) {
	return request({
		url: "/portal/exampost/manage/search",
		method: "POST",
		params,
		data,
	});
}
async function getOfficialArticleDetail(examPostId) {
	return request({
		url: `/portal/exampost/manage/detail/${examPostId}`,
		method: "GET",
	});
}

async function deleteOfficialArticle(examPostId, userId) {
	return request({
		url: `/portal/exampost/manage/delete/${examPostId}/${userId}`,
		method: "DELETE",
	});
}

export default {
	getOfficialArticle,
	searchOfficialArticle,
	getOfficialArticleDetail,
	deleteOfficialArticle,
};
