import router from "@/router";
import { ElMessage } from "element-plus";

export default {
	namespaced: true,
	state: () => ({
		siderType: true, // 侧边栏的缩放
	}),
	actions: {},
	mutations: {
		changeSiderType(state) {
			state.siderType = !state.siderType;
		},
	},
};
