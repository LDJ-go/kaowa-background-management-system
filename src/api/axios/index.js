import axios from "axios";
import { addPending, removePending } from "./cancel"; //取消重复请求
import { httpErrorStatusHandle } from "./error.js";
import BASE_URL from "./baseURL";
import { ElLoading, ElMessage } from "element-plus";
import { getToken, diffTokenTime } from "@/utils/auth";
import { parseData } from "@/utils/json";
import store from "@/store";

const LoadingInstance = {
	_target: null, // 保存Loading实例
	_count: 0,
};

function arrBufToStr(buffer) {
	let encodedString = String.fromCodePoint.apply(null, new Uint8Array(buffer));
	let decodedString = decodeURIComponent(escape(encodedString)); //没有这一步中文会乱码
	return decodedString;
}

function myAxios(axiosConfig, customOptions, loadingOptions) {
	const service = axios.create({
		baseURL: BASE_URL, // 设置统一的请求前缀
		timeout: 5000, // 设置统一的超时时长
		responseType: "arraybuffer",
		transformResponse: (data) => {
			return parseData(arrBufToStr(data)); // arraybuffer -> string
		},
	});

	// 自定义配置
	let custom_options = Object.assign(
		{
			repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
			loading: true, // 是否开启loading层效果, 默认为false
			error_message_show: true, // 是否开启接口错误信息展示，默认为true
			reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
			code_message_show: false, // 是否开启code不为0时（后端返回信息）的信息提示, 默认为false
		},
		customOptions
	);

	service.interceptors.request.use(
		(config) => {
			removePending(config);
			custom_options.repeat_request_cancel && addPending(config);
			// 创建loading实例
			if (custom_options.loading) {
				LoadingInstance._count++;
				if (LoadingInstance._count === 1) {
					LoadingInstance._target = ElLoading.service(loadingOptions);
				}
			}

			// 自动携带token
			if (getToken() && typeof window !== "undefined") {
				// typeof window !== "undefined" 为了兼容ssr的环境情况
				if (diffTokenTime()) {
					store.dispatch("user/logout");
					ElMessage({
						type: "error",
						message: "token 失效了",
					});
					// return Promise.reject(new Error("token 失效了"));
				}
			}
			config.headers.Authorization = getToken();

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	service.interceptors.response.use(
		(response) => {
			removePending(response.config);
			custom_options.loading && closeLoading(custom_options); // 关闭loading
			// 在code不等于0的时候，我们就直接展示后端带来的提示语
			if (custom_options.code_message_show && response.data && response.data.code !== 0) {
				console.log(response);
				ElMessage({
					type: "error",
					message: response.data.message,
				});
				return Promise.reject(response.data); // code不等于0, 页面具体逻辑就不执行了
			}
			return custom_options.reduct_data_format ? response.data : response;
		},
		(error) => {
			error.config && removePending(error.config);
			custom_options.loading && closeLoading(custom_options); // 关闭loading
			custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
			return Promise.reject(error); // 错误继续返回给到具体页面
		}
	);

	return service(axiosConfig);
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading(_options) {
	if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
	if (LoadingInstance._count === 0) {
		LoadingInstance._target.close();
		LoadingInstance._target = null;
	}
}

/**
 * 封装创建请求
 * @param axiosConfig 请求携带的参数url method等
 * @param customOptions 用户自定义的参数（是否取消重复请求，是否开启loading层，是否开启接口的ELMEssage提示，是否开启简洁的数据结构响应，是否开启后端返回code及信息提示）
 * @param loadingOptions ELLoading的配置
 */
export default function request(axiosConfig, customOptions, loadingOptions) {
	return new Promise((resolve, reject) => {
		myAxios(axiosConfig, customOptions, loadingOptions)
			.then((res) => {
				// console.log(res);
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
