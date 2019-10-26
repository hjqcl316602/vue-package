<script>
import { loginOut } from "../request/login";
import { mapState, mapMutations } from "vuex";
let loginCacheTypes = [
  { text: "账号", value: 1 },
  { text: "账号和密码", value: 2 },
  { text: "均不", value: 3 }
];
let orderNoticeDuration = [
  { text: "5秒钟", value: 5 * 1000 },
  { text: "10秒钟", value: 10 * 1000 },
  { text: "20秒钟", value: 20 * 1000 },
  { text: "30秒钟", value: 30 * 1000 },
  { text: "1分钟", value: 60 * 1000 }
];
export default {
  name: "",
  data() {
    return {
      action: {
        login: {
          show: false,
          options: loginCacheTypes
        },
        notice: {
          show: false,
          options: orderNoticeDuration
        }
      },
      notice: {
        time: 5000
      }
    };
  },
  props: {},
  computed: mapState({
    loginCacheType: state => state.login.cache.type
  }),
  methods: {
    ...mapMutations({
      setLoginCacheType: "set/login/cache/type",
      setMember: "set/member"
    }),
    init() {
      this.notice.time = localStorage.getItem("order/notice/time") || 5000;
    },
    loginOut() {
      loginOut().then(res => {
        let data = res["data"];
        if (data["code"] === 0) {
          this.setMember(null);
          this.$message.success("退出成功");
          setTimeout(() => {
            this.$router.replace("/login");
          }, 1000);
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    getLoginCacheText(value) {
      let find = loginCacheTypes.find(ele => {
        return ele.value === Number(value);
      });
      return find && find.text;
    },
    getOrderNoticeTimeText(value) {
      let find = orderNoticeDuration.find(ele => {
        return ele.value === Number(value);
      });
      return find;
    },
    setOrderNoticeTime(value) {
      this.notice.time = value;
      localStorage.setItem("order/notice/time", value);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="">
    <vui-action
      :options="action.login.options"
      v-model="action.login.show"
      @select="item => setLoginCacheType(item.value)"
      :is-cancel="false"
    ></vui-action>
    <vui-action
      :options="action.notice.options"
      v-model="action.notice.show"
      @select="item => setOrderNoticeTime(item.value)"
      :is-cancel="false"
    ></vui-action>
    <div class="vv-panel">
      <div
        class="vi-border is-border--bottom is-border--thiner vi-flex vi-justify-content--space-between vi-padding-left--large vi-padding-right--large"
        @click="action.login.show = true"
        style="line-height: 48px"
      >
        <div>
          <span class="">登录信息记住方式</span>
          <span class="vi-font-size--small vi-color--danger">
            （重新登录生效）
          </span>
        </div>
        <div>
          <span>{{ getLoginCacheText(loginCacheType) }}</span>
          <i class="iconfont icon-jiantou"></i>
        </div>
      </div>
      <div
        class="vi-border is-border--bottom is-border--thiner vi-flex vi-justify-content--space-between vi-padding-left--large vi-padding-right--large"
        @click="action.notice.show = true"
        style="line-height: 48px"
      >
        <div>
          <span class="">订单语音提醒间隔</span>
          <span class="vi-font-size--small vi-color--danger">
            （重新登录生效）
          </span>
        </div>
        <div>
          <span> {{ getOrderNoticeTimeText(notice.time).text }}</span>
          <i class="iconfont icon-jiantou"></i>
        </div>
      </div>
      <div
        class="vi-border is-border--bottom is-border--thiner vi-flex vi-justify-content--space-between vi-padding-left--large vi-padding-right--large"
        style="line-height: 48px"
        @click="$router.push('/password')"
      >
        <div>
          <span class="">资金密码</span>
        </div>
        <div>
          <i class="iconfont icon-jiantou"></i>
        </div>
      </div>
    </div>

    <div
      class="vi-btn is-btn--pack is-btn--white is-btn--long is-btn--larger"
      @click="loginOut"
    >
      退出登录
    </div>
  </div>
</template>
