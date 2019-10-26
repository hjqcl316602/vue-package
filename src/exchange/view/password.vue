<script>
import { updatePassword } from "../request/user";

export default {
  name: "",
  data() {
    return {
      params: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    save() {
      if (!this.params.oldPassword) {
        this.$message.danger("请输入原资金密码");
        return;
      }
      if (!this.params.newPassword) {
        this.$message.danger("请输入新资金密码");
        return;
      }
      if (!this.params.confirmPassword) {
        this.$message.danger("请输入确认资金密码");
        return;
      }
      if (this.params.newPassword !== this.params.confirmPassword) {
        this.$message.danger("新资金密码与确认资金密码不一致");
        return;
      }
      this.updatePassword();
    },
    updatePassword() {
      updatePassword({
        oldPassword: this.params.oldPassword,
        newPassword: this.params.newPassword
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
          this.$message.success(data.message);
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
          <span class="vi-font-weight--bold">原资金密码</span>
        </div>
        <input
          type="password"
          class=""
          placeholder="请输入您的原资金密码"
          v-model="params.oldPassword"
        />
        <div
          style="line-height: 44px"
          class="vi-padding-right vi-padding-left"
          v-if="params.oldPassword"
          @click="params.oldPassword = ''"
        >
          <i class="iconfont icon-shanchu" style="color:#999"></i>
        </div>
      </div>
    </div>
    <div class="vi-border is-border--bottom is-border--thiner">
      <div class="  vi-input is-input--larger is-input--require">
        <div
          style="line-height: 44px;width:100px"
          class="vi-padding-right vi-padding-left vi-text-align--right"
        >
          <span class="vi-font-weight--bold">新资金密码</span>
        </div>
        <input
          type="password"
          class=""
          placeholder="请输入您的新资金密码"
          v-model="params.newPassword"
        />
        <div
          style="line-height: 44px"
          class="vi-padding-right vi-padding-left"
          v-if="params.newPassword"
          @click="params.newPassword = ''"
        >
          <i class="iconfont icon-shanchu" style="color:#999"></i>
        </div>
      </div>
    </div>
    <div class="vi-border is-border--bottom is-border--thiner">
      <div class="  vi-input is-input--larger is-input--require">
        <div
          style="line-height: 44px;width:100px"
          class="vi-padding-right vi-padding-left vi-text-align--right"
        >
          <span class="vi-font-weight--bold">确认新密码</span>
        </div>
        <input
          type="password"
          class=""
          placeholder="请输入您的新资金密码"
          v-model="params.confirmPassword"
        />
        <div
          style="line-height: 44px"
          class="vi-padding-right vi-padding-left"
          v-if="params.confirmPassword"
          @click="params.confirmPassword = ''"
        >
          <i class="iconfont icon-shanchu" style="color:#999"></i>
        </div>
      </div>
    </div>

    <div class="vi-margin-top--large">
      <div
        class="vi-btn is-btn--primary is-btn--hollow is-btn--long is-btn--radius is-btn--thiner"
        @click="save"
      >
        确定
      </div>
    </div>
  </div>
</template>
