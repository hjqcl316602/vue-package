<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 21:26:43
 * @LastEditTime: 2019-09-03 21:03:50
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    options: [
      { name: "电影", value: "1" },
      { name: "视频库", value: "2" },
      { name: "军事题材", value: "3" },
      { name: "科技", value: "4" },
      { name: "生活", value: "5" }
    ],
    active: "1"
  };
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.watch = {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom vui-text--primary vui-text--bold">
        自动分配
      </div>
      <vui-tab-group v-model="active" :fix="false">
        <vui-tab
          v-for="(item, index) in options"
          :key="index"
          :name="item['value']"
        >
          <div
            class="vv-tab-item"
            :class="{ active: item['value'] === active }"
          >
            {{ item["name"] }}
          </div>
        </vui-tab>
      </vui-tab-group>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom vui-text--primary vui-text--bold">
        添加滑动条
      </div>
      <vui-tab-group v-model="active" :fix="false" show-bar>
        <vui-tab
          v-for="(item, index) in options"
          :key="index"
          :name="item['value']"
        >
          <div
            class="vv-tab-item"
            :class="{ active: item['value'] === active }"
          >
            {{ item["name"] }}
          </div>
        </vui-tab>
      </vui-tab-group>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom vui-text--primary vui-text--bold">
        设置可见数5
      </div>
      <vui-tab-group v-model="active" :threshold="5">
        <vui-tab
          v-for="(item, index) in options"
          :key="index"
          :name="item['value']"
        >
          <div
            class="vv-tab-item"
            :class="{ active: item['value'] === active }"
          >
            {{ item["name"] }}
          </div>
        </vui-tab>
      </vui-tab-group>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom vui-text--primary vui-text--bold">
        设置可见数3
      </div>
      <vui-tab-group v-model="active" :threshold="3" show-bar>
        <vui-tab
          v-for="(item, index) in options"
          :key="index"
          :name="item['value']"
        >
          <div
            class="vv-tab-item"
            :class="{ active: item['value'] === active }"
          >
            {{ item["name"] }}
          </div>
        </vui-tab>
      </vui-tab-group>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom vui-text--primary vui-text--bold">
        设置可见数4.5
      </div>
      <vui-tab-group v-model="active" :threshold="4.5" show-bar>
        <vui-tab
          v-for="(item, index) in options"
          :key="index"
          :name="item['value']"
        >
          <div
            class="vv-tab-item"
            :class="{ active: item['value'] === active }"
          >
            {{ item["name"] }}
          </div>
        </vui-tab>
      </vui-tab-group>
    </div>
  </div>
</template>

<style scoped>
.vv-tab-item {
  text-align: center;
  line-height: 36px;
  padding: 5px;
}
.vv-tab-item.active {
  color: #39f;
}
</style>
