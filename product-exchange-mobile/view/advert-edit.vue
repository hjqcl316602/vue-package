<script>
import { getAccount } from "@/request";
import {
  getAdvertiseInit,
  createAdvertise,
  updateAdvertise
} from "@/request/advert";
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      params: {
        id: "",
        type: "create",
        password: "",
        number: "",
        maxLimit: "",
        advertiseType: 1,
        payMode: ""
      },
      base: {
        balance: 0,
        leftBuyLimit: 0,
        leftSellLimit: 0,
        limit: 0
      },
      actionType: {
        show: false,
        options: this.$transactionTypes
      }
    };
  },
  props: {},
  computed: {
    ...mapState({
      pageCache: state => state.page.cache,
      pageAdvertType: state => state.page.advertType
    })
  },
  methods: {
    init() {
      this.params.type = this.$route.params.type;
      // 判断上一个页面是否是账号页面
      if (this.pageCache[this.pageCache.length - 1] === "account") {
        console.log("sss");
        this.params.payMode = this.$getAdvertTypes(this.pageAdvertType).text;
      } else {
        this.params.payMode = this.$route.query.payMode;
      }
      if (this.params.type === "update") {
        this.params.id = this.$route.query.id;
        this.params.advertiseType = this.$route.query.advertiseType - 0;
        this.params.maxLimit = this.$route.query.maxLimit - 0;
        this.params.number = this.$route.query.number - 0;
      }

      this.getAdvertiseInit();
    },
    updateAdvertise() {
      updateAdvertise({
        id: this.params.id,
        jyPassword: this.params.password,
        number: this.params.number,
        maxLimit: this.params.maxLimit,
        advertiseType: this.params.advertiseType,
        pay: [this.params.payMode]
      }).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    createAdvertise() {
      createAdvertise({
        jyPassword: this.params.password,
        number: this.params.number,
        maxLimit: this.params.maxLimit,
        advertiseType: this.params.advertiseType,
        pay: [this.params.payMode]
      }).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    getAdvertiseInit() {
      getAdvertiseInit().then(({ data }) => {
        if (data.code === 0) {
          this.base = Object.assign(this.base, data.data);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    selectAdvertType() {
      if (this.params.type === "create") {
        this.actionType.show = true;
      }
    },
    selectActionType(item) {
      this.params.advertiseType = item.value;
    },
    setNumber(type, value) {
      this.params[type] = value;
    },
    onNavigationBarTap({ index, text }) {
      if (index === 0 && text === "保存") {
        if (!this.params.payMode) {
          this.$message.danger("请选择支付方式");
          return;
        }
        if (!this.params.number) {
          this.$message.danger("请输入交易数量");
          return;
        }

        if (!this.params.password) {
          this.$message.danger("请输入您的资金密码");
          return;
        }
        if (this.params.type === "create") {
          this.createAdvertise();
        } else {
          this.updateAdvertise();
        }
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="">
    <template>
      <vui-action
        :options="actionType.options"
        v-model="actionType.show"
        @select="selectActionType"
      >
      </vui-action>
    </template>
    <div class="vi-background vi-margin-bottom">
      <div
        class="vi-border is-border--bottom is-border--thiner "
        @click="$router.push('/account?type=pick')"
        style="line-height: 44px;"
      >
        <div class="vi-flex vi-padding-ad">
          <div
            style="width:100px"
            class="vi-text is-align--right vi-padding-right"
          >
            <span class="vi-text">支付方式</span>
          </div>
          <div class="vi-flex-item is-flex--1 vi-padding-ad">
            <div class="vi-flex is-justify-content--space-between">
              <span>
                {{ params.payMode }}
              </span>
              <span class=" vi-icon">&#xe61f;</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="vi-border is-border--bottom is-border--thiner "
        @click="selectAdvertType"
        style="line-height: 44px;"
      >
        <div class="vi-flex vi-padding-ad">
          <div
            style="width:100px"
            class="vi-text is-align--right vi-padding-right"
          >
            <span class="vi-text">类型</span>
          </div>
          <div class="vi-flex-item is-flex--1 vi-padding-ad">
            <div class="vi-flex is-justify-content--space-between">
              <span>
                {{ $getTransactionTypes(params.advertiseType).text }}
              </span>
              <span class=" vi-icon" v-if="params.type === 'create'"
                >&#xe61f;</span
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="vi-flex vi-border is-border--bottom is-border--thiner vi-padding-ad"
        style="line-height: 44px"
      >
        <div
          style="width: 100px"
          class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
        >
          <span>交易数量</span>
        </div>
        <input
          type="number"
          class="vi-flex-item is-flex--1 vi-input is-input--larger"
          placeholder="请输入交易数量"
          v-model="params.number"
        />
        <div
          class="vi-padding-ad"
          v-if="params.number"
          @click="params.number = ''"
        >
          <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
        </div>
      </div>

      <div class="vi-border is-border--bottom is-border--thiner vi-padding">
        <div class="vi-text is-align--right" style="line-height: 32px">
          <template v-if="params.advertiseType === 1">
            <span class="vi-text is-color--danger">可出售额度</span>
            <span class="vi-text is-color--warning">
              {{ base.leftSellLimit | toShousand }}
            </span>
            <!--<span class="vi-text is-color&#45;&#45;danger">-->
            <!--,交易数量不小于-->
            <!--{{ params.payMode === "支付宝" ? "50100" : "10000" }}-->
            <!--</span>-->
          </template>
          <template v-else>
            <span class="vi-text is-color--danger">可购买额度</span>
            <span class="vi-text is-color--warning">
              {{ base.leftBuyLimit | toShousand }}
            </span>
            <!--<span class="vi-text is-color&#45;&#45;danger">-->
            <!--,交易数量不小于100-->
            <!--{{ params.payMode === "支付宝" ? "50100" : "10000" }}-->
            <!--</span>-->
          </template>
        </div>
        <div class="vi-text is-align--right">
          <div
            class="vi-btn  is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('number', 50000)"
          >
            <span>5W</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('number', 100000)"
          >
            <span>10W</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('number', 200000)"
          >
            <span>20W</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('number', 500000)"
          >
            <span>50W</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--warning is-btn--smaller"
            @click="
              setNumber(
                'number',
                params.advertiseType === 1
                  ? parseInt(base.leftSellLimit / 2).toFixed(0)
                  : parseInt(base.leftBuyLimit / 2).toFixed(0)
              )
            "
          >
            <span>一半</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--danger is-btn--smaller"
            @click="
              setNumber(
                'number',
                params.advertiseType === 1
                  ? parseInt(base.leftSellLimit).toFixed(0)
                  : parseInt(base.leftBuyLimit).toFixed(0)
              )
            "
          >
            <span>全部</span>
          </div>
        </div>
      </div>

      <div
        class="vi-flex vi-border is-border--bottom is-border--thiner vi-padding-ad"
        style="line-height: 44px"
      >
        <div
          style="width: 100px"
          class="vi-padding-right vi-text is-align--right "
        >
          <span>最大交易金额</span>
        </div>
        <input
          type="number"
          class="vi-flex-item is-flex--1 vi-input is-input--larger"
          placeholder="请输入最大交易金额"
          v-model="params.maxLimit"
        />
        <div
          class="vi-padding-ad"
          v-if="params.maxLimit"
          @click="params.maxLimit = ''"
        >
          <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
        </div>
      </div>

      <div class="vi-border is-border--bottom is-border--thiner vi-padding">
        <div class="vi-text is-align--right">
          <div
            class="vi-btn  is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('maxLimit', 500)"
          >
            <span>500</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('maxLimit', 1000)"
          >
            <span>1000</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('maxLimit', 2000)"
          >
            <span>2000</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--primary is-btn--smaller"
            @click="setNumber('maxLimit', 5000)"
          >
            <span>5000</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--warning is-btn--smaller"
            @click="
              setNumber(
                'maxLimit',
                params.advertiseType === 1
                  ? parseInt(base.leftSellLimit / 2 / 100).toFixed(0)
                  : parseInt(base.leftBuyLimit / 2 / 100).toFixed(0)
              )
            "
          >
            <span>一半</span>
          </div>
          <div
            class="vi-btn is-btn--pack is-btn--radius is-btn--danger is-btn--smaller"
            @click="
              setNumber(
                'maxLimit',
                params.advertiseType === 1
                  ? parseInt(base.leftSellLimit / 100).toFixed(0)
                  : parseInt(base.leftBuyLimit / 100).toFixed(0)
              )
            "
          >
            <span>全部</span>
          </div>
        </div>
      </div>

      <div
        class="vi-flex vi-border is-border--bottom is-border--thiner vi-padding-ad"
        style="line-height: 44px"
      >
        <div
          style="width: 100px"
          class="vi-padding-right vi-text is-align--right vi-tag is-tag--require "
        >
          <span>资金密码</span>
        </div>
        <input
          type="password"
          class="vi-flex-item is-flex--1 vi-input is-input--larger"
          placeholder="请输入您的资金密码"
          v-model="params.password"
        />
        <div
          class="vi-padding-ad"
          v-if="params.password"
          @click="params.password = ''"
        >
          <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
        </div>
      </div>
    </div>
  </div>
</template>
