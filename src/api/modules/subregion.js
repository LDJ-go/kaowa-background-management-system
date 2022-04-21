import request from "../axios";

async function getAllSubregion() {
	return request({
		url: "/portal/area/listAll",
		method: "GET",
	});
}

export default {
	getAllSubregion,
};
