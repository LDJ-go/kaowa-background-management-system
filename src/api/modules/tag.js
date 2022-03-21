// 对应接口category

import request from "../axios";

async function getAllCategory() {
	return request({
		url: "/portal/category/listAll",
		type: "GET",
	});
}

// async function moveCategory() {
// 	return request({
// 		url: "/portal/category/listAll",
// 		type: "GET",
// 	});
// }

export default {
	getAllCategory,
};
