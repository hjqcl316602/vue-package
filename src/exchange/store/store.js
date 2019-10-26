import Package from "../../../package/es/global";
let basis = {};

let member = localStorage.getItem("member");
let loginCacheType = localStorage.getItem("login/cache/type");
let orderNoticeDuration = localStorage.getItem("order/notice/duration");
let orderTabType = localStorage.getItem("order/tab/type");
let moneyTotalShow = localStorage.getItem("money/total/show");

basis.state = {
  page: {
    message: Package.getStore("page/message") || {}
  },
  member: member ? JSON.parse(member) : {},
  order: {
    tradding: {},
    notice: {
      duration: orderNoticeDuration || 5000
    },
    tab: {
      type: orderTabType || "3"
    }
  },
  login: {
    cache: {
      type: loginCacheType || 1
    }
  },
  money: {
    total: {
      show: moneyTotalShow || "no"
    }
  }
};

basis.mutations = {
  ["set/page/message"]({ page }, value) {
    Package.setStore("page/message", value);
    page.message = value;
  },
  ["set/member"](state, value) {
    localStorage.setItem("member", JSON.stringify(value));
    state.member = value;
  },
  ["set/order/traddding"](state, value) {
    state.order.tradding = value;
  },
  ["set/login/cache/type"](state, value) {
    localStorage.setItem("login/cache/type", value);
    state.login.cache.type = value;
  },
  ["set/order/notice/duration"](state, value) {
    localStorage.setItem("order/notice/duration", value);
    state.order.notice.duration = value;
  },
  ["set/order/tab/type"](state, value) {
    localStorage.setItem("order/tab/type", value);
    state.order.tab.type = value;
  },
  ["set/money/total/show"](state, value) {
    localStorage.setItem("money/total/show", value);
    state.money.total.show = value;
  }
};
basis.actions = {};
basis.getters = {};

export default basis;
