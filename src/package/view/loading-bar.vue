<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 09:40:57
 * @LastEditTime: 2019-09-03 18:34:23
 * @LastEditors: Please set LastEditors
 -->
<script>
import Vue from "vue";
import { LoadingBar } from "../../../package/ui/index";

const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {};
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {
  LoadingBar.start(40);
  setTimeout(() => {
    LoadingBar.update(60);
  }, 1000);
  setTimeout(() => {
    LoadingBar.update(80);
  }, 2000);
  setTimeout(() => {
    LoadingBar.finish();
  }, 3000);
};
export default instance;
</script>

<template>
  <div class="" style="padding:20px"></div>
</template>

<style scoped></style>
