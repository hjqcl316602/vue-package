const login = r =>
  require.ensure([], () => r(require("../view/login.vue")), "login");
const sell = r =>
  require.ensure([], () => r(require("../view/sell.vue")), "sell");
const buy = r => require.ensure([], () => r(require("../view/buy.vue")), "buy");
const user = r =>
  require.ensure([], () => r(require("../view/user.vue")), "user");
const order = r =>
  require.ensure([], () => r(require("../view/order.vue")), "order");
const orderList = r =>
  require.ensure([], () => r(require("../view/order-list.vue")), "orderList");

const orderDetail = r =>
  require.ensure(
    [],
    () => r(require("../view/order-detail.vue")),
    "orderDetail"
  );
const record = r =>
  require.ensure([], () => r(require("../view/record.vue")), "record");
const money = r =>
  require.ensure([], () => r(require("../view/money.vue")), "money");
const advert = r =>
  require.ensure([], () => r(require("../view/advert.vue")), "advert");
const advertDetail = r =>
  require.ensure(
    [],
    () => r(require("../view/advert-detail.vue")),
    "advert-detail"
  );
const advertEdit = r =>
  require.ensure(
    [],
    () => r(require("../view/advert-edit.vue")),
    "advert-edit"
  );
const account = r =>
  require.ensure([], () => r(require("../view/account.vue")), "account");
const accountEdit = r =>
  require.ensure(
    [],
    () => r(require("../view/account-edit.vue")),
    "account-edit"
  );
const accountDetail = r =>
  require.ensure(
    [],
    () => r(require("../view/account-detail.vue")),
    "accountDetail"
  );
const transfer = r =>
  require.ensure([], () => r(require("../view/transfer.vue")), "transfer");
const confirm = r =>
  require.ensure([], () => r(require("../view/confirm.vue")), "confirm");
const set = r => require.ensure([], () => r(require("../view/set.vue")), "set");
const password = r =>
  require.ensure([], () => r(require("../view/password.vue")), "password");
const team = r =>
  require.ensure([], () => r(require("../view/team.vue")), "team");
const teamBind = r =>
  require.ensure([], () => r(require("../view/team-bind.vue")), "team-bind");
const teamList = r =>
  require.ensure([], () => r(require("../view/team-list.vue")), "team-list");
const teamDetail = r =>
  require.ensure(
    [],
    () => r(require("../view/team-detail.vue")),
    "team-detail"
  );
const teamUpdate = r =>
  require.ensure(
    [],
    () => r(require("../view/team-update.vue")),
    "team-update"
  );
const routes = [
  { path: "*", redirect: "/login", meta: { hide: true } },
  { path: "/", redirect: "/login", meta: { hide: true } },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: "登录", buttons: ["登录"] }
  },
  {
    path: "/buy",
    name: "buy",
    component: buy,
    meta: { title: "买入订单" }
  },
  {
    path: "/sell",
    name: "sell",
    component: sell,
    meta: { title: "卖出订单" }
  },
  {
    path: "/user",
    name: "user",
    component: user,
    meta: { title: "我的" }
  },
  {
    path: "/order",
    name: "order",
    component: order,
    meta: { title: "订单" }
  },
  {
    path: "/order-list",
    name: "orderList",
    component: orderList,
    meta: { title: "订单" }
  },

  {
    path: "/order-detail",
    name: "orderDetail",
    component: orderDetail,
    meta: { title: "订单详情" }
  },
  {
    path: "/advert",
    name: "advert",
    component: advert,
    meta: { title: "我的广告" }
  },
  {
    path: "/advert-edit/:type",
    name: "advert-edit",
    component: advertEdit,
    meta: { title: "广告编辑" }
  },
  {
    path: "/advert-detail",
    name: "advert-detail",
    component: advertDetail,
    meta: { title: "详情" }
  },
  {
    path: "/account",
    name: "account",
    component: account,
    meta: { title: "我的账号" }
  },
  {
    path: "/account-edit",
    name: "account-edit",
    component: accountEdit,
    meta: { title: "账号编辑" }
  },
  {
    path: "/account-detail",
    name: "account-detail",
    component: accountDetail,
    meta: { title: "账号详情" }
  },
  {
    path: "/money",
    name: "money",
    component: money,
    meta: { title: "我的钱包" }
  },
  {
    path: "/record",
    name: "record",
    component: record,
    meta: { title: "资产流水" }
  },
  {
    path: "/transfer",
    name: "transfer",
    component: transfer,
    meta: { title: "转账" }
  },
  {
    path: "/confirm",
    name: "confirm",
    component: confirm,
    meta: { title: "信息确认" }
  },
  {
    path: "/set",
    name: "set",
    component: set,
    meta: { title: "设置" }
  },
  {
    path: "/password",
    name: "password",
    component: password,
    meta: { title: "资金密码" }
  },
  {
    path: "/team",
    name: "team",
    component: team,
    meta: { title: "推广" }
  },
  {
    path: "/team-bind",
    name: "team-bind",
    component: teamBind,
    meta: { title: "绑定推广人" }
  },
  {
    path: "/team-list",
    name: "team-list",
    component: teamList,
    meta: { title: "我的团队" }
  },
  {
    path: "/team-detail",
    name: "team-detail",
    component: teamDetail,
    meta: { title: "成员详情" }
  },
  {
    path: "/team-update",
    name: "team-update",
    component: teamUpdate,
    meta: { title: "更新成员分成比例" }
  }
];
export default routes;
