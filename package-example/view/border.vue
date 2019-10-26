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
    <div class="vui-margin-bottom">
      <vui-border top><div class="vui-padding">上边框(top)</div></vui-border>
    </div>
    <div class="vui-margin-bottom">
      <vui-border bottom
        ><div class="vui-padding">下边框(bottom)</div></vui-border
      >
    </div>
    <div class="vui-margin-bottom">
      <vui-border left><div class="vui-padding">左边框(left)</div></vui-border>
    </div>
    <div class="vui-margin-bottom">
      <vui-border right
        ><div class="vui-padding">右边框(right)</div></vui-border
      >
    </div>
    <div class="vui-margin-bottom">
      <vui-border round><div class="vui-padding">四周(round)</div></vui-border>
    </div>
    <div class="vui-margin-bottom">
      <vui-border round color="red"
        ><div class="vui-padding">红色(color="red")</div></vui-border
      >
    </div>
    <div class="vui-margin-bottom">
      <vui-border round color="red" :size="1 / 2"
        ><div class="vui-padding">二分之一像素(:size="1/2")</div></vui-border
      >
    </div>
    <div class="vui-margin-bottom">
      <vui-border round color="red" :size="1 / 3"
        ><div class="vui-padding">三分之一像素(:size="1/3")</div></vui-border
      >
    </div>
    <div class="vui-margin-bottom">
      <vui-border round color="red" :size="1 / 3" type="dashed"
        ><div class="vui-padding">样式（type="dashed"）</div></vui-border
      >
    </div>
    <div class="vui-margin-bottom">
      <vui-border round color="red" :size="1 / 3" radius="4px"
        ><div class="vui-padding">圆角(radius="4px")</div></vui-border
      >
    </div>
    <div class="vui-margin-bottom">
      <vui-border round color="red" :size="1 / 3" circle
        ><div class="vui-padding">全圆角(circle)</div></vui-border
      >
    </div>
  </div>
</template>

<style scoped></style>
