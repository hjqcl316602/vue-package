import Vue from "vue";
import {
  iconHeadNormal,
  iconAli,
  iconWx,
  iconUnion,
  iconCard,
  iconPolymer
} from "../image";

let getTypes = function(storage, target, type = "value") {
  return storage.find(ele => ele[type] === target);
};

// 广告类型
let advertTypes = [
  {
    text: "银联",
    icon: iconCard,
    value: 1
  },
  {
    text: "微信",
    icon: iconWx,
    value: 2
  },
  {
    text: "支付宝",
    icon: iconAli,
    value: 3
  },
  {
    text: "云闪付",
    icon: iconUnion,
    value: 4
  },
  {
    text: "聚合码",
    icon: iconPolymer,
    value: 5
  }
];
let getAdvertTypes = (target, type) => getTypes(advertTypes, target, type);

// 交易类型
let transactionTypes = [
  {
    text: "在线出售",
    value: 1
  },
  {
    text: "在线购买",
    value: 0
  }
];
let getTransactionTypes = (target, type) =>
  getTypes(transactionTypes, target, type);

// 广告状态类型
let advertStatusTypes = [
  {
    text: "上架中",
    value: 0
  },
  {
    text: "待上架",
    value: 1
  }
];
let getAdvertStatusTypes = (target, type) =>
  getTypes(advertStatusTypes, target, type);

let accountStatusTypes = [
  {
    text: "已开启",
    value: 1
  },
  {
    text: "待开启",
    value: 0
  }
];
let getAccountStatusTypes = (target, type) =>
  getTypes(accountStatusTypes, target, type);

let loginTypes = [
  { text: "记住账号", value: "remember:username" },
  { text: "记住账号和密码", value: "remember:usernameAndPassword" },
  { text: "均不", value: "remember:none" }
];
let getLoginTypes = (target, type) => getTypes(loginTypes, target, type);

Vue.prototype.$getAdvertTypes = getAdvertTypes;
Vue.prototype.$getTransactionTypes = getTransactionTypes;
Vue.prototype.$getAdvertStatusTypes = getAdvertStatusTypes;
Vue.prototype.$getAccountStatusTypes = getAccountStatusTypes;
Vue.prototype.$getLoginTypes = getLoginTypes;

export {
  advertTypes,
  getAdvertTypes,
  transactionTypes,
  getTransactionTypes,
  advertStatusTypes,
  getAdvertStatusTypes,
  accountStatusTypes,
  getAccountStatusTypes,
  loginTypes,
  getLoginTypes
};
