<script>
import { getAgencyMessage } from "@/request/user";

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
      getAgencyMessage().then(({ data }) => {
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
  <div>
    <div class="vi-background">
      <div class="vi-border is-border--bottom is-border--thiner vi-padding-ad">
        <div
          class="vi-flex is-justify-content--space-between vi-text is-height--larger"
        >
          <span class="vi-text is-color--light">我的推广人</span>
          <span class="">
            {{ message.parentName }}
          </span>
        </div>

        <template v-if="false">
          <div
            class="vi-flex is-justify-content--space-between vi-text is-height--larger"
            @click="$router.push('/team-bind')"
          >
            <span class="vi-text is-color--light">我的推广人</span>
            <span class="iconfont icon-jiantou"></span>
          </div>
        </template>
      </div>
      <div class="vi-border is-border--bottom is-border--thiner  vi-padding-ad">
        <div
          class="vi-flex is-justify-content--space-between vi-text is-height--larger"
        >
          <span class="vi-text is-color--light">我的推广码</span>
          <span>
            {{ message.promotionCode }}
          </span>
        </div>
      </div>
      <div class="vi-border is-border--bottom is-border--thiner vi-padding-ad">
        <div
          class="vi-flex is-justify-content--space-between vi-text is-height--larger"
        >
          <span class="vi-text is-color--light">我的分成值</span>
          <span> {{ message.memberPercent || 0 }}% </span>
        </div>
      </div>

      <div class="vi-border is-border--bottom is-border--thiner vi-padding-ad">
        <div
          class="vi-flex is-justify-content--space-between vi-text is-height--larger"
        >
          <span class="vi-text is-color--light">我的余额</span>
          <span> {{ message.myPlatCoin || 0 | toShousand }} </span>
        </div>
      </div>
      <div class="vi-border is-border--bottom is-border--thiner vi-padding-ad">
        <div
          class="vi-flex is-justify-content--space-between vi-text is-height--larger"
        >
          <span class="vi-text is-color--light">团队余额</span>
          <span> {{ message.totalPlatCoin || 0 | toShousand }} </span>
        </div>
      </div>
      <div class="vi-border is-border--bottom is-border--thiner vi-padding-ad">
        <div
          class="vi-flex is-justify-content--space-between vi-text is-height--larger"
          @click="$router.push('/team-list')"
        >
          <span class="vi-text is-color--light">我的团队</span>
          <span class="vi-icon ">&#xe61f;</span>
        </div>
      </div>
    </div>
  </div>
</template>
