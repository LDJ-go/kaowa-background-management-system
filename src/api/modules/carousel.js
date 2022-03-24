// 轮播图

import request from "../axios";

async function getCarousel({
	params = {
		pageNum: 1,
		pageSize: 200,
	},
} = {}) {
	return request({
		url: "/slideshow",
		type: "GET",
		params,
	});
}

async function addCarousel(data) {
	return request({
		url: "/slideshow",
		method: "POST",
		data,
	});
}

async function modifyCarousel(slideShowId, data) {
	return request({
		url: "/slideshow/" + slideShowId,
		method: "PUT",
		data,
	});
}

async function deleteCarousel(slideShowId) {
	return request({
		url: "/slideshow/" + slideShowId,
		method: "DELETE",
	});
}

export default {
	getCarousel,
	addCarousel,
	modifyCarousel,
	deleteCarousel,
};
