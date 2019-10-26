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
        class="vv-panel vi-border is-border--thiner is-border--bottom"
        v-for="(item, index) in follower"
        :key="index"
        @click="
          $router.push({
            path: '/team-detail',
            query: { memberId: item.memberId }
          })
        "
      >
        <div class="vi-padding--large">
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">昵称</span>
            <span class="vi-color--primary">{{ item.userName }}</span>
          </div>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">余额</span>
            <span>{{ item.myPlatCoin || 0 }}</span>
          </div>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">团队余额</span>
            <span>{{ item.myTeamPlatCoin || 0 }}</span>
          </div>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">今日收款</span>
            <span>{{ item.totayAmount || 0 }}</span>
          </div>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">全部收款</span>
            <span>{{ item.totalAmount || 0 }}</span>
          </div>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">分成值</span>
            <span>{{ item.agencyPercent || 0 }}%</span>
          </div>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">分成比例</span>
            <span>{{ item.bonusPercent || 0 }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="vi-padding--large vi-center" style="height: 100vh" v-else>
      <div class="vi-text-align--center">
        <div class="vi-margin-bottom">
          <i
            class="iconfont icon-meiyoudingdan-01 vi-color--gray vi-font-size--large"
          ></i>
        </div>
        <div>
          <span class="vi-color--gray">
            无成员信息
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
