<script>
import { mapState, mapMutations } from "vuex";
import { loginOut } from "@/request/login";
export default {
  name: "",
  data() {
    return {
      confirmPopup: {
        loginout: false,
        clear: false
      },
      actionPopup: {
        noticeType: false,
        noticeDurationType: false
      }
    };
  },

  props: {},
  computed: {
    ...mapState({
      userMember: state => state.user.member,
      loginMessage: state => state.login.message,
      orderNoticeType: state => state.order.noticeType,
      noticeDurationType: state => state.order.noticeDurationType
    }),
    orderNoticeTypeMessage() {
      let { orderNoticeType } = this;
      let message = [];
      orderNoticeType.forEach(ele => {
        message.push(this.$getNoticeTypes(ele).text);
      });
      return message.join("+");
    }
  },
  methods: {
    ...mapMutations({
      setOrderNoticeDurationType: "set/order/noticeDurationType",
      setOrderNoticeType: "set/order/noticeType",
      clearStore: "clearStore"
    }),
    selectAction(picker, type) {
      if (type === "noticeType") {
        let { value } = picker;
        let noticeType = this.orderNoticeType.slice();
        if (noticeType.includes(value)) {
          noticeType = noticeType.filter(ele => ele !== value) || [];
        } else {
          noticeType.push(value);
        }
        this.setOrderNoticeType(noticeType);
      } else if (type === "noticeDurationType") {
        this.setOrderNoticeDurationType(picker.value);
      }
    },
    confirmOk(type) {
      if (type === "loginout") {
        this.loginOut();
      } else if (type === "clear") {
        this.clearStore();
        this.loginOut();
      }
    },
    loginOut() {
      loginOut().then(({ data }) => {
        if (data.code === 0) {
          this.$message.success("退出成功");
          setTimeout(() => {
            this.$router.replace("/login");
          }, 1000);
        } else {
          this.$message.danger(data["message"]);
        }
      });
    }
  },
  mounted() {
    console.log(this);
  }
};
</script>

<template>
  <div class="">
    <template>
      <vui-action
        :options="$noticeTypes"
        v-model="actionPopup.noticeType"
        @select="value => selectAction(value, 'noticeType')"
      >
      </vui-action>
      <vui-action
        :options="$noticeDurationTypes"
        v-model="actionPopup.noticeDurationType"
        @select="value => selectAction(value, 'noticeDurationType')"
      >
      </vui-action>
      <vui-confirm v-model="confirmPopup.loginout" title="确认信息">
        <div
          class="vi-padding vi-text is-align--center"
          style="line-height: 50px"
        >
          <span>您是否确认退出登录？</span>
        </div>
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="confirmOk('loginout')"
          >
            确认退出
          </div>
        </div>
      </vui-confirm>
      <vui-confirm v-model="confirmPopup.clear" title="确认信息">
        <div
          class="vi-padding vi-text is-align--center"
          style="line-height: 50px"
        >
          <span>您是否确认清理缓存空间？</span>
        </div>
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="confirmOk('clear')"
          >
            确认清除
          </div>
        </div>
      </vui-confirm>
    </template>
    <div class="vi-background vi-margin-bottom">
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
      >
        <span class="vi-text is-color--light">用户编号</span>
        <span>{{ userMember.id }}</span>
      </div>
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
      >
        <span class="vi-text is-color--light">昵称</span>
        <span>{{ userMember.username }}</span>
      </div>
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
      >
        <span class="vi-text is-color--light">实名</span>
        <span>{{ userMember.realName }}</span>
      </div>
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
      >
        <span class="vi-text is-color--light">账号（手机号）</span>
        <span>{{ loginMessage.username }}</span>
      </div>
    </div>

    <div class="vi-background vi-margin-bottom">
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
      >
        <span class="vi-text is-color--light">登录次数</span>
        <span>{{ userMember.loginCount }}</span>
      </div>
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
        @click="confirmPopup.clear = true"
      >
        <span class="vi-text is-color--light">清理缓存空间</span>
        <span>
          <span class="vi-icon vi-text">&#xe61f;</span>
        </span>
      </div>
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
        @click="confirmPopup.loginout = true"
      >
        <span class="vi-text is-color--light">退出登录</span>
        <span>
          <span class="vi-icon vi-text">&#xe61f;</span>
        </span>
      </div>
    </div>

    <div class="vi-background vi-margin-bottom">
      <div
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
        @click="actionPopup.noticeType = true"
      >
        <span class="vi-text is-color--light">订单提醒方式</span>
        <span>
          <span>{{ orderNoticeTypeMessage }}</span>
          <span class="vi-icon vi-text vi-margin-left">&#xe61f;</span>
        </span>
      </div>
      <div
        v-if="orderNoticeType.includes('type:voice')"
        class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 44px"
        @click="actionPopup.noticeDurationType = true"
      >
        <span class="vi-text is-color--light">订单语音提醒时间间隔</span>
        <span>
          <span>{{ $getNoticeDurationTypes(noticeDurationType).text }}</span>
          <span class="vi-icon vi-text vi-margin-left">&#xe61f;</span>
        </span>
      </div>
    </div>
  </div>
</template>
