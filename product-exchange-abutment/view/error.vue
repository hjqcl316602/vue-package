<script>
export default {
  name: "error",
  data() {
    return {
      message: ""
    };
  },
  mounted() {
    this.message = this.$route.query["msg"]
      ? decodeURIComponent(this.$route.query["msg"])
      : "系统繁忙，请稍后重试！";
  }
};
</script>

<template>
  <div class="vi-ratio">
    <div class="vi-ratio--wrap" data-ratio="2:1">
      <div
        class="vi-ratio--inner vi-flex is-justify-content--center is-align-items--center"
      >
        <div
          class="vi-flex is-flex-direction--column  vi-padding is-align-items--center "
        >
          <span
            class="vi-icon vi-text is-color--danger vi-margin-bottom"
            style="font-size: 40px"
          >
            &#xe61e;
          </span>
          <span style="line-height: 18px">{{ message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
