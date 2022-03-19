import { createStore } from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import getters from "./getters";

export default createStore({
	state: {},
	getters,
	mutations: {},
	actions: {},
	modules: { app, user },
});
