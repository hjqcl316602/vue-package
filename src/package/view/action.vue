<script>
export default {
  name: "",
  data() {
    return {
      value: "",
      show: {
        action: false
      },
      options: [
        { text: "电影", value: "1" },
        { text: "视频", value: "2" },
        { text: "军事", value: "3" },
        { text: "娱乐", value: "4", subText: "赵丽颖怀孕时间报道" }
      ]
    };
  },
  props: {},
  computed: {},
  methods: {
    select(value) {
      this.value = value["text"];
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="vui-padding">
    <div class="vi-btn" @click="show.action = true">选择</div>
    <span>选中：{{ value }}</span>
    <vui-action
      :options="options"
      v-model="show.action"
      @select="select"
      :mask="false"
    ></vui-action>
  </div>
</template>
