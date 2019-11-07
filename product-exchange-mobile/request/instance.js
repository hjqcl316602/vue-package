import axios from "axios";
import qs from "qs";
import LoadingBar from "../../package/ui/loading-bar";
import Message from "../../package/ui/message";
import store from "../store";
import router from "../router";
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
  timeout: 20 * 1000
});

instance.interceptors.request.use(
  res => {
    let upload = res.headers.upload;
    let closeLoading = res.headers.closeLoading;
    res["headers"]["x-auth-token"] = storager.getStore("app/login/token") || "";
    if (!upload) {
      res["data"] = qs.stringify(res["data"], { arrayFormat: "brackets" });
    }
    if (!closeLoading) {
      LoadingBar.start(80);
    }
    return res;
  },
  err => {
    //Toast(msg['request'])
  }
);

instance.interceptors.response.use(
  res => {
    LoadingBar.finish();
    let status = res["status"];
    if (status >= 200 || status <= 300) {
      let data = res["data"];
      let code = data["code"];
      if (code === 3000 || code === 4000) {
        localStorage.setItem("login/redirect", window.location.href);
        store.commit("set/member", null);
        router.push("/login");
      } else {
        return Promise.resolve(res);
      }
    } else {
      //return Promise.reject(res);
    }
  },
  err => {
    LoadingBar.finish();
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
