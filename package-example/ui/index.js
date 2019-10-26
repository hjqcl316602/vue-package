/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 11:47:30
 * @LastEditTime: 2019-09-02 23:08:34
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import * as UI from "../../package/ui/index";

let uiKeys = Object.keys(UI);
uiKeys.forEach(ele => {
  if (UI[ele] && UI[ele]["install"]) {
    Vue.use(UI[ele]);
  }
});
