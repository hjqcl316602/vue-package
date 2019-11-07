<script>
import { getCdUnRead } from "@/request/chat";

import { loginCheck } from "./request/login";
import { getTraddingOrder } from "./request/order";
import { mapState, mapMutations } from "vuex";
import { orderTradding } from "./assets";
import axios from "axios";
console.log(orderTradding);
export default {
  name: "",
  data() {
    return {
      audio: {
        src: orderTradding,
        timer: null,
        count: 0
      }
    };
  },
  props: {},
  computed: mapState({
    pageMessage: state => state.page.message,
    orderNoticeDurationType: state => state.order.noticeDurationType,
    userMember: state => state.user.member,
    orderNoticeType: state => state.order.noticeType
  }),
  created() {
    this.loginCheck();
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setUserMember: "set/user/member",
      setLogintoken: "set/login/token",
      setOrderTradding: "set/order/tradding",
      setChatUnread: "set/chat/unread"
    }),
    loginCheck() {
      loginCheck().then(({ data }) => {
        if (data.code === 0) {
          let message = data.data;
          if (message != null) {
            let { token } = message;
            this.setUserMember(message);
            this.setLogintoken(token);
          }
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    getTraddingOrder() {
      getTraddingOrder().then(({ data }) => {
        if (data.code === 0) {
          let message = data.data;
          let totalOrder = message.sell + message.buy;
          let totalAppeal = message.appeal;
          this.setOrderTradding(data["data"]);
          if (this.orderNoticeType.indexOf("type:voice") > -1) {
            if (totalOrder + totalAppeal > 0) {
              this.playAudio();
            }
          }
        } else {
          //this.$message.danger(data["message"]);
        }
      });
    },
    getUnread() {
      getCdUnRead({ cdId: this.userMember.id }).then(({ data }) => {
        if (data.code === "000") {
          this.setChatUnread(data.data.unReadCnt || 0);
        }
      });
    },
    setTimer() {
      this.clearTimer();
      this.getTraddingOrder();
      this.getUnread();
      this._timer = setInterval(() => {
        this.getTraddingOrder();
        this.getUnread();
      }, this.orderNoticeDurationType);
    },
    clearTimer() {
      clearInterval(this._timer);
      this._timer = null;
    },

    playAudio() {
      setTimeout(() => {
        let audioDom = document.getElementById("noticeMusic");

        if (audioDom !== null) {
          audioDom.play();
        }
      }, 30);
    },
    handler(text, index, type) {
      this.$children[0].onNavigationBarTap({ text, index, type });
    }
  },
  watch: {
    userMember: {
      handler(val) {
        if (val) {
          this.setTimer();
        } else {
          this.clearTimer();
        }
      }
    },
    orderNoticeDurationType() {
      this.setTimer();
    },
    orderNoticeType() {
      this.setTimer();
    }
  },
  beforeDestroy() {
    this.clearTimer();
  }
};
</script>

<template>
  <div class="" style="padding-top: 44px">
    <audio id="noticeMusic" :src="audio.src">
      您的浏览器不支持 audio 标签。
    </audio>
    <div
      class="vv-header vi-background is-background--parimary vi-padding-right vi-padding-left"
      style="height:44px"
    >
      <div class="vi-row ">
        <div class="vi-span is-span--8">
          <template v-for="(item, index) in pageMessage.prev">
            <span
              class="vi-text is-color--white is-size--small vi-margin-right"
              style="line-height: 44px"
              @click="handler(item, index, 'prev')"
            >
              {{ item }}
            </span>
          </template>
        </div>
        <div
          class="vi-span is-span--8 vi-text is-align--center"
          style="line-height: 44px"
        >
          <span class="vi-text is-color--white is-size--small ">
            {{ pageMessage.title }}
          </span>
        </div>
        <div class="vi-span is-span--8 vi-text is-align--right">
          <template v-for="(item, index) in pageMessage.next">
            <span
              class="vi-text is-color--white is-size--small vi-margin-left"
              style="line-height: 44px"
              @click="handler(item, index)"
            >
              {{ item }}
            </span>
          </template>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
