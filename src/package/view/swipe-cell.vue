<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {
    select() {
      console.log("select");
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="">
    <vui-swipe-cell>
      <div style="height:100px;background-color: black"></div>
      <div slot="left" style="width:200px" @click="select">
        <span>left</span>
      </div>
      <div
        slot="right"
        style="width:100px;height:100%;display: flex"
        class="vi-btn-group"
      >
        <div
          class="vi-btn is-btn--pack is-btn--primary"
          style="height: 100%;display: flex;align-items: center;justify-content: center;flex: 1;"
        >
          <span>上架</span>
        </div>
        <div
          class="vi-btn is-btn--pack is-btn--danger"
          style="height: 100%;display: flex;align-items: center;justify-content: center;flex: 1;"
        >
          <span>删除</span>
        </div>
      </div>
    </vui-swipe-cell>
  </div>
</template>
