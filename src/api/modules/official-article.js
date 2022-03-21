// 官方文章

import request from "../axios";

async function getOfficialArticle(params) {
	return request({
		url: "/portal/exampost/manage/list",
		type: "GET",
		params,
	});
}

export default {
	getOfficialArticle,
};
