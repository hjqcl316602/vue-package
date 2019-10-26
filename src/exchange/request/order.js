import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：获取未处理订单
 * params :{
         pageNo:
 * }
 */
export let getTraddingOrder = params =>
  axios.post(config.http + "/otc/order/traddingOrder", params, {
    headers: {
      closeLoading: true
    }
  });

/**
 * 时间：2019/9/22 ,
 * 描述：充值订单（币商是卖出订单,提现订单）
 */
export let getWidthdrawOrder = params =>
  axios.post(config.http + "/otc/order/goToConfirm", params);
/**
 * 时间：2019/9/22 ,
 * 描述：提现订单（币商是买入订单,充值订单）
 */
export let getRechargeOrder = params =>
  axios.post(config.http + "/otc/order/goToPay", params);
/**
 * 时间：2019/9/22 ,
 * 描述：未处理订单
 */
export let getPayConfirmOrder = params =>
  axios.post(config.http + "/otc/order/goToPayOrConfirm", params);
/**
 * 时间：2019/9/22 ,
 * 描述：申诉订单
 */
export let getAppealOrder = params =>
  axios.post(config.http + "/otc/order/appealOrder", params);
/**
 * 时间：2019/9/22 ,
 * 描述：放行
 * params :{
 *     orderSn,
 *     jyPassword
 * }
 */
export let release = params =>
  axios.post(config.http + "/otc/order/release", params);
/**
 * 时间：2019/9/22 ,
 * 描述：订单详情
 */
export let getOrderDetail = params =>
  axios.post(config.http + "/otc/order/detail", params);

/**
 * 时间：2019/9/22 ,
 * 描述：关闭订单
 */
export let closeAppealOrder = params =>
  axios.post(config.http + "/otc/order/closeAppealOrder", params);

/**
 * 时间：2019/9/22 ,
 * 描述：获取订单
 * params :{
         pageNo:
         pageSize:
         status:
 * }
 */
export let getOrder = params =>
  axios.post(config.http + "/otc/order/self", params);
/**
 * 时间：2019/9/22 ,
 * 描述：完成付款
 * params :{
         orderSn:
 * }
 */
export let setOrderPay = params =>
  axios.post(config.http + "/otc/order/pay", params);
