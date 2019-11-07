import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：首页广告
 * params :{
         pageNo: 1 // 页数
         pageSize: 10 // 每页数量
         advertiseType: 1 // 1-买入 0-卖出
        unit: ttm // 币种类型
 * }
 */
export let getAdvertise = params =>
  axios.post(config.http + "/otc/advertise/page-by-unit", params);

/**
 * 时间：2019/9/22 ,
 * 描述：我的广告
 * params :{
         pageNo: 1 // 页数
         pageSize: 10 // 每页数量
         advertiseType: 1 // 1-买入 0-卖出
        unit: ttm // 币种类型
 * }
 */
export let getAdvertiseAll = params =>
  axios.post(config.http + "/otc/advertise/all", params);
/**
 * 时间：2019/9/22 ,
 * 描述：开启广告
 * params :{
         id:   // 编号
 * }
 */
export let onAdvertise = params =>
  axios.post(config.http + "/otc/advertise/on/shelves", params);

/**
 * 时间：2019/9/22 ,
 * 描述：关闭广告
 * params :{
         id: // 编号

 * }
 */
export let offAdvertise = params =>
  axios.post(config.http + "/otc/advertise/off/shelves", params);

/**
 * 时间：2019/9/22 ,
 * 描述：创建广告
 * params :{
      number: '',
      pay: [],
      jyPassword: '',
      minLimit: '', // 可不填
      maxLimit: '', // 可不填
      advertiseType: ''
 * }
 */
export let createAdvertise = params =>
  axios.post(config.http + "/otc/advertise/createStable", params);

/**
 * 时间：2019/9/22 ,
 * 描述：更新广告
 * params :{
 *    id:''
      number: '',
      pay: [],
      jyPassword: '',
      minLimit: '', // 可不填
      maxLimit: '', // 可不填
      advertiseType: ''
 * }
 */
export let updateAdvertise = params =>
  axios.post(config.http + "/otc/advertise/updateStable", params);

/**
 * 时间：2019/9/22 ,
 * 描述：保存广告
 * params :{
         id: // 编号
 * }
 */
export let deleteAdvertise = params =>
  axios.post(config.http + "/otc/advertise/delete", params);

/**
 * 时间：2019/9/22 ,
 * 描述：获取广告的基本限制
 * params :{
         id: // 编号
 * }
 */
export let getAdvertiseInit = params =>
  axios.post(config.http + "/otc/advertise/init", params);
