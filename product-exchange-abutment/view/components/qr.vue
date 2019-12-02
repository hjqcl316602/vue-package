<script>
import Vue from "vue";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);

export default {
  name: "qr",
  data() {
    return {
      payCode: {
        value: "",
        size: 250,
        backgroundAlpha: 1,
        background: "white",
        foreground: "black",
        level: "L"
      }
    };
  },
  props: {
    value: {
      type: String
    }
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<template>
  <div class="" ref="qr-wrap">
    <qriously
      :value="value"
      :size="payCode.size"
      :level="payCode.level"
      :background="payCode.background"
      :foreground="payCode.foreground"
      :backgroundAlpha="payCode.backgroundAlpha"
    ></qriously>
  </div>
</template>
