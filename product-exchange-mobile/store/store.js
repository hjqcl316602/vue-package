import { storager } from "@package/es";
let basis = {};

const normal = {
  page: {
    message: {},
    cache: [],
    advertType: 1
  },
  user: {
    member: {},
    set: {
      moneyTotal: false,
      moneyToday: false
    }
  },
  login: {
    type: "remember:username",
    message: {},
    token: {}
  },
  order: {
    tradding: {},
    noticeType: ["type:voice", "type:flicker"],
    noticeDurationType: 5 * 1000
  },
  chat: {
    unread: 0
  }
};

basis.state = {
  page: {
    message: storager.getStore("app/page/message") || normal.page.message,
    cache: storager.getStore("app/page/cache") || normal.page.cache,
    advertType:
      storager.getStore("app/page/advertType") || normal.page.advertType
  },
  user: {
    member: storager.getStore("app/user/member") || normal.user.member,
    set: storager.getStore("app/user/set") || normal.user.set
  },
  login: {
    type: storager.getStore("app/login/type") || normal.login.type,
    message: storager.getStore("app/login/message") || normal.login.message,
    token: storager.getStore("app/login/token") || normal.login.token
  },
  order: {
    tradding: storager.getStore("app/order/tradding") || normal.order.tradding,
    noticeType:
      storager.getStore("app/order/noticeType") || normal.order.noticeType,
    noticeDurationType:
      storager.getStore("app/order/noticeDurationType") ||
      normal.order.noticeDurationType
  },
  chat: {
    unread: 0
  }
};

basis.mutations = {
  ["set/page/message"]({ page }, value) {
    storager.setStore("app/page/message", value);
    page.message = value;
  },
  ["set/page/cache"]({ page }, value) {
    page.cache.push(value);
    storager.setStore("app/page/cache", page.cache);
  },
  ["set/page/advertType"]({ page }, value) {
    page.advertType = value;
    storager.setStore("app/page/advertType", value);
  },
  ["set/user/member"]({ user }, value) {
    storager.setStore("app/user/member", value);
    user.member = value;
  },
  ["set/login/type"]({ login }, value) {
    storager.setStore("app/login/type", value);
    login.type = value;
  },
  ["set/login/message"]({ login }, value) {
    storager.setStore("app/login/message", value);
    login.message = value;
  },
  ["set/login/token"]({ login }, value) {
    storager.setStore("app/login/token", value);
    login.token = value;
  },
  ["set/user/set"]({ user }, { label, value }) {
    user.set[label] = value;
    storager.setStore("app/user/set", user.set);
  },
  ["set/order/tradding"]({ order }, value) {
    storager.setStore("app/order/tradding", value);
    order.tradding = value;
  },
  ["set/order/noticeType"]({ order }, value) {
    order.noticeType = value;
    storager.setStore("app/order/noticeType", order.noticeType);
  },
  ["set/order/noticeDurationType"]({ order }, value) {
    storager.setStore("app/order/noticeDurationType", value);
    order.noticeDurationType = value;
  },
  ["set/chat/unread"]({ chat }, value) {
    chat.unread = value;
  },
  clearStore(state) {
    storager.clearStore();

    state.page.message = normal.page.message;
    state.page.cache = normal.page.cache;
    state.page.advertType = normal.page.advertType;

    state.user.member = normal.user.member;
    state.user.set = normal.user.set;

    state.login.type = normal.login.type;
    state.login.message = normal.login.message;
    state.login.token = normal.login.token;

    state.order.noticeType = normal.order.noticeType;
    state.order.noticeDurationType = normal.order.noticeDurationType;
    state.order.tradding = normal.order.tradding;
  }
  // ["set/order/traddding"](state, value) {
  //   state.order.tradding = value;
  // },
  // ["set/login/cache/type"](state, value) {
  //   localStorage.setItem("login/cache/type", value);
  //   state.login.cache.type = value;
  // },
  // ["set/order/notice/duration"](state, value) {
  //   localStorage.setItem("order/notice/duration", value);
  //   state.order.notice.duration = value;
  // },
  // ["set/order/tab/type"](state, value) {
  //   localStorage.setItem("order/tab/type", value);
  //   state.order.tab.type = value;
  // },
  // ["set/money/total/show"](state, value) {
  //   localStorage.setItem("money/total/show", value);
  //   state.money.total.show = value;
  // }
};
basis.actions = {};
basis.getters = {};

export default basis;
