import Vue from "vue";
import Vuex from "vuex";

import store from "./store";

Vue.use(Vuex);
console.log(store);
export default new Vuex.Store(store);
