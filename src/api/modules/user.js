import request from "../axios";

async function getUserList(params) {
	return request({
		url: "/portal/manage/user/listAll",
		method: "GET",
		params,
	});
}

export default {
	getUserList,
};
