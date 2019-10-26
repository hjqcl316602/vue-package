/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 11:47:30
 * @LastEditTime: 2019-09-09 17:37:05
 * @LastEditors: Please set LastEditors
 */
const action = r =>
  require.ensure([], () => r(require("../view/action.vue")), "action");
const index = r =>
  require.ensure([], () => r(require("../view/index.vue")), "index");
const border = r =>
  require.ensure([], () => r(require("../view/border.vue")), "border");
const button = r =>
  require.ensure([], () => r(require("../view/button.vue")), "button");
const carousel = r =>
  require.ensure([], () => r(require("../view/carousel.vue")), "carousel");
const ellipsis = r =>
  require.ensure([], () => r(require("../view/ellipsis.vue")), "ellipsis");
const floater = r =>
  require.ensure([], () => r(require("../view/floater.vue")), "floater");
const grail = r =>
  require.ensure([], () => r(require("../view/grail.vue")), "grail");
const grid = r =>
  require.ensure([], () => r(require("../view/grid.vue")), "grid");
const icon = r =>
  require.ensure([], () => r(require("../view/icon.vue")), "icon");
const image = r =>
  require.ensure([], () => r(require("../view/image.vue")), "image");
const loading = r =>
  require.ensure([], () => r(require("../view/loading.vue")), "loading");
const loadingBar = r =>
  require.ensure([], () => r(require("../view/loading-bar.vue")), "loadingBar");
const loadmore = r =>
  require.ensure([], () => r(require("../view/loadmore.vue")), "loadmore");
const mask = r =>
  require.ensure([], () => r(require("../view/mask.vue")), "mask");
const message = r =>
  require.ensure([], () => r(require("../view/message.vue")), "message");
const notice = r =>
  require.ensure([], () => r(require("../view/notice.vue")), "notice");
const noticeBar = r =>
  require.ensure([], () => r(require("../view/notice-bar.vue")), "noticeBar");
const popup = r =>
  require.ensure([], () => r(require("../view/popup.vue")), "popup");
const ratio = r =>
  require.ensure([], () => r(require("../view/ratio.vue")), "ratio");
const style = r =>
  require.ensure([], () => r(require("../view/style.vue")), "style");
const swipeCell = r =>
  require.ensure([], () => r(require("../view/swipe-cell.vue")), "swipeCell");
const tab = r => require.ensure([], () => r(require("../view/tab.vue")), "tab");
const tag = r => require.ensure([], () => r(require("../view/tag.vue")), "tag");

const routes = [
  { path: "*", redirect: "/index", meta: { hide: true } },
  { path: "/", redirect: "/index", meta: { hide: true } },
  {
    path: "/index",
    name: "index",
    component: index,
    meta: { hide: true, title: "组件库" }
  },
  {
    path: "/action",
    name: "action",
    component: action,
    meta: { title: "上拉菜单", en: "action" }
  },
  {
    path: "/border",
    name: "border",
    component: border,
    meta: { title: "边框", en: "border" }
  },
  {
    path: "/button",
    name: "button",
    component: button,
    meta: { title: "按钮", en: "button" }
  },
  {
    path: "/carousel",
    name: "carousel",
    component: carousel,
    meta: { title: "轮播", en: "carousel" }
  },
  {
    path: "/ellipsis",
    name: "ellipsis",
    component: ellipsis,
    meta: { title: "文本截断", en: "ellipsis" }
  },
  {
    path: "/floater",
    name: "floater",
    component: floater,
    meta: { title: "悬浮", en: "floater" }
  },
  {
    path: "/grail",
    name: "grail",
    component: grail,
    meta: { title: "圣杯布局", en: "grail" }
  },
  {
    path: "/grid",
    name: "grid",
    component: grid,
    meta: { title: "栅格布局", en: "grid" }
  },
  {
    path: "/icon",
    name: "icon",
    component: icon,
    meta: { title: "图标", en: "icon" }
  },
  {
    path: "/image",
    name: "image",
    component: image,
    meta: { title: "图片", en: "image" }
  },
  {
    path: "/loading",
    name: "loading",
    component: loading,
    meta: { title: "加载动画", en: "loading" }
  },
  {
    path: "/loading-bar",
    name: "loading-bar",
    component: loadingBar,
    meta: { title: "加载进度条", en: "loading-bar" }
  },
  {
    path: "/loadmore",
    name: "loadmore",
    component: loadmore,
    meta: { title: "加载更多", en: "loadmore" }
  },
  {
    path: "/mask",
    name: "mask",
    component: mask,
    meta: { title: "遮罩层", en: "mask" }
  },
  {
    path: "/message",
    name: "message",
    component: message,
    meta: { title: "轻提示", en: "message" }
  },
  {
    path: "/notice",
    name: "notice",
    component: notice,
    meta: { title: "通知", en: "notice" }
  },
  {
    path: "/notice-bar",
    name: "noticeBar",
    component: noticeBar,
    meta: { title: "通知栏", en: "notice-bar" }
  },
  {
    path: "/popup",
    name: "popup",
    component: popup,
    meta: { title: "弹框", en: "popup" }
  },
  {
    path: "/ratio",
    name: "ratio",
    component: ratio,
    meta: { title: "等比例尺寸", en: "ratio" }
  },
  {
    path: "/style",
    name: "style",
    component: style,
    meta: { title: "样式", en: "style" }
  },
  {
    path: "/swipe-cell",
    name: "swipeCell",
    component: swipeCell,
    meta: { title: "滑动单元格", en: "swipeCell" }
  },
  {
    path: "/tab",
    name: "tab",
    component: tab,
    meta: { title: "标签", en: "tab" }
  },
  {
    path: "/tag",
    name: "tag",
    component: tag,
    meta: { title: "标记", en: "tag" }
  }
];
export default routes;
