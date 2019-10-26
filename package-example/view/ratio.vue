<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 09:01:39
 * @LastEditTime: 2019-09-03 21:01:57
 * @LastEditors: Please set LastEditors
 -->
<script>
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
    <div class="vui-margin-bottom--large" style="width:100px">
      <vui-ratio :ratio="0.5">
        <div class="vui-contain vui-center vui-background-color--primary">
          <span>1:2 </span>
        </div>
      </vui-ratio>
    </div>

    <div class="vui-margin-bottom--large" style="width:100px">
      <vui-ratio :ratio="1">
        <div class="vui-contain vui-center vui-background-color--primary">
          <span>1:1</span>
        </div>
      </vui-ratio>
    </div>

    <div class="vui-margin-bottom--large" style="width:100px">
      <vui-ratio :ratio="2">
        <div class="vui-contain vui-center vui-background-color--primary">
          <span>2:1</span>
        </div>
      </vui-ratio>
    </div>

    <div class="vui-margin-bottom--large" style="width:100px">
      <vui-ratio :ratio="16 / 9">
        <div class="vui-contain vui-center vui-background-color--primary">
          <span> 16:9 </span>
        </div>
      </vui-ratio>
    </div>
  </div>
</template>

<style scoped></style>
