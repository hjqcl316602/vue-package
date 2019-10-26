import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：获取资产流水
 * params :{
         pageNo: 1 // 页数
         pageSize: 10 // 每页数量
         advertiseType: 1 // 1-买入 0-卖出
        startTime:  // 开始时间
        endTime:  // 结束时间
        type: //类型
        symbol: //币种
 * }
 */
export let getTransaction = params =>
  axios.post(config.http + "/uc/asset/transaction/all", params);

/**
 * 时间：2019/9/22 ,
 * 描述：我的钱包
 */
export let getWallet = params =>
  axios.post(config.http + "/uc/asset/wallet", params);

/**
 * 时间：2019/9/22 ,
 * 描述：转账的账号簿
 */
export let getTransferHis = params =>
  axios.post(config.http + "/otc/transfer/transferHis", params);

/**
 * 时间：2019/9/22 ,
 * 描述：转账
 */
export let transferToUser = params =>
  axios.post(config.http + "/otc/transfer/transferToUser", params);

/**
 * 时间：2019/9/22 ,
 * 描述：订单转账
 */
export let transferToOrder = params =>
  axios.post(config.http + "/otc/order/directTransfer", params);

/**
 * 时间：2019/9/22 ,
 * 描述：我的账号
 */
export let getAccount = params =>
  axios.post(config.http + "/uc/approve/account/setting", params);
/**
 * 时间：2019/9/22 ,
 * 描述：删除账号
 * params :{
 * id : // 账号id
 * jsPassword : // 密码
 * }
 */
export let deleteAccount = params =>
  axios.post(config.http + "/uc/approve/delete/payInfo", params);
/**
 * 时间：2019/9/22 ,
 * 描述：账号开启和关闭
 * params :{
 * id : // 账号id
 * jsPassword : // 密码
 * checked: //账号状态
 * type: // 账号类型
 * }
 */
export let toggleAccount = params =>
  axios.post(config.http + "/uc/approve/toggle/payInfo", params);

/**
 * 时间：2019/9/22 ,
 * 描述：收款金额
 * params :{
 * startTime : // 开始时间
 * endTime:   // 结束时间
 * }
 */
export let getWithdraw = params =>
  axios.post(config.http + "/uc/asset/transaction/withdraw", params);

/**
 * 时间：2019/9/22 ,
 * 描述：获取开户行
 * params :{
 * cardNo：卡号
 * }
 */
export let getCardDetail = params =>
  axios.post(config.http + "/p/co/cardDetail.do", params);

/**
 * 时间：2019/9/22 ,
 * 描述：获取开户行
 * params :{
    type:
    name:  // 开户行
    realName:  // 银行卡真实姓名
    url:   // 卡号
    alipayOrMask: // 银行简称
    jyPassword:
 * }
 */
export let createAccount = params =>
  axios.post(config.http + "/uc/approve/bind/payInfo", params);
