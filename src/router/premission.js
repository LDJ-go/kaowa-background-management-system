import router from "./index";
import { getToken } from "@/utils/auth";

const whiteList = ["/login"];

console.log("asd");

router.beforeEach((to, from, next) => {
	if (getToken()) {
		if (to.path === "/login") {
			next("/");
		} else {
			next();
		}
	} else {
		if (whiteList.includes(to.path)) {
			next();
		} else {
			next("/login");
		}
	}
});
