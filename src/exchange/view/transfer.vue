<script>
import { getTransferHis, transferToUser, transferToOrder } from "../request";
import { getAdvertiseInit } from "../request/advert";
import regexer from "../../../package/es/regexer";
let regexerMoney = regexer.find(ele => {
  return ele["type"] === "number-money";
})["value"];
console.log(regexerMoney);
export default {
  name: "",
  data() {
    return {
      params: {
        username: "",
        number: "",
        mobile: "",
        realName: "",
        jyPassword: "",
        unit: "",
        balance: "",
        orderSn: "",
        type: "",
        actionShow: false
      },
      action: {
        show: false,
        options: []
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.params = Object.assign(this.params, this.$route.query);
      if (this.params.type === "order") {
        this.params.number = this.params.money;
      }
      this.getAdvertiseInit();
      this.getTransferHis();
    },
    select(item) {
      this.params.mobile = item.text;
      this.params.realName = item.subText;
    },
    getAdvertiseInit() {
      getAdvertiseInit().then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.params.balance = data.data ? data.data.balance : 0;
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    getTransferHis() {
      getTransferHis().then(res => {
        let data = res["data"];

        if (data.code === 0) {
          let list = data["data"] || [];
          list.forEach(ele => {
            this.action.options.push({
              text: ele["mobilePhone"],
              subText: ele["realName"]
            });
          });
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    sure() {
      if (this.params.type === "inner") {
        this.transferToUser();
      } else if (this.params.type === "order") {
        this.transferToOrder();
      }
    },
    transferToOrder() {
      if (!regexerMoney.test(this.params.number)) {
        this.$message.danger("请输入合法的金额格式");
        return;
      }
      if (!this.params.jyPassword) {
        this.$message.danger("请输入您的资金密码");
        return;
      }
      transferToOrder({
        number: this.params.number,
        jyPassword: this.params.jyPassword,
        orderSn: this.params.orderSn
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    transferToUser() {
      if (!regexerMoney.test(this.params.number)) {
        this.$message.danger("请输入合法的金额格式");
        return;
      }
      if (!this.params.mobile) {
        this.$message.danger("请输入对方的手机号码");
        return;
      }
      if (!this.params.realName) {
        this.$message.danger("请输入对方的真实姓名");
        return;
      }
      if (!this.params.jyPassword) {
        this.$message.danger("请输入您的资金密码");
        return;
      }
      transferToUser({
        number: this.params.number,
        mobile: this.params.mobile,
        realName: this.params.realName,
        jyPassword: this.params.jyPassword,
        unit: this.params.unit
      }).then(res => {
        let data = res["data"];
        if (data["code"] === 0) {
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
          this.$message.success("转账成功");
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
  <div class="vv-transfer vv-panel" style=" min-height: 100vh">
    <vui-action
      :options="action.options"
      v-model="action.show"
      @select="select"
      :is-cancel="false"
    ></vui-action>
    <div class="vi-padding--large ">
      <div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="  vi-input is-input--larger is-input--require">
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <span class="vi-font-weight--bold">数量</span>
            </div>
            <input
              type="number"
              class=""
              placeholder="请输入您的要转账的数量..."
              v-model="params.number"
            />
            <div
              style="line-height: 43px"
              class="vi-padding-right vi-padding-left"
              v-if="params.number"
              @click="params.number = ''"
            >
              <i class="iconfont icon-shanchu" style="color:#999"></i>
            </div>
            <div style="line-height: 44px">
              <span>TTM</span>
            </div>
          </div>
        </div>
        <div class="vi-margin-top vi-padding-left--large">
          <span class="vi-font-size--smaller vi-color--danger ">
            提示：最多转账数量
            <span class="vi-color--warning">{{ params.balance }}</span>
            TTM
          </span>
        </div>
        <template v-if="params.type === 'inner'">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require ">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">手机号</span>
              </div>
              <input
                type="tel"
                class=""
                placeholder="请输入对方的手机号码"
                v-model="params.mobile"
              />
              <div
                style="line-height: 44px"
                class="vi-padding-right vi-padding-left"
                v-if="params.mobile"
                @click="params.mobile = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
              <div v-if="action.options.length > 0">
                <div
                  class="vi-btn is-btn--primary is-btn--larger "
                  @click="action.show = true"
                >
                  账号簿
                </div>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">真实姓名</span>
              </div>
              <input
                type="text"
                class=""
                placeholder="请输入对方的真实姓名"
                v-model="params.realName"
              />
              <div
                style="line-height: 44px"
                class="vi-padding-right vi-padding-left"
                v-if="params.realName"
                @click="params.realName = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
        </template>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="  vi-input is-input--larger is-input--require">
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <span class="vi-font-weight--bold">资金密码</span>
            </div>
            <input
              type="password"
              class=""
              placeholder="请输入您的资金密码"
              v-model="params.jyPassword"
            />
            <div
              style="line-height: 44px"
              class="vi-padding-right vi-padding-left"
              v-if="params.jyPassword"
              @click="params.jyPassword = ''"
            >
              <i class="iconfont icon-shanchu" style="color:#999"></i>
            </div>
          </div>
        </div>
        <div class="vi-margin-top--large">
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--long is-btn--radius is-btn--thiner"
            @click="sure"
          >
            确定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
