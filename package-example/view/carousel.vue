<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<template>
  <div class="vui-padding--large" style="width: 200px">
    <vui-carousel>
      <vui-carousel-child>
        <div
          class="vui-padding--large vui-background-color--danger"
          style="height: 100px"
        >
          page1
        </div>
      </vui-carousel-child>
      <vui-carousel-child>
        <div
          class="vui-padding--large vui-background-color--warning"
          style="height: 80px"
        >
          page2
        </div>
      </vui-carousel-child>
      <vui-carousel-child>
        <div
          class="vui-padding--large vui-background-color--danger"
          style="height: 100px"
        >
          page3
        </div>
      </vui-carousel-child>
    </vui-carousel>
  </div>
</template>
