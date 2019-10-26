<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 18:26:13
 * @LastEditTime: 2019-09-03 20:27:15
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
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">类型</span>
      </div>
      <div>
        <vui-button>
          <span>default</span>
        </vui-button>
        <vui-button pack>
          <span>pack</span>
        </vui-button>
        <vui-button hollow>
          <span>hollow</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">long</span>
      </div>
      <div>
        <vui-button long>
          <span>default</span>
        </vui-button>
        <vui-button long pack>
          <vui-icon name="home"></vui-icon>
          <span>pack</span>
        </vui-button>
        <vui-button long hollow>
          <span>hollow</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">icon</span>
      </div>
      <div>
        <vui-button long pack color="primary">
          <span>
            <vui-icon name="vui-icon--eye"> </vui-icon>
            <span>eye</span>
          </span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">color</span>
      </div>
      <div>
        <vui-button color="primary">
          <span>primary</span>
        </vui-button>
        <vui-button color="danger">
          <span>danger</span>
        </vui-button>
        <vui-button color="warning">
          <span>warning</span>
        </vui-button>
        <vui-button color="success">
          <span>success</span>
        </vui-button>
        <vui-button color="black">
          <span>black</span>
        </vui-button>
        <vui-button color="white">
          <span>white</span>
        </vui-button>
        <vui-button color="#020271">
          <span>自定义</span>
        </vui-button>
      </div>
      <div>
        <vui-button color="primary" pack>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" pack>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" pack>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" pack>
          <span>success</span>
        </vui-button>
        <vui-button color="black" pack>
          <span>black</span>
        </vui-button>
        <vui-button color="white" pack>
          <span>white</span>
        </vui-button>
        <vui-button color="#020271" pack>
          <span>自定义</span>
        </vui-button>
        <div>
          <vui-button color="primary" hollow>
            <span>primary</span>
          </vui-button>
          <vui-button color="danger" hollow>
            <span>danger</span>
          </vui-button>
          <vui-button color="warning" hollow>
            <span>warning</span>
          </vui-button>
          <vui-button color="success" hollow>
            <span>success</span>
          </vui-button>
          <vui-button color="black" hollow>
            <span>black</span>
          </vui-button>
          <vui-button color="white" hollow>
            <span>white</span>
          </vui-button>
          <vui-button color="#020271" hollow>
            <span>自定义</span>
          </vui-button>
        </div>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">size</span>
      </div>
      <div>
        <vui-button color="primary" size="smaller">
          <span>smaller</span>
        </vui-button>
        <vui-button color="primary" size="small">
          <span>small</span>
        </vui-button>
        <vui-button color="primary">
          <span>default</span>
        </vui-button>
        <vui-button color="primary" size="large">
          <span>large</span>
        </vui-button>
        <vui-button color="primary" size="larger">
          <span>larger</span>
        </vui-button>
        <vui-button color="primary" size="60px">
          <span>自定义(60px)</span>
        </vui-button>
      </div>
      <div>
        <vui-button color="primary" pack size="smaller">
          <span>smaller</span>
        </vui-button>
        <vui-button color="primary" pack size="small">
          <span>small</span>
        </vui-button>
        <vui-button color="primary" pack>
          <span>default</span>
        </vui-button>
        <vui-button color="primary" pack size="large">
          <span>large</span>
        </vui-button>
        <vui-button color="primary" pack size="larger">
          <span>larger</span>
        </vui-button>
        <vui-button color="primary" pack size="60px">
          <span>自定义(60px)</span>
        </vui-button>
      </div>
      <div>
        <vui-button color="primary" hollow size="smaller">
          <span>smaller</span>
        </vui-button>
        <vui-button color="primary" hollow size="small">
          <span>small</span>
        </vui-button>
        <vui-button color="primary" hollow>
          <span>default</span>
        </vui-button>
        <vui-button color="primary" hollow size="large">
          <span>large</span>
        </vui-button>
        <vui-button color="primary" hollow size="larger">
          <span>larger</span>
        </vui-button>
        <vui-button color="primary" hollow size="60px">
          <span>自定义(60px)</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">disabled</span>
      </div>
      <div>
        <vui-button disabled color="primary">
          <span>primary</span>
        </vui-button>
        <vui-button disabled color="danger">
          <span>danger</span>
        </vui-button>
        <vui-button disabled color="warning">
          <span>warning</span>
        </vui-button>
        <vui-button disabled color="success">
          <span>success</span>
        </vui-button>
        <vui-button disabled color="black">
          <span>black</span>
        </vui-button>
        <vui-button disabled color="white">
          <span>white</span>
        </vui-button>
        <vui-button disabled color="#020271">
          <span>自定义</span>
        </vui-button>
      </div>
      <div>
        <vui-button disabled color="primary" pack>
          <span>primary</span>
        </vui-button>
        <vui-button disabled color="danger" pack>
          <span>danger</span>
        </vui-button>
        <vui-button disabled color="warning" pack>
          <span>warning</span>
        </vui-button>
        <vui-button disabled color="success" pack>
          <span>success</span>
        </vui-button>
        <vui-button disabled color="black" pack>
          <span>black</span>
        </vui-button>
        <vui-button disabled color="white" pack>
          <span>white</span>
        </vui-button>
        <vui-button disabled color="#020271" pack>
          <span>自定义</span>
        </vui-button>
      </div>
      <div>
        <vui-button disabled color="primary" hollow>
          <span>primary</span>
        </vui-button>
        <vui-button disabled color="danger" hollow>
          <span>danger</span>
        </vui-button>
        <vui-button disabled color="warning" hollow>
          <span>warning</span>
        </vui-button>
        <vui-button disabled color="success" hollow>
          <span>success</span>
        </vui-button>
        <vui-button disabled color="black" hollow>
          <span>black</span>
        </vui-button>
        <vui-button disabled color="white" hollow>
          <span>white</span>
        </vui-button>
        <vui-button disabled color="#020271" hollow>
          <span>自定义</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">radius</span>
      </div>

      <div>
        <vui-button color="primary" pack radius>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" pack radius>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" pack radius>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" pack radius>
          <span>success</span>
        </vui-button>
        <vui-button color="black" pack radius>
          <span>black</span>
        </vui-button>
        <vui-button color="white" pack radius>
          <span>white</span>
        </vui-button>
      </div>
      <div>
        <vui-button color="primary" hollow radius>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" hollow radius>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" hollow radius>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" hollow radius>
          <span>success</span>
        </vui-button>
        <vui-button color="black" hollow radius>
          <span>black</span>
        </vui-button>
        <vui-button color="white" hollow radius>
          <span>white</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">round</span>
      </div>
      <div>
        <vui-button color="primary" pack round>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" pack round>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" pack round>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" pack round>
          <span>success</span>
        </vui-button>
        <vui-button color="black" pack round>
          <span>black</span>
        </vui-button>
        <vui-button color="white" pack round>
          <span>white</span>
        </vui-button>
      </div>
      <div>
        <vui-button color="primary" hollow round>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" hollow round>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" hollow round>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" hollow round>
          <span>success</span>
        </vui-button>
        <vui-button color="black" hollow round>
          <span>black</span>
        </vui-button>
        <vui-button color="white" hollow round>
          <span>white</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">thin</span>
      </div>
      <div>
        <vui-button color="primary" hollow thin>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" hollow thin>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" hollow thin>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" hollow thin>
          <span>success</span>
        </vui-button>
        <vui-button color="black" hollow thin>
          <span>black</span>
        </vui-button>
        <vui-button color="white" hollow thin>
          <span>white</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">thin | radius</span>
      </div>
      <div>
        <vui-button color="primary" hollow thin radius>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" hollow thin radius>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" hollow thin radius>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" hollow thin radius>
          <span>success</span>
        </vui-button>
        <vui-button color="black" hollow thin radius>
          <span>black</span>
        </vui-button>
        <vui-button color="white" hollow thin radius>
          <span>white</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">thin | round</span>
      </div>
      <div>
        <vui-button color="primary" hollow thin round>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" hollow thin round>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" hollow thin round>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" hollow thin round>
          <span>success</span>
        </vui-button>
        <vui-button color="black" hollow thin round>
          <span>black</span>
        </vui-button>
        <vui-button color="white" hollow thin round>
          <span>white</span>
        </vui-button>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary"
          >thin | round | dashed</span
        >
      </div>
      <div>
        <vui-button color="primary" hollow thin round dashed>
          <span>primary</span>
        </vui-button>
        <vui-button color="danger" hollow thin round dashed>
          <span>danger</span>
        </vui-button>
        <vui-button color="warning" hollow thin round dashed>
          <span>warning</span>
        </vui-button>
        <vui-button color="success" hollow thin round dashed>
          <span>success</span>
        </vui-button>
        <vui-button color="black" hollow thin round dashed>
          <span>black</span>
        </vui-button>
        <vui-button color="white" hollow thin round dashed>
          <span>white</span>
        </vui-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
