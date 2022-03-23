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

export default {
	getOfficialArticle,
	searchOfficialArticle,
};
