import Vue from "vue";
import App from "@/App";
import Router from "@/router";
import Store from "@/store";
import "@/style/index.less";
import "@/ui/index.js";
import "@/filter";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
/********************* 添加 enum *********************/
import enums from "./config/enum";
let enumKeys = Object.keys(enums);
enumKeys.forEach(key => {
  Vue.prototype["$" + key] = enums[key];
});

new Vue({
  el: "#app",
  router: Router,
  store: Store,
  components: { App },
  template: "<App/>"
});
