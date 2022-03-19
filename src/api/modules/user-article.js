import request from "../axios";

async function getUserPostByPage(params) {
	return request({
		url: "/portal/userpost/manage",
		method: "GET",
		params,
	});
}

export default {
	getUserPostByPage,
};
