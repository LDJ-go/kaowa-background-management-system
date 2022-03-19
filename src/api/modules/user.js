import request from "../axios";

async function login(userInfo) {
	return request({
		url: "",
		method: "",
		data: userInfo,
	});
}

export default {
	login,
};
