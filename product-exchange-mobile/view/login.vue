<script>
import { loginIn, loginCheck, getCaptcha } from "@/request/login";
import { mapState, mapMutations } from "vuex";
import { orderTradding } from "@/assets";

export default {
  name: "vv-login",
  data() {
    return {
      params: {
        username: "",
        password: ""
      },
      audio: {
        src: orderTradding
      },
      action: {
        options: this.$loginTypes,
        show: false
      }
    };
  },
  props: {},
  computed: mapState({
    loginType: state => state.login.type,
    loginMessage: state => state.login.message
  }),
  watch: {
    loginMessage: {
      handler(val) {
        let { username, password } = val;
        this.params.username = username;
        this.params.password = password;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      setLoginType: "set/login/type",
      setLoginMessage: "set/login/message",
      setUserMember: "set/user/member",
      setLogintoken: "set/login/token"
    }),
    init() {},
    selectAction(item) {
      this.setLoginType(item.value);
    },
    initGtCaptcha() {
      getCaptcha().then(({ data }) => {
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success, //表示用户后台检测极验服务器是否宕机
            new_captcha: data.new_captcha, //用于宕机时表示是新验证码的宕机
            product: "bind",
            width: "100%"
          },
          captcha => {
            this._captchaInit = captcha
              .onReady(() => {
                console.log("get is ready, and this function must do");
              })
              .onSuccess(() => {
                let result = (this._captchaResult = captcha.getValidate());
                if (!result) {
                  this.$message.danger("请完成验证");
                } else {
                  //console.log(result);
                  //this.handleSubmit("formInline");
                  this.loginIn();
                }
              });
          }
        );
      });
    },
    loginInBefore() {
      let { username, password } = this.params;
      if (!username) {
        return this.$message.danger("请输入您的账号");
      }
      if (!password) {
        return this.$message.danger("请输入您的密码");
      }
      this._captchaInit.verify();
    },

    loginIn() {
      let { username, password } = this.params;
      loginIn({ username, password }).then(res => {
        let data = res["data"];
        if (data["code"] === 0) {
          let message = data.data;
          if (this.loginType === "remember:username") {
            this.setLoginMessage({ username, password: "" });
          }
          if (this.loginType === "remember:usernameAndPassword") {
            this.setLoginMessage({ username, password });
          }
          if (this.loginType === "remember:none") {
            this.setLoginMessage({ username: "", password: "" });
          }
          if (message != null) {
            let { token } = message;
            this.setUserMember(message);
            this.setLogintoken(token);
            this.$message.success("恭喜您，登录成功");
            setTimeout(() => {
              this.$router.replace("/user");
            }, 1000);
          } else {
            this.$message.danger("登录失败，请重试");
          }
        } else {
          this.$message.danger(data["message"]);
        }
      });
    }
  },
  created() {
    this.initGtCaptcha();
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class=" ">
    <vui-action
      :options="action.options"
      v-model="action.show"
      @select="selectAction"
      :is-cancel="false"
    >
    </vui-action>
    <div style="">
      <div class="vi-text is-align--center" style="line-height: 100px">
        <span class="vi-text is-size--larger is-weight--bold">
          欢迎登录TTM
        </span>
      </div>
      <div class="vi-background vi-margin-bottom is-margin-bottom--large">
        <div
          class="vi-border is-border--bottom is-border--thiner vi-padding-ad"
        >
          <div
            class="vi-flex vi-tag is-tag--require"
            style="line-height: 44px; "
          >
            <div style=" width:40px" class=" vi-text is-align--right">
              <span class="">账号</span>
            </div>
            <input
              type="tel"
              class="vi-input is-input--larger"
              placeholder="请输入您的手机号码..."
              v-model="params.username"
            />
            <div
              style="line-height: 44px"
              class="vi-padding-right vi-padding-left"
              v-if="params.username"
              @click="params.username = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div
          class="vi-border is-border--bottom is-border--thiner vi-padding-ad"
        >
          <div
            class="vi-flex vi-tag is-tag--require"
            style="line-height: 44px; "
          >
            <div style=" width:40px" class=" vi-text is-align--right">
              <span class="">密码</span>
            </div>
            <input
              type="password"
              class="vi-input is-input--larger"
              placeholder="请输入您的密码..."
              v-model="params.password"
            />
            <div
              style="line-height: 44px"
              class="vi-padding-right vi-padding-left"
              v-if="params.password"
              @click="params.password = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>

        <div
          class="vi-border is-border--bottom is-border--thiner vi-padding-ad"
          @click="action.show = true"
        >
          <div class="vi-flex vi-padding-left" style="line-height: 44px; ">
            <div style=" width:40px" class=" vi-text is-align--right">
              <span class="">方式</span>
            </div>
            <div class="vi-flex-item is-flex--1">
              <div
                class="vi-flex is-justify-content--space-between vi-padding-ad"
              >
                <span>{{ $getLoginTypes(this.loginType).text }}</span>
                <span class="vv-icon vi-icon">&#xe61f;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          class="vi-btn is-btn--pack is-btn--larger is-btn--primary   is-btn--long"
          @click="loginInBefore"
        >
          登录
        </div>
      </div>
    </div>
  </div>
</template>
