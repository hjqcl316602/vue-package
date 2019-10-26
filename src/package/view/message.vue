<!--
 * @Description: In User Settings Editcolor
 * @Author: your name
 * @Date: 2019-09-04 11:12:45
 * @LastEditTime: 2019-09-04 11:29:39
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {};
};
instance.computed = {};
instance.methods = {
  show(type, duration = 1500, lock = false) {
    this.$message[type](type, duration, lock);
  }
};
instance.created = function() {};
instance.mounted = function() {};
instance.watch = {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">默认</div>
        <div class="vui-text--light"></div>
      </div>
      <div>
        <vui-button @click="show('primary')" color="primary" pack
          >primary</vui-button
        >
        <vui-button @click="show('danger')" color="danger" pack
          >danger</vui-button
        >
        <vui-button @click="show('warning')" color="warning" pack
          >warning</vui-button
        >
        <vui-button @click="show('success')" color="success" pack
          >success</vui-button
        >
        <vui-button @click="show('default')" color="default" pack
          >default</vui-button
        >
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">关闭时间</div>
        <div class="vui-text--light">默认值 1500</div>
      </div>
      <div>
        <vui-button @click="show('primary', 1000)" color="primary" pack
          >primary</vui-button
        >
        <vui-button @click="show('danger', 1000)" color="danger" pack
          >danger</vui-button
        >
        <vui-button @click="show('warning', 1000)" color="warning" pack
          >warning</vui-button
        >
        <vui-button @click="show('success', 1000)" color="success" pack
          >success</vui-button
        >
        <vui-button @click="show('default', 1000)" color="default" pack
          >default</vui-button
        >
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">是否禁止页面操作</div>
        <div class="vui-text--light">默认值 false</div>
      </div>
      <div>
        <vui-button @click="show('primary', 3000, true)" color="primary" pack
          >primary</vui-button
        >
        <vui-button @click="show('danger', 3000, true)" color="danger" pack
          >danger</vui-button
        >
        <vui-button @click="show('warning', 3000, true)" color="warning" pack
          >warning</vui-button
        >
        <vui-button @click="show('success', 3000, true)" color="success" pack
          >success</vui-button
        >
        <vui-button @click="show('default', 3000, true)" color="default" pack
          >default</vui-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
