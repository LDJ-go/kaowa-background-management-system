import request from "../axios";

async function wxlogin() {
	return request({
		url: "/portal/login",
		method: "POST",
		params: {
			openId: "d1f05397559302ada76b58b6b17e03da", //TODO
		},
	});
}

async function login() {
	return request({
		url: "/portal/admin-login",
		method: "POST",
		data: {
			password: "admin",
			username: "admin",
		},
	});
}

export default {
	wxlogin,
	login,
};
