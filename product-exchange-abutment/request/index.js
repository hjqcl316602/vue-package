import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：获取资产流水
 * params :{
         accessToken:''
 * }
 */
export let getOrderMessage = (data, options) =>
  axios.post(config.http + "/p/pay/paySuccess.do", data, { headers: options });

/**
 * 时间：2019/9/22 ,
 * 描述：获取动态二维码
 * params :{
         accessToken:''
 * }
 */
export let getDynamicUrl = (data, options) =>
  axios.post(config.http + "/p/pay/getDynamicUrl.do", data, {
    headers: options
  });

/**
 * 时间：2019/9/22 ,
 * 描述：取消订单
 * params :{
        accessToken: params.accessToken,
 * }
 */
export let cancelOrder = (data, options) =>
  axios.post(config.http + "/p/pay/withdrawCancel.do", data, {
    headers: options
  });

/**
 * 时间：2019/9/22 ,
 * 描述：获取申诉订单详情
 * params :{
        accessToken: params.accessToken,
        appId: params.appId,
        orderId: params.orderId
 * }
 */
export let getOrderDetail = (data, options) =>
  axios.post(config.http + "/p/custom/appealDetail.do", data, {
    headers: options
  });

/**
 * 时间：2019/9/22 ,
 * 描述：获取聊天信息
 * params :{
        orderId: params.orderId,
        minChatId: params.minChatId,
        appId: params.appId,
        accessToken: params.accessToken
 * }
 */
export let getChatHistory = (data, options) =>
  axios.post(config.http + "/chat/getHistoryMessageKh.do", data, {
    headers: options
  });

/**
 * 时间：2019/9/22 ,
 * 描述：获取银行信息
 * params :{
        cardNo: params.cardNo
 * }
 */
export let getCardDetail = (data, options) =>
  axios.post(config.http + "/p/co/cardDetail.do", data, {
    headers: options
  });

/**
 * 时间：2019/9/22 ,
 * 描述：提现
 * params :{

 * }
 */
export let createDraw = (data, options = { loading: true }) =>
  axios.post(config.http + "/p/pay/withdraw.do", data, {
    headers: options
  });
/**
 * 时间：2019/9/22 ,
 * 描述：上传图片
 * params :{
 * }
 */
export let uploadCompressImage = params =>
  axios.post(config.http + "/res/upload/image/compress.do", params, {
    headers: { loading: true, upload: true }
  });
/**
 * 时间：2019/9/22 ,
 * 描述：上传二维码图片
 * params :{
 * }
 */
export let uploadQrImage = params =>
  axios.post(config.http + "/res/upload/image/qr.do", params, {
    headers: { loading: true, upload: true }
  });

let Stomp = require("stompjs");

let SockJS = require("sockjs-client");

export let createSocket = (url = "/chat/socket/chat-webSocket") => {
  let stompClient = null;
  let http = config.http + url;
  let socket = new SockJS(http);
  stompClient = Stomp.over(socket);
  stompClient.debug = false;
  return stompClient;
};
