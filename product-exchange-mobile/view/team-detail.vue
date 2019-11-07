<script>
import { getAgencyMessage } from "../request/user";
export default {
  name: "",
  data() {
    return {
      params: {
        memberId: ""
      },
      message: {}
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
          this.message =
            follower.find(ele => {
              return ele.memberId == this.params.memberId;
            }) || {};
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    handler(type) {
      if (type === "update") {
        this.$router.push({
          path: "/team-update",
          query: { memberId: this.params.memberId }
        });
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vi-padding--large vv-panel" style="min-height: 100vh">
    <div class="">
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">昵称</span>
        <span class="vi-color--primary">{{ message.userName }}</span>
      </div>
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">编号</span>
        <span class="">{{ message.memberId }}</span>
      </div>

      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">余额</span>
        <span>{{ message.myPlatCoin || 0 }}</span>
      </div>
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">团队余额</span>
        <span>{{ message.myTeamPlatCoin || 0 }}</span>
      </div>

      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">今日收款</span>
        <span>{{ message.totayAmount || 0 }}</span>
      </div>
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">全部收款</span>
        <span>{{ message.totalAmount || 0 }}</span>
      </div>
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">分成值</span>
        <span>{{ message.agencyPercent || 0 }}%</span>
      </div>
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">分成比例</span>
        <span>{{ message.bonusPercent || 0 }}%</span>
      </div>
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">加入时间</span>
        <span>{{ message.joinTeamTime || "--" }}</span>
      </div>
    </div>
    <div class="vi-margin-top--large vi-text-align--right">
      <div
        class="vi-btn is-btn--warning is-btn--radius   is-btn--hollow is-btn--thiner"
        @click="handler('update')"
      >
        修改分成比例
      </div>
    </div>
  </div>
</template>
