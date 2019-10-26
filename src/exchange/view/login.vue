<script>
import { loginIn } from "../request/login";
import { mapState } from "vuex";
import { orderTradding } from "../assets";

export default {
  name: "vv-login",
  data() {
    return {
      params: {
        username: localStorage.getItem("login/username"),
        password: localStorage.getItem("login/password")
      },
      audio: {
        src: orderTradding
      },
      action: {
        options: this.loginTypes,
        show: false
      }
    };
  },
  props: {},
  computed: mapState({
    member: "member",
    loginCacheType: state => state.login.cache.type
  }),
  methods: {
    selectAction() {},
    loginIn() {
      this.$parent.playAudio(true);
      loginIn(this.params).then(res => {
        let data = res["data"];
        if (data["code"] === 0) {
          let message = data.data;
          if (this.loginCacheType == 1) {
            localStorage.setItem("login/username", this.params.username);
          }
          if (this.loginCacheType == 2) {
            localStorage.setItem("login/username", this.params.username);
            localStorage.setItem("login/password", this.params.password);
          }
          if (this.loginCacheType == 3) {
            localStorage.removeItem("login/username");
            localStorage.removeItem("login/password");
          }

          if (message != null) {
            let token = message.token;
            this.$store.commit("set/member", message);
            localStorage.setItem("service/token", token);
            this.$message.success("恭喜您，登录成功");
            //let redirect = localStorage.getItem("login/redirect");
            //localStorage.removeItem("login/redirect");
            this.$parent.setTimer();
            setTimeout(() => {
              this.$router.replace("/user");
            }, 1000);
          } else {
            this.$message.danger("获取登录信息失败，请重试");
          }
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    onNavigationBar({ index }) {
      console.log(index);
    }
  },
  created() {
    this.$parent.clearTimer();
  },
  mounted() {}
};
</script>

<template>
  <div class=" ">
    <audio ref="audio-play">
      您的浏览器不支持 audio 标签。
    </audio>
    <vui-action
      :options="action.options"
      v-model="action.show"
      @select="selectAction"
      :is-cancel="false"
    >
    </vui-action>
    <div style="">
      <div class="vi-text-align--center" style="line-height: 100px">
        <span class="vi-font-size--larger vi-font-weight--bold">
          欢迎登录TTM
        </span>
      </div>
      <div class="vi-margin-bottom--large vi-background">
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="  vi-input is-input--larger vi-require">
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <span class="">账号</span>
            </div>
            <input
              type="text"
              class=""
              placeholder="请输入您的手机号码..."
              v-model="params.username"
            />
            <div
              style="line-height: 44px"
              class="vi-padding-right vi-padding-left"
              v-if="params.username"
              @click="params.username = ''"
            >
              <i class="iconfont icon-shanchu" style="color:#999"></i>
            </div>
          </div>
        </div>
        <div class="  vi-border is-border--bottom is-border--thiner">
          <div class="vi-input is-input--larger vi-require">
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <span class="">密码</span>
            </div>
            <input
              type="password"
              class=""
              placeholder="请输入您的密码..."
              v-model="params.password"
            />
            <div
              style="line-height: 44px"
              class="vi-padding-right vi-padding-left"
              v-if="params.password"
              @click="params.password = ''"
            >
              <i class="iconfont icon-shanchu" style="color:#999"></i>
            </div>
          </div>
        </div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex  vi-padding-left  " @click="action.show = true">
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <span class="">方式</span>
            </div>
            <div
              class="vi-flex--1 vi-padding-right vi-padding-left"
              style="line-height: 44px;"
            >
              <span> </span>
            </div>
            <div
              style="line-height: 44px; "
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <i class="iconfont icon-jiantou"></i>
            </div>
          </div>
        </div>
        <div
          class=" vi-border is-border--bottom is-border--thiner"
          v-if="false"
        >
          <div class="vi-input is-input--larger">
            <div
              style="line-height: 44px"
              class="vi-padding-right vi-padding-left"
            >
              <i class="iconfont icon-yanzhengma" style="color:#999"></i>
            </div>
            <input type="text" class="" placeholder="请输入验证码..." />
            <div
              style="line-height: 44px"
              class="vi-padding-right vi-padding-left"
            >
              <i class="iconfont icon-shanchu" style="color:#999"></i>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          class="vi-btn is-btn--pack is-btn--larger is-btn--primary   is-btn--long"
          @click="loginIn"
        >
          登录
        </div>
      </div>
    </div>
  </div>
</template>
