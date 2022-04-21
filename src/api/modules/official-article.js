// 官方文章

import request from "../axios";

async function getOfficialArticle(params) {
	return request({
		url: "/portal/exampost/manage/list",
		method: "GET",
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

async function editOfficialArticle(userId = "1477994686370156544", data) {
	return request({
		url: `/portal/exampost/manage/publish/${userId}`,
		method: "PUT",
		data,
	});
}

async function deleteOfficialArticle(examPostId, userId = "1477994686370156544") {
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
	editOfficialArticle,
};
