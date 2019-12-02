import axios from "axios";
import qs from "qs";
import Loading from "@package/ui/loading";
import Message from "@package/ui/message";
import { storager } from "@package/es";

let msg = {
  request: "请求失败，请检查参数！",
  noNetwork: "网络错误，请检查网络！",
  timeOut: "请求超时，请重新刷新页面！",
  aborted: "连接中断，请重试！",
  unKnown: "异常，未知错误，请重试！"
};

let instance = axios.create({
  url: "",
  method: "",
  baseURL: "",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //"Content-Type": "application/json;charset=utf-8"
  },
  withCredentials: true,
  responseType: "json",
  maxContentLength: 2000,
  timeout: 0
});

instance.interceptors.request.use(res => {
  let { loading, upload } = res.headers;
  loading && Loading.show();
  if (!upload) {
    res["data"] = qs.stringify(res["data"], { arrayFormat: "brackets" });
  }

  return res;
});

instance.interceptors.response.use(
  ({ config, status, data }) => {
    let { loading, loadingLeastTime = 300 } = config.headers;
    if (loading) {
      setTimeout(() => {
        Loading.clear();
      }, loadingLeastTime);
    }
    if (status >= 200 || status <= 300) {
      return Promise.resolve(data);
    }
  },
  err => {
    Loading.clear();
    let errMsg = err["message"];
    if (errMsg.includes("timeout")) {
      Message.danger(msg["timeOut"]);
    } else if (errMsg.includes("Network")) {
      Message.danger(msg["noNetwork"]);
    } else if (errMsg.includes("aborted")) {
      Message.danger(msg["aborted"]);
    } else {
      Message.danger(msg["unKnown"]);
    }

    return Promise.reject(errMsg);
  }
);

export default instance;
