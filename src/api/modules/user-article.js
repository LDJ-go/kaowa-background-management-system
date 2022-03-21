import request from "../axios";

async function getUserPostByPage(params) {
	return request({
		url: "/portal/userpost/manage",
		method: "GET",
		params,
	});
}

async function searchUserPost(params, data) {
	return request({
		url: "/portal/userpost/manage/search",
		method: "POST",
		params,
		data,
	});
}

async function getUserPostDetail(id) {
	return request({
		url: "/portal/userpost/managedetail/" + id,
		method: "GET",
	});
}

async function deleteUserPost(userId, userPostId) {
	return request({
		url: `/portal/userpost/online/${userPostId}/${userId}`,
		method: "DELETE",
	});
}

export default {
	getUserPostByPage,
	searchUserPost,
	getUserPostDetail,
	deleteUserPost,
};
