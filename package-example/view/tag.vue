<script>
import Vue from "vue";
import ui from "./index";
Vue.use(ui);
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {};
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <div class="vui-margin-bottom--large">
      <vui-tag label="10"><div>显示信息(label='10')</div></vui-tag>
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="top-right"
        ><div>位置(direction='top-right')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="top-left"
        ><div>位置(direction='top-left')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="bottom-left"
        ><div>位置(direction='bottom-left')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="bottom-left"
        ><div>位置(direction='bottom-left')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="top-center"
        ><div>位置(direction='top-center')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="bottom-center"
        ><div>位置(direction='bottom-center')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="left-center"
        ><div>位置(direction='left-center')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag label="10" direction="right-center"
        ><div>位置(direction='right-center')</div></vui-tag
      >
    </div>
    <div class="vui-margin-bottom--large">
      <vui-tag direction="top-right">
        <div>自定义label样式</div>
        <div slot="label">
          <span
            class="vui-font-size--medium vui-font-weight--800 vui-font-style--italic"
            >label</span
          >
        </div>
      </vui-tag>
    </div>
  </div>
</template>

<style scoped></style>
