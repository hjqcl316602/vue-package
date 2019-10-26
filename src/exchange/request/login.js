import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：登录
 */
export let loginIn = params => axios.post(config.http + "/uc/login", params);
/**
 * 时间：2019/9/22 ,
 * 描述：检测是否登录
 */
export let loginCheck = params => axios.post(config.http + "/uc/check/login");
/**
 * 时间：2019/9/22 ,
 * 描述：退出登录
 */
export let loginOut = params => axios.post(config.http + "/uc/loginout");
