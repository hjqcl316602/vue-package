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
  <div class="vv-panel " style="min-height: 100vh">
    <div
      class="vi-border is-border--bottom is-border--thiner vi-padding-left--large vi-padding-right--large"
    >
      <template v-if="message.parentName">
        <div
          style="line-height: 48px"
          class="vi-flex vi-justify-content--space-between"
        >
          <span class="">我的推广人</span>
          <span class="">
            {{ message.parentName }}
          </span>
        </div>
      </template>
      <template v-else>
        <div
          style="line-height: 48px"
          class="vi-flex vi-justify-content--space-between"
          @click="$router.push('/team-bind')"
        >
          <span class="">我的推广人</span>
          <span class="iconfont icon-jiantou"></span>
        </div>
      </template>
    </div>
    <div
      class="vi-border is-border--bottom is-border--thiner vi-padding-left--large vi-padding-right--large"
    >
      <div
        style="line-height: 48px"
        class="vi-flex vi-justify-content--space-between"
      >
        <span class="">我的推广码</span>
        <span>
          {{ message.promotionCode }}
        </span>
      </div>
    </div>
    <div
      class="vi-border is-border--bottom is-border--thiner vi-padding-left--large vi-padding-right--large"
    >
      <div
        style="line-height: 48px"
        class="vi-flex vi-justify-content--space-between"
      >
        <span class="">我的分成值</span>
        <span> {{ message.memberPercent || 0 }}% </span>
      </div>
    </div>

    <div
      class="vi-border is-border--bottom is-border--thiner vi-padding-left--large vi-padding-right--large"
    >
      <div
        style="line-height: 48px"
        class="vi-flex vi-justify-content--space-between"
      >
        <span class="">我的余额</span>
        <span> {{ message.myPlatCoin || 0 }} </span>
      </div>
    </div>
    <div
      class="vi-border is-border--bottom is-border--thiner vi-padding-left--large vi-padding-right--large"
    >
      <div
        style="line-height: 48px"
        class="vi-flex vi-justify-content--space-between"
      >
        <span class="">团队余额</span>
        <span> {{ message.totalPlatCoin || 0 }} </span>
      </div>
    </div>
    <div
      class="vi-border is-border--bottom is-border--thiner vi-padding-left--large vi-padding-right--large"
    >
      <div
        style="line-height: 48px"
        class="vi-flex vi-justify-content--space-between"
        @click="$router.push('/team-list')"
      >
        <span class="">我的团队</span>
        <span>
          <span class="iconfont icon-jiantou"></span>
        </span>
      </div>
    </div>
  </div>
</template>
