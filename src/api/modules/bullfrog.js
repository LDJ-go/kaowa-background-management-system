import request from "../axios";

async function getPostByPage(params) {
	return request({
		url: "/portal/excellent/manage",
		method: "GET",
		params,
	});
}
async function getPostDetail(examPostId) {
	return request({
		url: `/portal/exampost/${examPostId}`,
		method: "GET",
	});
}

export default {
	getPostByPage,
	getPostDetail,
};
