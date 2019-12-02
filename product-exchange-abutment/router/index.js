/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 11:47:30
 * @LastEditTime: 2019-08-11 09:18:02
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

const route = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
  routes: routes
});

route.beforeEach((to, from, next) => {
  //console.log(from, to);
  document.title = to["meta"]["title"];
  next();
});
export default route;
