<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 09:31:28
 * @LastEditTime: 2019-09-04 18:19:59
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
        <span class="vui-text--bold vui-text--primary">span</span>
      </div>
      <vui-grid>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">span | gutter</span>
      </div>
      <vui-grid gutter="10">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary"
          >span | gutter | gutter-row</span
        >
      </div>
      <vui-grid gutter="10" gutter-row="10">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">span | push </span>
      </div>
      <vui-grid>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8" push="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8|push=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          row = 32 | span
        </span>
      </div>
      <vui-grid row="32">
        <vui-grid-child span="16">
          <div class="vui-height--medium vui-background-color--primary">
            span=16
          </div>
        </vui-grid-child>
        <vui-grid-child span="16">
          <div class="vui-height--medium vui-background-color--primary">
            span=16
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          justify-content=flex-end |span
        </span>
      </div>
      <vui-grid justify-content="flex-end">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          justify-content=flex-end |span | pull
        </span>
      </div>
      <vui-grid justify-content="flex-end">
        <vui-grid-child span="8" pull="4">
          <div class="vui-height--medium vui-background-color--primary">
            span=8 | pull=4
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary"
          >justify-content=center | span</span
        >
      </div>
      <vui-grid justify-content="center">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          justify-content=space-between | span
        </span>
      </div>
      <vui-grid justify-content="space-between">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          justify-content=space-around | span
        </span>
      </div>
      <vui-grid justify-content="space-around">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          align-items="center" | span
        </span>
      </div>
      <vui-grid align-items="center">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          align-items="flex-end" | span
        </span>
      </div>
      <vui-grid align-items="flex-end">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          align-items="flex-start" | span
        </span>
      </div>
      <vui-grid align-items="flex-start">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          flex-direction=row | span
        </span>
      </div>
      <vui-grid flex-direction="row">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          flex-direction=column | span
        </span>
      </div>
      <vui-grid flex-direction="column">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          flex-direction=column | justify-content=space-between | span |
          height=120px
        </span>
      </div>
      <vui-grid
        flex-direction="column"
        justify-content="space-between"
        style="height:120px"
      >
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div
            class="vui-height--medium vui-background-color--primary"
            background-color="primary"
          >
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          flex-direction=column | justify-content=space-between | span |
          height=120px | align-items="center"
        </span>
      </div>
      <vui-grid
        flex-direction="column"
        justify-content="space-between"
        align-items="center"
        style="height:120px"
      >
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="4">
          <div class="vui-height--medium vui-background-color--primary">
            span=4
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          align-content="center" | span | height="120px"
        </span>
      </div>
      <vui-grid align-content="center" style="height:120px">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div
            class="vui-height--medium vui-background-color--primary"
            background-color="primary"
          >
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div
            class="vui-height--medium vui-background-color--primary"
            background-color="primary"
          >
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div
            class="vui-height--medium vui-background-color--primary"
            background-color="primary"
          >
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          align-content="space-between" | span | height="120px"
        </span>
      </div>
      <vui-grid align-content="space-between" style="height:120px">
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div
            class="vui-height--medium vui-background-color--primary"
            background-color="primary"
          >
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div
            class="vui-height--medium vui-background-color--primary"
            background-color="primary"
          >
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div
            class="vui-height--medium vui-background-color--primary"
            background-color="primary"
          >
            span=8
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          span | align-self
        </span>
      </div>
      <vui-grid>
        <vui-grid-child span="8">
          <div class="vui-height--small vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8">
          <div class="vui-height--medium vui-background-color--primary">
            span=8
          </div>
        </vui-grid-child>
        <vui-grid-child span="8" align-self="flex-end">
          <div class="vui-height--smaller vui-background-color--primary">
            span=8 | align-self="flex-end"
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          width | flex-grow
        </span>
      </div>
      <vui-grid>
        <vui-grid-child width="150px">
          <div class="vui-height--small vui-background-color--primary">
            width="100px"
          </div>
        </vui-grid-child>
        <vui-grid-child flex-grow="1">
          <div class="vui-height--medium vui-background-color--primary">
            flex-grow="1"
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <span class="vui-text--bold vui-text--primary">
          width | flex-grow
        </span>
      </div>
      <vui-grid>
        <vui-grid-child flex-grow="0">
          <div class="vui-height--small vui-background-color--primary ">
            flex-grow="0"
          </div>
        </vui-grid-child>
        <vui-grid-child flex-grow="1">
          <div class="vui-padding-left">
            <div class="vui-height--medium vui-background-color--primary">
              flex-grow="1"
            </div>
          </div>
        </vui-grid-child>
      </vui-grid>
    </div>
  </div>
</template>

<style scoped></style>
