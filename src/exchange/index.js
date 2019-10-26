import Vue from "vue";
import root from "./App";
import router from "./router";
import store from "./store";
import enums from "./config/enum";
import packages from "../../package/es/global";
import "./style/index.less";
import "./ui/index.js";

let enumKeys = Object.keys(enums);
enumKeys.forEach(ele => {
  Vue.prototype[ele] = enums[ele];
});

let packageKeys = Object.keys(packages);
packageKeys.forEach(ele => {
  Vue.prototype[ele] = packages[ele];
});

export { root, router, store };
