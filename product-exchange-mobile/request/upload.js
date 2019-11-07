/**
 * created by 41587 on 2019/9/28
 */
import axios from "./instance";
import config from "../config";

/**
 * 时间：2019/9/22 ,
 * 描述：上传图片
 * params :{
 * }
 */
export let uploadCompressImage = params =>
  axios.post(config.http + "/res/upload/image/compress.do", params, {
    headers: { upload: true }
  });

/**
 * 时间：2019/9/22 ,
 * 描述：解析并上传
 * params :{
 * }
 */
export let uploadQrImage = params =>
  axios.post(config.http + "/res/upload/image/qr.do", params, {
    headers: { upload: true }
  });
