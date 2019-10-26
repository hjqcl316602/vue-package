<!--
 * @Description: In User Settings Edit
 * @Author: huangjunquan
 * @Date: 2019-08-10 08:49:20
 * @LastEditTime: 2019-09-03 20:48:39
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    icons: [
      "vui-icon--radio-button-on",
      "vui-icon--tupian",
      "vui-icon--arrow-bottom",
      "vui-icon--arrow-left",
      "vui-icon--arrow-right",
      "vui-icon--arrow-top",
      "vui-icon--spread-left",
      "vui-icon--spread-up",
      "vui-icon--spread-bottom",
      "vui-icon--spread-right",
      "vui-icon--bottom-circle",
      "vui-icon--top-circle",
      "vui-icon--left-circle",
      "vui-icon--right-circle",
      "vui-icon--top-circle-solid",
      "vui-icon--bottom-circle-solid",
      "vui-icon--right-circle-solid",
      "vui-icon--left-circle-solid"
    ]
  };
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.computed = {};
export default instance;
</script>

<template>
  <vui-box padding="large">
    <vui-grid gutter="20" gutter-row="50">
      <vui-grid-child span="12" v-for="(item, index) in icons" :key="index">
        <vui-grid flex-direction="column" align-items="center">
          <vui-box margin-bottom="10px">
            <vui-icon :name="item" color="primary" size="20px"></vui-icon>
          </vui-box>
          <vui-text color="gray">{{ item }}</vui-text>
        </vui-grid>
      </vui-grid-child>
    </vui-grid>
  </vui-box>
  <!-- <div class="vui-padding--large" v-if="false">
    <div class="vui-row--flex vui-row-gutter--large">
      <div class="  vui-span--8" v-for="(item, index) in iconList" :key="index">
        <div
          class="vui-padding-top--larger vui-padding-bottom--larger vui-text-align--center vui-flex vui-flex-direction--column vui-align-items--center"
        >
          <vui-icon :name="item" size="24px"></vui-icon>
          <span class="vui-margin-top">{{ item }}</span>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped></style>
