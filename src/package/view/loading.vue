<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 09:39:17
 * @LastEditTime: 2019-09-04 09:33:06
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
      <div class="vui-margin-bottom--large vui-text--bold vui-text--primary">
        loading-circle
      </div>
      <div class="vui-grid vui-justify-content--space-around">
        <vui-loading-circle color="#000"></vui-loading-circle>
        <vui-loading-circle color="red"></vui-loading-circle>
        <vui-loading-circle color="#000" size="20px"></vui-loading-circle>
        <vui-loading-circle
          color="#000"
          itemSize="6px"
          size="30px"
        ></vui-loading-circle>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom--large vui-text--bold vui-text--primary">
        loading-cross
      </div>
      <div class="vui-grid vui-justify-content--space-around">
        <vui-loading-cross color="#000"></vui-loading-cross>
        <vui-loading-cross color="#000" :duration="4000"></vui-loading-cross>
        <vui-loading-cross color="red" :duration="4000"></vui-loading-cross>
        <vui-loading-cross
          color="red"
          :duration="4000"
          size="40px"
        ></vui-loading-cross>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom--large vui-text--bold vui-text--primary">
        loading-rect
      </div>
      <div class="vui-grid vui-justify-content--space-around">
        <vui-loading-rect color="#000"></vui-loading-rect>
        <vui-loading-rect color="#000" size="40px"></vui-loading-rect>
        <vui-loading-rect color="#000" layerColor="red"></vui-loading-rect>
        <vui-loading-rect color="red" layerColor="#000"></vui-loading-rect>
        <vui-loading-rect color="#000" :itemWidth="8"></vui-loading-rect>
        <vui-loading-rect color="#000" :itemNumber="4"></vui-loading-rect>
        <vui-loading-rect color="#000" :itemScale="1"></vui-loading-rect>
        <vui-loading-rect color="#000" :duration="4000"></vui-loading-rect>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom--large vui-text--bold vui-text--primary">
        loading-ring
      </div>
      <div class="vui-grid vui-justify-content--space-around">
        <vui-loading-ring color="#000"></vui-loading-ring>
        <vui-loading-ring color="#000" :copies="2"></vui-loading-ring>
        <vui-loading-ring color="#000" :copies="3"></vui-loading-ring>
        <vui-loading-ring color="#000" :copies="4"></vui-loading-ring>
        <vui-loading-ring color="red"></vui-loading-ring>
        <vui-loading-ring color="#000" size="40px"></vui-loading-ring>
        <vui-loading-ring color="#000" layerColor="red"></vui-loading-ring>
        <vui-loading-ring color="#000" :layerSize="8"></vui-loading-ring>
        <vui-loading-ring color="#000" :duration="4000"></vui-loading-ring>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom--large vui-text--bold vui-text--primary">
        loading-round
      </div>
      <div class="vui-grid vui-justify-content--space-around">
        <vui-loading-round></vui-loading-round>
        <vui-loading-round layerColor="red"></vui-loading-round>
        <vui-loading-round size="40px"></vui-loading-round>
        <vui-loading-round :itemWidth="100"> </vui-loading-round>
        <vui-loading-round duration="3000ms"> </vui-loading-round>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom--large vui-text--bold vui-text--primary">
        loading-turn
      </div>
      <div class="vui-grid vui-justify-content--space-around">
        <vui-loading-turn color="red"></vui-loading-turn>
        <vui-loading-turn color="red" size="50px"></vui-loading-turn>
        <vui-loading-turn color="red" duration="5s"></vui-loading-turn>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom--large vui-text--bold vui-text--primary">
        loading-wave
      </div>
      <div class="vui-grid vui-justify-content--space-around">
        <vui-loading-wave color="red"></vui-loading-wave>
        <vui-loading-wave color="red" :size="40"></vui-loading-wave>
        <vui-loading-wave color="red" :itemNumber="3"></vui-loading-wave>
        <vui-loading-wave
          color="red"
          :itemNumber="3"
          :spacing="8"
        ></vui-loading-wave>
        <vui-loading-wave color="red" align="center"></vui-loading-wave>
        <vui-loading-wave color="red" align="end"></vui-loading-wave>
        <vui-loading-wave color="red" direction="ver"></vui-loading-wave>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
