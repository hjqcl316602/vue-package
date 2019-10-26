import Vue from "vue";
import { router, store, root } from "./exchange";

new Vue({
  el: "#app",
  router,
  store,
  components: { root },
  template: "<root/>"
});
