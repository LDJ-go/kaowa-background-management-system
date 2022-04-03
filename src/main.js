import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// ELIcons
import * as ELIcons from "@element-plus/icons-vue";

// SvgIcon
import SvgIcon from "@/assets/icons/index";

// Scss
import "@/styles/index.scss";

// 路由权限
import "@/router/premission";

const app = createApp(App);

SvgIcon(app);
for (const iconName in ELIcons) {
	app.component(iconName, ELIcons[iconName]);
}

app.use(store).use(ElementPlus).use(router).mount("#app");
