/**
 * created by 41587 on 2019/11/4
 */
import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：获取客服聊天信息
 * params :{
         pageNo:
 * }
 */
export let getHistoryMessageCdPKf = params =>
  axios.post(config.http + "/chat/getHistoryMessageCdPKf.do", params);

/**
 * 时间：2019/9/22 ,
 * 描述：获取订单申诉聊天信息
 * params :{
         pageNo:
 * }
 */
export let getHistoryMessageCdToKf = params =>
  axios.post(config.http + "/chat/getHistoryMessageCdToKf.do", params);

/**
 * 时间：2019/9/22 ,
 * 描述：获取未读的用户信息
 * params :{
         pageNo:
 * }
 */
export let getCdUnRead = params =>
  axios.post(config.http + "/chat/cdUnRead.do", params);
