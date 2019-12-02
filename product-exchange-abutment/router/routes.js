const error = r =>
  require.ensure([], () => r(require("../view/error.vue")), "error");
const payStatus = r =>
  require.ensure([], () => r(require("../view/pay-status.vue")), "payStatus");

const drawStatus = r =>
  require.ensure([], () => r(require("../view/draw-status.vue")), "drawStatus");

const pay = r => require.ensure([], () => r(require("../view/pay.vue")), "pay");

const alipay = r =>
  require.ensure([], () => r(require("../view/alipay.vue")), "alipay");

const customDetail = r =>
  require.ensure(
    [],
    () => r(require("../view/custom-detail.vue")),
    "custom-detail"
  );
const draw = r =>
  require.ensure([], () => r(require("@/view/draw.vue")), "draw");
const routes = [
  { path: "*", redirect: "/error" },
  { path: "/", redirect: "/error" },
  { path: "/error", name: "Error", component: error, meta: { title: "反馈" } },
  {
    path: "/payStatus/:accessToken/:appId",
    name: "PayStatus",
    component: payStatus,
    meta: { title: "支付状态" }
  },
  {
    path: "/pay/:accessToken/:token/:payType/:appId",
    name: "Pay",
    component: pay,
    meta: { title: "支付" }
  },
  {
    path: "/alipay/:token/:payType",
    name: "alipay",
    component: alipay,
    meta: { title: "支付宝" }
  },
  {
    path: "/custom/detail/:appId/:accessToken",
    name: "CustomDetail",
    component: customDetail,
    meta: { title: "申诉详情" }
  },
  {
    path: "/draw/:accessToken/:token/:appId",
    name: "Draw",
    component: draw,
    meta: { title: "提现" }
  },
  {
    path: "/drawStatus/:accessToken/:appId",
    name: "DrawStatus",
    component: drawStatus,
    meta: { title: "提现状态" }
  }
];
export default routes;
