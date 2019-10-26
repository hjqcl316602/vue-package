<script>
import { getAccount } from "../request";
import {
  getAdvertiseInit,
  createAdvertise,
  updateAdvertise
} from "../request/advert";
import regexer from "../../../package/es/regexer";
let regexerMoney = regexer.find(ele => {
  return ele["type"] === "number-money";
})["value"];
let modes = [
  {
    text: "银联",
    value: 1
  },
  {
    text: "微信",
    value: 2
  },
  {
    text: "支付宝",
    value: 3
  },
  {
    text: "云闪付",
    value: 4
  },
  {
    text: "聚合码",
    value: 5
  }
];
export default {
  name: "",
  data() {
    return {
      params: {
        id: "",
        type: "create",
        jyPassword: "",
        number: "",
        maxLimit: "",
        advertiseType: 1,
        mode: ""
      },
      base: {
        balance: 0,
        leftBuyLimit: 0,
        leftSellLimit: 0,
        limit: 0
      },
      actionType: {
        show: false,
        options: [
          {
            text: "在线出售",
            value: 1
          },
          {
            text: "在线购买",
            value: 0
          }
        ]
      },
      actionMode: {
        show: false,
        options: []
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.params.type = this.$route.params.type;
      this.params.id = this.$route.query.id || "";
      this.params.maxLimit = this.$route.query.maxLimit || "";
      this.params.mode = this.$route.query.mode || "";
      this.params.number = this.$route.query.number || "";
      this.getAccount();
      this.getAdvertiseInit();
    },
    save() {
      if (!regexerMoney.test(this.params.number)) {
        this.$message.danger("请输入合法的金额格式");
        return;
      }
      if (this.params.number < 100) {
        this.$message.danger("金额必须不小于100");
        return;
      }
      if (
        this.params.maxLimit &&
        this.params.maxLimit - 0 > this.params.number - 0
      ) {
        this.$message.danger("最大交易金额不能大于交易金额");
        return;
      }
      if (!this.params.mode) {
        this.$message.danger("请选择支付方式");
        return;
      }
      if (!this.params.jyPassword) {
        this.$message.danger("请输入您的资金密码");
        return;
      }
      if (this.params.type === "create") {
        this.createAdvertise();
      } else if (this.params.type === "update") {
        this.updateAdvertise();
      }
    },
    updateAdvertise() {
      updateAdvertise({
        id: this.params.id,
        jyPassword: this.params.jyPassword,
        number: this.params.number,
        maxLimit: this.params.maxLimit,
        advertiseType: this.params.advertiseType,
        pay: [this.params.mode]
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.$message.success(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    createAdvertise() {
      createAdvertise({
        jyPassword: this.params.jyPassword,
        number: this.params.number,
        maxLimit: this.params.maxLimit,
        advertiseType: this.params.advertiseType,
        pay: [this.params.mode]
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.$message.success(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    /**
     * 获取个人收款账号
     */
    getAccount() {
      getAccount().then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.actionMode.options = [];
          let list = (data.data || []).filter(item => item["checked"] === 1);
          list.forEach(el => {
            let type = el.type;
            let find = modes.find(elem => {
              return elem.value === type;
            });
            if (find) {
              if (find.value === 1) {
                find["subText"] = el.url + "|" + el.realName + "|" + el.name;
              } else if (find.value === 5) {
                find["subText"] = el.name + "|" + el.alipayOrMask;
              } else {
                find["subText"] = el.name + "|" + (el.realName || "--");
              }
              this.actionMode.options.push(find);
            }
          });
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    getAdvertiseInit() {
      getAdvertiseInit().then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.base = Object.assign(this.base, data.data);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    showAction(type) {
      if (type === "type") {
        this.actionType.show = true;
      } else if (type === "mode") {
        this.actionMode.show = true;
      }
    },
    selectActionType(item) {
      this.params.advertiseType = item.value;
    },
    selectActionMode(item) {
      this.params.mode = item.text;
    },
    updateMoney(value) {
      if (value === "all") {
        this.params.number = this.params.maxLimit =
          this.params.advertiseType === 1
            ? parseInt(this.base.leftSellLimit)
            : parseInt(this.base.leftBuyLimit);
      } else if (value === "half") {
        this.params.number = this.params.maxLimit =
          this.params.advertiseType === 1
            ? parseInt(this.base.leftSellLimit / 2)
            : parseInt(this.base.leftBuyLimit / 2);
      } else {
        this.params.number = this.params.maxLimit = value;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-panel vi-padding--large" style="min-height: 100vh">
    <vui-action
      :options="actionType.options"
      v-model="actionType.show"
      @select="selectActionType"
      :is-cancel="false"
    >
    </vui-action>
    <vui-action
      :options="actionMode.options"
      v-model="actionMode.show"
      @select="selectActionMode"
      :is-cancel="false"
    >
    </vui-action>
    <div>
      <div class="vi-border is-border--bottom is-border--thiner">
        <div class="vi-flex">
          <div
            style="line-height: 44px;width:80px"
            class="vi-padding-right vi-padding-left vi-text-align--right"
          >
            <span class="vi-font-weight--bold">广告类型</span>
          </div>
          <div
            class="vi-flex--1 vi-padding-right vi-padding-left"
            style="line-height: 44px;"
          >
            <span>
              {{ params.advertiseType === 1 ? " 在线出售" : "在线购买" }}
            </span>
          </div>
          <div
            v-if="params.type === 'create'"
            style="line-height: 44px;width:80px"
            class="vi-padding-right vi-padding-left vi-text-align--right"
            @click="showAction('type')"
          >
            <i class="iconfont icon-jiantou"></i>
          </div>
        </div>
      </div>

      <div class="vi-border is-border--bottom is-border--thiner">
        <div class="  vi-input is-input--larger is-input--require">
          <div
            style="line-height: 44px;width:80px"
            class="vi-padding-right vi-padding-left vi-text-align--right"
          >
            <span class="vi-font-weight--bold">交易金额</span>
          </div>
          <input
            type="number"
            class=""
            placeholder="请输入您的交易金额"
            v-model="params.number"
          />
          <div
            style="line-height: 44px"
            class="vi-padding-right vi-padding-left"
            v-if="params.number"
            @click="params.number = ''"
          >
            <i class="iconfont icon-shanchu" style="color:#999"></i>
          </div>
        </div>
      </div>

      <div class="vi-padding-top vi-padding-bottom vi-text-align--center">
        <template v-if="params.advertiseType === 1">
          <span class="vi-color--danger">可出售额度</span>
          <span class="vi-color--warning">{{ base.leftSellLimit }}</span>
          <span class="vi-color--danger">,交易数量不小于100</span>
        </template>
        <template v-else>
          <span class="vi-color--danger">可购买额度</span>
          <span class="vi-color--warning">{{ base.leftBuyLimit }}</span>
          <span class="vi-color--danger">,交易数量不小于100</span>
        </template>
      </div>
      <div class="vi-margin-bottom vi-margin-top vi-text-align--right">
        <div
          class="vi-btn is-btn--primary  is-btn--smaller is-btn--radius is-btn--thin"
          @click="updateMoney(1000)"
        >
          1K
        </div>
        <div
          class="vi-btn is-btn--primary  is-btn--smaller is-btn--radius is-btn--thin"
          @click="updateMoney(2000)"
        >
          2K
        </div>
        <div
          class="vi-btn is-btn--primary  is-btn--smaller is-btn--radius is-btn--thin"
          @click="updateMoney(3000)"
        >
          3K
        </div>
        <div
          class="vi-btn is-btn--primary  is-btn--smaller is-btn--radius is-btn--thin"
          @click="updateMoney(4000)"
        >
          4K
        </div>
        <div
          class="vi-btn is-btn--primary  is-btn--smaller is-btn--radius is-btn--thin"
          @click="updateMoney(5000)"
        >
          5K
        </div>
        <div
          class="vi-btn is-btn--primary  is-btn--smaller is-btn--radius is-btn--thin"
          @click="updateMoney('half')"
        >
          一半
        </div>
        <div
          class="vi-btn is-btn--primary  is-btn--smaller is-btn--radius is-btn--thin"
          @click="updateMoney('all')"
        >
          全部
        </div>
      </div>

      <div class="vi-border is-border--bottom is-border--thiner">
        <div class="  vi-input is-input--larger">
          <div
            style="line-height: 44px;width:90px"
            class="vi-padding-right vi-padding-left vi-text-align--right"
          >
            <span class="vi-font-weight--bold">最大交易额</span>
          </div>
          <input
            type="number"
            class=""
            placeholder="请输入您的最大交易金额"
            v-model="params.maxLimit"
          />
          <div
            style="line-height: 44px"
            class="vi-padding-right vi-padding-left"
            v-if="params.maxLimit"
            @click="params.maxLimit = ''"
          >
            <i class="iconfont icon-shanchu" style="color:#999"></i>
          </div>
        </div>
      </div>

      <div class="vi-border is-border--bottom is-border--thiner">
        <div class="vi-input is-input--larger is-input--require">
          <div
            style="line-height: 44px;width:80px"
            class="vi-padding-right vi-padding-left vi-text-align--right"
          >
            <span class="vi-font-weight--bold">支付方式</span>
          </div>
          <div
            class="vi-flex--1 vi-padding-right vi-padding-left"
            style="line-height: 44px;"
          >
            <span>
              {{ params.mode }}
            </span>
          </div>
          <div
            v-if="params.type === 'create'"
            style="line-height: 44px;width:80px"
            class="vi-padding-right vi-padding-left vi-text-align--right"
            @click="showAction('mode')"
          >
            <i class="iconfont icon-jiantou"></i>
          </div>
        </div>
      </div>
      <div class="vi-border is-border--bottom is-border--thiner">
        <div class="  vi-input is-input--larger is-input--require">
          <div
            style="line-height: 44px;width:80px"
            class="vi-padding-right vi-padding-left vi-text-align--right"
          >
            <span class="vi-font-weight--bold">密码</span>
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
          class="vi-btn is-btn--long is-btn--hollow is-btn--radius is-btn--primary is-btn--thiner"
          @click="save"
        >
          保存
        </div>
      </div>
    </div>
  </div>
</template>
