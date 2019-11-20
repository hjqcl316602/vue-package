import Vue from "vue";
import "./theme/index.less";
import "./ui/index.js";
import root from "./App";
import router from "./router";
import store from "./store";

import "@package/3d/d6";
new Vue({
  el: "#app",
  router,
  store,
  components: { root },
  template: "<root/>"
});
