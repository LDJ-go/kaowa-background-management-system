import axios from "axios";
import { addPending, removePending } from "./cancel"; //取消重复请求

const LoadingInstance = {
	_target: null, // 保存Loading实例
	_count: 0,
};

function myAxios(axiosConfig, customOptions) {
	const service = axios.create({
		baseURL: "http://localhost:8888", // 设置统一的请求前缀
		timeout: 10000, // 设置统一的超时时长
	});

	// 自定义配置
	let custom_options = Object.assign(
		{
			repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
		},
		customOptions
	);

	service.interceptors.request.use(
		(config) => {
			removePending(config);
			custom_options.repeat_request_cancel && addPending(config);
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	service.interceptors.response.use(
		(response) => {
			removePending(response.config);
			return response;
		},
		(error) => {
			error.config && removePending(error.config);
			return Promise.reject(error);
		}
	);

	return service(axiosConfig);
}

export default myAxios;
