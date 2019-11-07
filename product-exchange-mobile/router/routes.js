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

const orderFinish = r =>
  require.ensure(
    [],
    () => r(require("../view/order-finish.vue")),
    "orderFinish"
  );

const orderHand = r =>
  require.ensure([], () => r(require("../view/order-hand.vue")), "orderHand");

const orderAppeal = r =>
  require.ensure(
    [],
    () => r(require("../view/order-appeal.vue")),
    "orderAppeal"
  );

const orderCancel = r =>
  require.ensure(
    [],
    () => r(require("../view/order-cancel.vue")),
    "orderCancel"
  );

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
const accountFix = r =>
  require.ensure(
    [],
    () => r(require("../view/account-fix.vue")),
    "account-fix"
  );
const accountFixEdit = r =>
  require.ensure(
    [],
    () => r(require("../view/account-fix-edit.vue")),
    "account-fix-edit"
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
const customer = r =>
  require.ensure([], () => r(require("../view/customer.vue")), "customer");
const customerAppeal = r =>
  require.ensure(
    [],
    () => r(require("../view/customer-appeal.vue")),
    "customerAppeal"
  );
const routes = [
  { path: "*", redirect: "/user", meta: { hide: true } },
  { path: "/", redirect: "/user", meta: { hide: true } },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: "登录" }
  },
  {
    path: "/buy",
    name: "buy",
    component: buy,
    meta: { title: "购买广告" }
  },
  {
    path: "/sell",
    name: "sell",
    component: sell,
    meta: { title: "出售广告" }
  },
  {
    path: "/user",
    name: "user",
    component: user,
    meta: { title: "个人中心" }
  },
  {
    path: "/order",
    name: "order",
    component: order,
    meta: { title: "订单" }
  },
  {
    path: "/order-finish",
    name: "orderFinish",
    component: orderFinish,
    meta: { title: "已完成订单" }
  },
  {
    path: "/order-hand",
    name: "orderHand",
    component: orderHand,
    meta: { title: "未完成订单" }
  },
  {
    path: "/order-appeal",
    name: "orderAppeal",
    component: orderAppeal,
    meta: { title: "申诉中订单" }
  },
  {
    path: "/order-cancel",
    name: "orderCancel",
    component: orderCancel,
    meta: { title: "已取消订单" }
  },

  {
    path: "/order-detail",
    name: "orderDetail",
    component: orderDetail,
    meta: { title: "订单详情", next: [], prev: ["联系"] }
  },
  {
    path: "/advert",
    name: "advert",
    component: advert,
    meta: { title: "我的广告", next: ["发布"] }
  },
  {
    path: "/advert-edit/:type",
    name: "advert-edit",
    component: advertEdit,
    meta: { title: "广告编辑", next: ["保存"] }
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
    meta: { title: "我的账号", next: ["绑定"] }
  },
  {
    path: "/account-edit",
    name: "account-edit",
    component: accountEdit,
    meta: { title: "账号编辑", next: ["保存"] }
  },
  {
    path: "/account-fix",
    name: "account-fix",
    component: accountFix,
    meta: { title: "固码管理", next: ["绑定"] }
  },
  {
    path: "/account-fix-edit",
    name: "account-fix-edit",
    component: accountFixEdit,
    meta: { title: "固码绑定", next: ["保存"] }
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
  },
  {
    path: "/customer",
    name: "customer",
    component: customer,
    meta: { title: "客服" }
  },
  {
    path: "/customer-appeal",
    name: "customer-appeal",
    component: customerAppeal,
    meta: { title: "客服" }
  }
];
export default routes;
