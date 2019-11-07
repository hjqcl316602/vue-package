<script>
import { getAgencyMessage, updateAgencyPercent } from "../request/user";
export default {
  name: "",
  data() {
    return {
      params: {
        memberId: "",
        number: ""
      },
      message: {},
      memberMessage: {},
      updateBefore: {
        show: false,
        message: ""
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.params = Object.assign(this.params, this.$route.query);
      this.getAgencyMessage();
    },
    getAgencyMessage() {
      getAgencyMessage().then(res => {
        let data = res.data;
        if (data.code === 0) {
          let follower = data.data.follower || [];
          this.memberMessage =
            follower.find(ele => {
              return ele.memberId == this.params.memberId;
            }) || {};
          this.message = data.data;
          this.params.number = this.memberMessage.bonusPercent;
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    updatePercentBefore() {
      if (this.params.number > 100 || this.params.number < 0) {
        this.$message.danger("请输入0-100的数字作为分成比例");
        return false;
      }
      let normalHigh = 1.7,
        normalLower = 1.2;

      let highPercent = Number(
        this.message.memberPercent || this.message.highPercent || normalHigh
      );
      let lowerPercent = Number(this.message.lowPercent || normalLower);
      let reverse = highPercent - lowerPercent;
      let bouns = ((reverse * this.params.number) / 100 + lowerPercent).toFixed(
        4
      );
      let message = `你是否确定修改团队成员【${this.memberMessage.userName}】的分成比例为【${this.params.number}%】？预计分成值为【${bouns}】。当日生效`;
      this.updateBefore.show = true;
      this.updateBefore.message = message;
    },
    updateAgencyPercent() {
      updateAgencyPercent({
        memberId: this.params.memberId,
        bonusPercent: this.params.number
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        } else {
          this.$message.danger(data.message);
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-panel vi-padding--large" style="min-height: 100vh">
    <vui-confirm
      v-model="updateBefore.show"
      title="更新确认"
      @ok="updateAgencyPercent"
    >
      <div class="vi-padding--large">
        <span style="line-height: 28px">
          {{ updateBefore.message }}
        </span>
      </div>
    </vui-confirm>
    <div class="vi-border is-border--bottom is-border--thiner">
      <div class="  vi-input is-input--larger is-input--require">
        <div
          style="line-height: 44px;width:100px"
          class="vi-padding-right vi-padding-left vi-text-align--right"
        >
          <span class="vi-font-weight--bold">分成比例</span>
        </div>
        <input
          type="number"
          class=""
          placeholder="请输入你要设置的分成比例"
          v-model="params.number"
        />
        <div
          style="line-height: 44px"
          class="vi-padding-right vi-padding-left"
          v-if="params.number"
          @click="params.number = ''"
        >
          <i class="iconfont icon-shanchu" style="color:#999"></i>
        </div>
        <div style="line-height: 44px" class="vi-padding-right vi-padding-left">
          <span>%</span>
        </div>
      </div>
    </div>
    <div class="vi-margin-top--large">
      <div
        class="vi-btn is-btn--primary is-btn--hollow is-btn--long is-btn--radius is-btn--thiner"
        @click="updatePercentBefore"
      >
        确定
      </div>
    </div>
  </div>
</template>
