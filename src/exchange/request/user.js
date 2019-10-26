/**
 * created by 41587 on 2019/9/28
 */
import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：更新密码
 * params :{
         oldPassword:
         newPassword:
 * }
 */
export let updatePassword = params =>
  axios.post(config.http + "/uc/approve/update/transaction/password", params);

/**
 * 时间：2019/9/22 ,
 * 描述：推广信息
 * params :{
 * }
 */
export let getAgencyMessage = params =>
  axios.post(config.http + "/uc/agency/info", params);

/**
 * 时间：2019/9/22 ,
 * 描述：绑定推荐人
 * params :{
 * }
 */
export let bindAgency = params =>
  axios.post(config.http + "/uc/agency/bind", params);

/**
 * 时间：2019/9/22 ,
 * 描述：修改分成比例
 * params :{
 *  memberId:
 *  bonusPercent:
 * }
 */
export let updateAgencyPercent = params =>
  axios.post(config.http + "/uc/agency/updateAgencyPercent", params);
