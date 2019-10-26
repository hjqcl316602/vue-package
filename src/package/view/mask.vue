<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 11:24:26
 * @LastEditTime: 2019-09-09 14:21:25
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false
  };
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
export default instance;
</script>

<template>
  <div class="vui-padding" style="height:1000px">
    <vui-button pack @click="show = !show">fade</vui-button>
    <vui-button pack @click="show1 = !show1">slide-right</vui-button>
    <vui-button pack @click="show2 = !show2">slide-left</vui-button>
    <vui-button pack @click="show3 = !show3">slide-top</vui-button>
    <vui-button pack @click="show4 = !show4">slide-bottom</vui-button>
    <vui-mask v-model="show" transitionName="fade"></vui-mask>
    <vui-mask v-model="show1" transitionName="slide-right"></vui-mask>
    <vui-mask v-model="show2" transitionName="slide-left"></vui-mask>
    <vui-mask v-model="show3" transitionName="slide-top"></vui-mask>
    <vui-mask
      v-model="show4"
      transitionName="slide-bottom"
      scrollable
    ></vui-mask>
  </div>
</template>

<style scoped></style>
