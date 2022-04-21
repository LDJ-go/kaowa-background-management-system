// 对应接口category

import request from "../axios";

async function getCategoryList(params) {
	return request({
		url: "/portal/category/manage/list",
		method: "GET",
		params,
	});
}

async function searchCategory(params, data) {
	return request({
		url: "/portal/category/manage/search",
		method: "POST",
		params,
		data,
	});
}

async function moveCategory(categoryId, userId = "1477994686370156544", moveType, areaId) {
	return request({
		url: `/portal/category/move/${categoryId}/${userId}/${moveType}/${areaId}`,
		method: "PUT",
	});
}

async function publishCategory(categoryId, userId = "1477994686370156544", areaId) {
	return request({
		url: `/portal/category/online/${categoryId}/${userId}/${areaId}`,
		method: "PUT",
	});
}

async function offlineCategory(categoryId, userId = "1477994686370156544", areaId) {
	return request({
		url: `/portal/category/remove/${categoryId}/${userId}/${areaId}`,
		method: "PUT",
	});
}

async function editCategory(data, userId = "1477994686370156544", areaId) {
	return request({
		url: `/portal/category/remove/${userId}/${areaId}`,
		method: "PUT",
		data,
	});
}

export default {
	getCategoryList,
	searchCategory,
	moveCategory,
	publishCategory,
	offlineCategory,
	editCategory,
};
