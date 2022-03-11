import { createStore } from "vuex";
import app from "./modules/app";
import getters from "./getters";

export default createStore({
	state: {},
	getters,
	mutations: {},
	actions: {},
	modules: { app: app },
});
