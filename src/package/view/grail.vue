<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 10:13:01
 * @LastEditTime: 2019-09-09 10:46:31
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    text:
      "颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间"
  };
};
instance.methods = {
  change() {
    this.text +=
      "颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间颠三倒四电话季度时间";
  }
};
instance.created = function() {};
instance.mounted = function() {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;height:100px"></div>
      <vui-grail-child type="top" padding-height>
        <div style="background-color:red;">
          <div>
            top,以子元素的高度设置父元素的padding-top值
            以子元素的高度设置父元素的padding-top值以子元素的高度设置父元素的padding-top值
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;height:100px"></div>
      <vui-grail-child type="top" padding-height>
        <div style="background-color:red;height:50px">
          <div>
            top，设置子元素的固定高度
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>

    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;height:100px"></div>
      <vui-grail-child type="top">
        <div style="background-color:red;">
          <div>
            top，不设置父元素的padding值
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>

    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局底部padding值会根据底部相对布局的元素的高度自动设置，也可以设置底部元素的固定高度
      </div>
      <vui-grail-child type="bottom" padding-height>
        <div style="background-color:red;">
          <div>
            bottom
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局左部padding值会根据左部相对布局的元素的高度自动设置，也可以设置左部元素的固定高度
      </div>
      <vui-grail-child type="left" padding-width>
        <div style="background-color:red;height:100%">
          <div>
            left
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局右部padding值会根据右部相对布局的元素的高度自动设置，也可以设置右部元素的固定高度
      </div>
      <vui-grail-child type="right" padding-width>
        <div style="background-color:red;height:100%">
          <div>
            right
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>

    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局头部居中
      </div>
      <vui-grail-child type="top-center">
        <div style="background-color:red;height:100%">
          <div>
            top-center
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局头部居中,设置padding
      </div>
      <vui-grail-child type="top-center" padding-height>
        <div style="background-color:red;height:100%">
          <div>
            top-center
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局底部居中
      </div>
      <vui-grail-child type="bottom-center">
        <div style="background-color:red;height:100%">
          <div>
            bottom-center
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局右边居中
      </div>
      <vui-grail-child type="right-center">
        <div style="background-color:red;height:100%">
          <div>
            right-center
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="background-color:blue;">
        圣杯布局左边居中
      </div>
      <vui-grail-child type="left-center">
        <div style="background-color:red;height:100%">
          <div>
            left-center
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>

    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 cover ，父元素的高宽既是子元素的高宽
      </div>
      <vui-grail-child type="cover" z-index="2">
        <div style="">
          <div>
            cover
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 center ，子元素的高宽自动
      </div>
      <vui-grail-child type="center" z-index="2">
        <div style="">
          <div>
            center
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 top-right
      </div>
      <vui-grail-child type="top-right" z-index="2">
        <div style="background-color:red;">
          <div>
            top-right
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 top-right，设置子元素的padding-right
      </div>
      <vui-grail-child type="top-right" z-index="2" padding-width>
        <div style="background-color:red;">
          <div>
            top-right
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 top-right，设置子元素的padding-top
      </div>
      <vui-grail-child type="top-right" z-index="2" padding-height>
        <div style="background-color:red;">
          <div>
            top-right
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 top-right，设置子元素的padding-top,padding-right
      </div>
      <vui-grail-child
        type="top-right"
        z-index="2"
        padding-height
        padding-width
      >
        <div style="background-color:red;">
          <div>
            top-right
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 top-left
      </div>
      <vui-grail-child type="top-left" z-index="2">
        <div style="background-color:red;">
          <div>
            top-left
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 bottom-right
      </div>
      <vui-grail-child type="bottom-right" z-index="2">
        <div style="background-color:red;">
          <div>
            bottom-right
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
    <vui-grail class="vui-margin-bottom">
      <div style="height:200px;background-color:blue;padding:20px">
        圣杯布局 bottom-left
      </div>
      <vui-grail-child type="bottom-left" z-index="2">
        <div style="background-color:red;">
          <div>
            bottom-left
          </div>
        </div>
      </vui-grail-child>
    </vui-grail>
  </div>
</template>

<style scoped></style>
