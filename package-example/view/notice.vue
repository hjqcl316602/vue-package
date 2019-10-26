<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 17:49:18
 * @LastEditTime: 2019-09-09 14:37:06
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    show: {
      first: false,
      second: false,
      third: false
    }
  };
};
instance.computed = {};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.watch = {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <vui-notice v-model="show.first">
      <div class="vui-padding">
        通知组件
      </div>
    </vui-notice>
    <vui-notice v-model="show.second" :padding="false">
      <div class="vui-padding">
        padding=false
      </div>
    </vui-notice>
    <vui-notice v-model="show.third" :padding="true">
      <div class="vui-padding">
        padding=true | slot=header
      </div>
      <div
        slot="header"
        class="vui-background-color--primary vui-padding vui-text-align--center"
      >
        <span class="vui-text--white">我是标题</span>
      </div>
    </vui-notice>

    <div class="vui-margin-bottom">
      <div class="vui-margin-bottom">
        <p class="vui-text--bold">参数</p>
        <p>padding：是否设置padding-top，默认值【true】</p>
        <p>title : 标题，在没有自定义标题slot情况有效，默认值【提示信息】</p>
        <p>v-model : 显示状态，默认值【false】</p>
      </div>
      <div class="">
        <p class="vui-text--bold">slot</p>
        <p>header：头部</p>
        <p>footer：底部</p>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          默认
        </div>
        <div class="vui-text--light"></div>
      </div>
      <vui-button pack color="primary" @click="show.first = !show.first">
        开关
      </vui-button>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          padding
        </div>
        <div class="vui-text--light">
          padding=false
        </div>
      </div>
      <vui-button pack color="primary" @click="show.second = !show.second">
        开关
      </vui-button>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          自定义slot
        </div>
        <div class="vui-text--light">
          slot=header
        </div>
      </div>
      <vui-button pack color="primary" @click="show.third = !show.third">
        开关
      </vui-button>
    </div>
  </div>
</template>

<style scoped></style>
