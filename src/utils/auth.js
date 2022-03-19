// 判断token有效时间
import { TOKEN_TIME, TOKEN_TIME_VALUE } from "./constant";
// 登录时设置时间
export const setTokenTime = () => {
	localStorage.setItem(TOKEN_TIME, Date.now());
};
// 获取
export const getTokenTime = () => {
	return localStorage.getItem(TOKEN_TIME);
};
// 比较
export const diffTokenTime = () => {
	const currentTime = Date.now();
	const tokenTime = getTokenTime();
	return currentTime - tokenTime > TOKEN_TIME_VALUE;
};

// 获取token
const TOKEN_KEY = "token";
export const getToken = () => {
	return localStorage.getItem(TOKEN_KEY);
};
