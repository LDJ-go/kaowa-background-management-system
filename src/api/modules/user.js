import request from "../axios";

async function getUserList(params) {
	return request({
		url: "/portal/manage/user/listAll",
		method: "GET",
		params,
	});
}
async function searchUser(params, data) {
	return request({
		url: "/portal/manage/user/search",
		method: "POST",
		params,
		data,
	});
}
async function toggleFreezeUser(params) {
	return request({
		url: "/portal/manage/user/freeze",
		method: "PUT",
		params,
	});
}

export default {
	getUserList,
	searchUser,
	toggleFreezeUser,
};
