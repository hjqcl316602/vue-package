<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-31 09:37:36
 * @LastEditTime: 2019-09-03 20:30:28
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    top: false,
    bottom: false,
    left: false,
    right: false,
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false
  };
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <vui-floater type="top" v-if="top" padding>
      <div class="vui-background-color--white">
        <span>top</span>
      </div>
    </vui-floater>
    <vui-floater type="bottom" v-if="bottom" padding>
      <div class="vui-background-color--white">
        <span>
          bottom
        </span>
      </div>
    </vui-floater>
    <vui-floater type="left" v-if="left" padding>
      <div class="vui-background-color--white">
        <span>
          left
        </span>
      </div>
    </vui-floater>
    <vui-floater type="right" v-if="right" padding>
      <div class="vui-background-color--white">
        <span>
          right
        </span>
      </div>
    </vui-floater>
    <vui-floater type="top-left" v-if="topLeft">
      <div class="vui-background-color--primary">
        <span>
          topLeft
        </span>
      </div>
    </vui-floater>
    <vui-floater type="top-right" v-if="topRight">
      <div class="vui-background-color--primary">
        <span>
          topRight
        </span>
      </div>
    </vui-floater>
    <vui-floater type="bottom-left" v-if="bottomLeft">
      <div class="vui-background-color--primary">
        <span>
          bottomLeft
        </span>
      </div>
    </vui-floater>
    <vui-floater
      type="bottom-right"
      v-if="bottomRight"
      bottom="10px"
      right="10px"
    >
      <div class="vui-background-color--primary">
        <span>
          bottomRight | bottom=10px | right=10px
        </span>
      </div>
    </vui-floater>
    <vui-button pack color="primary" @click="top = !top">上</vui-button>
    <vui-button pack color="primary" @click="bottom = !bottom">下</vui-button>
    <vui-button pack color="primary" @click="left = !left">左</vui-button>
    <vui-button pack color="primary" @click="right = !right">右</vui-button>
    <vui-button pack color="primary" @click="topLeft = !topLeft">
      上左
    </vui-button>
    <vui-button pack color="primary" @click="topRight = !topRight">
      上右
    </vui-button>
    <vui-button pack color="primary" @click="bottomLeft = !bottomLeft">
      下左
    </vui-button>
    <vui-button pack color="primary" @click="bottomRight = !bottomRight">
      下右
    </vui-button>
  </div>
</template>

<style scoped></style>
