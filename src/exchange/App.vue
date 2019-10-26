<script>
import { loginCheck } from "./request/login";
import { getTraddingOrder } from "./request/order";
import { mapState, mapMutations } from "vuex";
import { orderTradding } from "./assets";

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
    orderNoticeDuration: state => state.order.notice.duration,
    member: state => state.member,
    pageMessage: state => state.page.message
  }),
  methods: {
    ...mapMutations({
      setMember: "set/member"
    }),
    getTraddingOrder() {
      getTraddingOrder().then(res => {
        let data = res.data;
        if (data.code === 0) {
          let message = data.data;
          let total = message.sell + message.buy + message.appeal;
          this.$store.commit("set/order/traddding", data["data"]);
          if (total > 0) {
            this.playAudio();
          }
        } else {
          //this.$message.danger(data["message"]);
        }
      });
    },
    setTimer() {
      this.clearTimer();
      let noticeTime = localStorage.getItem("order/notice/time") || 5000;
      this.getTraddingOrder();
      this._timer = setInterval(() => {
        this.getTraddingOrder();
      }, noticeTime);
    },
    clearTimer() {
      clearInterval(this._timer);
      this._timer = null;
    },

    playAudio(isBefore = false) {
      this.audio.count++;
      var audio = this.$refs["audio-play"]; //document.getElementById("orderTradding");

      if (audio !== null) {
        setTimeout(() => {
          audio.src = this.audio.src;
          audio.play();
          isBefore && audio.pause(); // 处理ios不能播放的问题，需要假装播放一次即可,并且需要手指触摸一次
        }, 20);
      }
    },
    handler(item, index) {
      this.$children[0].onNavigationBar({ item, index });
    }
  },
  watch: {
    member(val) {}
  },
  created() {},
  beforeDestroy() {
    //this.clearTimer();
    //this.setMember(null);
  }
};
</script>

<template>
  <div class="" style="padding-top: 44px">
    <div
      class="vv-header vi-background is-background--parimary vi-padding-right vi-padding-left"
      style="height:44px"
    >
      <div class="vi-row ">
        <div class="vi-span--8"></div>
        <div class="vi-span--8 vi-text-align--center" style="line-height: 44px">
          <span class="vi-color--white vi-font-size--large">
            {{ pageMessage.title }}
          </span>
        </div>
        <div class="vi-span--8 vi-text-align--right">
          <template v-for="(item, index) in pageMessage.buttons">
            <span
              class="vi-color--white"
              style="line-height: 44px"
              @click="handler(item, index)"
            >
              {{ item }}
            </span>
          </template>
        </div>
      </div>
    </div>
    <audio id="orderTradding" ref="audio-play">
      您的浏览器不支持 audio 标签。
    </audio>
    <router-view />
  </div>
</template>
