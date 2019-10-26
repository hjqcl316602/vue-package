<script>
import { bindAgency } from "../request/user";

export default {
  name: "",
  data() {
    return {
      params: {
        code: ""
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    bindAgency() {
      if (!this.params.code) {
        this.$message.danger("请输入您推荐人的推荐码");
        return false;
      }
      bindAgency({
        promotionCode: this.params.code
      }).then(res => {
        var data = res.data;
        if (data.code === 0) {
          this.$message.success(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        } else {
          this.$message.danger(data.message);
        }
      });
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="vv-panel vi-padding--large" style="min-height: 100vh">
    <div class="vi-border is-border--bottom is-border--thiner">
      <div class="  vi-input is-input--larger is-input--require">
        <div
          style="line-height: 44px;width:100px"
          class="vi-padding-right vi-padding-left vi-text-align--right"
        >
          <span class="vi-font-weight--bold">推荐码</span>
        </div>
        <input
          type="password"
          class=""
          placeholder="请输入您推荐人的推荐码"
          v-model="params.code"
        />
        <div
          style="line-height: 44px"
          class="vi-padding-right vi-padding-left"
          v-if="params.code"
          @click="params.code = ''"
        >
          <i class="iconfont icon-shanchu" style="color:#999"></i>
        </div>
      </div>
    </div>
    <div class="vi-margin-top--large">
      <div
        class="vi-btn is-btn--primary is-btn--pack is-btn--long"
        @click="bindAgency"
      >
        确定
      </div>
    </div>
  </div>
</template>
