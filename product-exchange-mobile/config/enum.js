/**
 * created by 41587 on 2019/10/26
 */

let getTypes = function(storage, target, type = "value") {
  return storage.find(ele => ele[type] === target);
};

// 广告类型
let advertTypes = [
  {
    text: "银联",
    icon: "&#xe636;",
    color: "#e1bf53",
    value: 1
  },
  {
    text: "微信",
    icon: "&#xe7ba;",
    color: "#22aa3e",
    value: 2
  },
  {
    text: "支付宝",
    icon: "&#xe608;",
    color: "#118eea",
    value: 3
  },
  {
    text: "云闪付",
    icon: "&#xe68b;",
    color: "#f9291f",
    value: 4
  },
  {
    text: "聚合码",
    icon: "&#xe838;",
    color: "#ff23ce",
    value: 5
  },
  {
    text: "动态码",
    icon: "&#xe662;",
    color: "#f90",
    value: 6
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

let noticeTypes = [
  {
    text: "语音",
    value: "type:voice",
    open: true
  },
  {
    text: "闪烁",
    value: "type:flicker",
    open: true
  }
];
let getNoticeTypes = (target, type) => getTypes(noticeTypes, target, type);

let noticeDurationTypes = [
  {
    text: "5秒钟",
    value: 5 * 1000,
    open: true
  },
  {
    text: "10秒钟",
    value: 10 * 1000,
    open: false
  },
  {
    text: "15秒钟",
    value: 15 * 1000,
    open: false
  },
  {
    text: "20秒钟",
    value: 20 * 1000,
    open: false
  },
  {
    text: "25秒钟",
    value: 25 * 1000,
    open: false
  },
  {
    text: "30秒钟",
    value: 30 * 1000,
    open: false
  }
];
let getNoticeDurationTypes = (target, type) =>
  getTypes(noticeDurationTypes, target, type);

const orderStatusTypes = [
  { value: 0, text: "已取消", className: "vi-color--light" },
  { value: 1, text: "等待付款", className: "vi-color--warning" },
  { value: 2, text: "等待放行", className: "vi-color--success" },
  { value: 3, text: "已完成", className: "" },
  { value: 4, text: "申诉中", className: "vi-color--danger" }
];
let getOrderStatusTypes = (target, type) =>
  getTypes(orderStatusTypes, target, type);

export default {
  advertTypes,
  getAdvertTypes,
  transactionTypes,
  getTransactionTypes,
  advertStatusTypes,
  getAdvertStatusTypes,
  accountStatusTypes,
  getAccountStatusTypes,
  loginTypes,
  getLoginTypes,
  noticeTypes,
  getNoticeTypes,
  noticeDurationTypes,
  getNoticeDurationTypes,
  orderStatusTypes,
  getOrderStatusTypes
};
