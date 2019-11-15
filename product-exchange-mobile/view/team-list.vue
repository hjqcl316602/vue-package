<script>
import { getAgencyMessage } from "../request/user";
export default {
  name: "",
  data() {
    return {
      message: {},
      follower: []
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.getAgencyMessage();
    },

    getAgencyMessage() {
      getAgencyMessage().then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.message = data.data;
          this.follower = this.message.follower;
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
  <div class="">
    <div v-if="follower.length > 0">
      <div
        class="vi-background vi-margin-bottom "
        v-for="(item, index) in follower"
        :key="index"
      >
        <div class="">
          <div
            class="vi-flex is-justify-content--space-between vi-border is-border--thiner is-border--bottom vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">昵称</span>
            <span class="vi-text is-color--primary">{{ item.userName }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between vi-border is-border--thiner is-border--bottom vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">余额</span>
            <span>{{ item.myPlatCoin || 0 }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between vi-border is-border--thiner is-border--bottom vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">团队余额</span>
            <span>{{ item.myTeamPlatCoin || 0 }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between vi-border is-border--thiner is-border--bottom vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">今日收款</span>
            <span>{{ item.totayAmount || 0 }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between vi-border is-border--thiner is-border--bottom vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">全部收款</span>
            <span>{{ item.totalAmount || 0 }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between vi-border is-border--thiner is-border--bottom vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">分成值</span>
            <span>{{ item.agencyPercent || 0 }}%</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between vi-border is-border--thiner is-border--bottom vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">分成比例</span>
            <span>{{ item.bonusPercent || 0 }}%</span>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <div
        class="vi-flex is-justify-content--center is-align-items--center"
        style="height: 300px"
      >
        <div class="vi-text is-align--center">
          <div class="vi-margin-bottom">
            <span class="vi-icon vi-text is-color--gray">&#xe618;</span>
          </div>
          <div>
            <span class="vi-text is-color--gray">
              无成员信息
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
