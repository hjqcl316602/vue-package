<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 14:57:29
 * @LastEditTime: 2019-09-09 17:36:11
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
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.watch = {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <p class="vui-margin-bottom vui-text--bold">参数</p>
        <p class="vui-margin-bottom">
          duration： 滚动周期 | number | 默认值 0 |
          默认自动根据内容宽度或高度来计算
        </p>
        <p class="vui-margin-bottom">
          direction： 滚动方向 | string | 默认值 'row' | 可选值 ['row','column']
        </p>
        <p class="vui-margin-bottom">
          height： 可见高度 | string | 默认值 '24px' |
          当direction='column'时有效，当direction='row'时，自动根据内容的高度设置
        </p>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          默认
        </div>
        <div class="vui-text--light"></div>
      </div>
      <vui-notice-bar>
        <div class="vui-line-height--medium">
          第三家就是看但是就是看到健康沈单击收款简单快速接口就德生科技的会计师可
        </div>
      </vui-notice-bar>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          duration
        </div>
        <div class="vui-text--light">
          duration = 10000
        </div>
      </div>
      <vui-notice-bar :duration="10000">
        <div class="vui-line-height--medium">
          第三家就是看但是就是看到健康沈单击收款简单快速接口就德生科技的会计师可
        </div>
      </vui-notice-bar>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          direction
        </div>
        <div class="vui-text--light">
          direction = 'column' | height='24px'
        </div>
      </div>
      <vui-notice-bar direction="column" height="24px">
        <div class="" style="line-height:24px">
          第三家就是看但是就是看到健康沈单击收款简单快速接口就德生科技的会计师可
        </div>
      </vui-notice-bar>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          高级用法
        </div>
        <div class="vui-text--light">
          结合grail组件
        </div>
      </div>
      <div class="vui-background-color--white">
        <vui-grail>
          <vui-notice-bar direction="column" height="24px">
            <div style="line-height:24px">
              第三家就是看但是就是看到健康沈单击收款简单快速接口就德生科技的会计师可
            </div>
          </vui-notice-bar>
          <vui-grail-child type="left-center" padding-width>
            <div class="vui-padding-left vui-padding-right">
              <vui-icon name="horn"></vui-icon>
            </div>
          </vui-grail-child>
        </vui-grail>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
