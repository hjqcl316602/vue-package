<script>
import formater from "../../../package/es/dater/formater";
import { loginOut } from "../request/login";
import { getWithdraw } from "../request";
import { mapState, mapMutations } from "vuex";
import {
  iconHeadNormal,
  scenic1,
  scenic2,
  scenic3,
  scenic4,
  scenic5,
  scenic6,
  scenic7,
  scenic8,
  scenic9,
  scenic10
} from "../image";
import { getTraddingOrder } from "../request/order";
let headImages = [
  scenic1,
  scenic2,
  scenic3,
  scenic4,
  scenic5,
  scenic6,
  scenic7,
  scenic8,
  scenic9,
  scenic10
];
export default {
  name: "vv-user",
  data() {
    return {
      icon: {
        headEmpty: headImages[Math.round(Math.random() * 9)]
      },
      withdraw: {
        today: 0,
        total: 0
      }
    };
  },
  props: {},
  computed: mapState({
    member: state => state.member || {},
    orderTradding: state => state.order.tradding,
    money: state => state.money
  }),
  methods: {
    ...mapMutations({
      setMoneyTotalShow: "set/money/total/show"
    }),
    init() {
      this.getTraddingOrder();
      this.getWithdraw();
      this.getWithdraw("today");
    },
    check(type) {
      let object = {};
      if (type === "today") {
        object.startTime = formater(new Date(), "yyyy-MM-dd");
        object.endTime = formater(
          new Date(+new Date() + 24 * 60 * 60 * 1000),
          "yyyy-MM-dd"
        );
      }
      this.$router.push({
        path: "/record",
        query: object
      });
    },
    getWithdraw(type = "total") {
      let object = {};
      if (type === "today") {
        object.startTime = formater(new Date(), "yyyy-MM-dd");
        object.endTime = formater(
          new Date(+new Date() + 24 * 60 * 60 * 1000),
          "yyyy-MM-dd"
        );
      }
      getWithdraw(object).then(res => {
        let data = res ? res.data : {};
        if (data.code === 0) {
          let message = data.data;
          this.withdraw[type] = Number(message.amount || 0).toFixed(2);
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    getTraddingOrder() {
      getTraddingOrder().then(res => {
        let data = res ? res.data : {};
        if (data.code === 0) {
          let message = data.data;
          this.$store.commit("set/order/traddding", message);
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    changeMoneyShow() {
      this.setMoneyTotalShow(this.money.total.show === "no" ? "yes" : "no");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-user">
    <div>
      <div class="" style="margin-bottom: 1px">
        <div
          class="vv-panel vi-padding--large vi-padding-bottom--larger vi-padding-top--larger "
        >
          <div
            class="vi-flex vi-justify-content--space-between vi-align-items--center "
            @click="$router.push('/set')"
          >
            <div class="vi-flex  vi-align-items--center">
              <div class="vv-head  ">
                <vui-image
                  width="100%"
                  height="100%"
                  fill-type="min"
                  :src="member.avatar"
                >
                  <div slot="error" class="vi-cover">
                    <img :src="icon.headEmpty" alt="" class="vi-cover" />
                  </div>
                </vui-image>
              </div>
              <div class="vi-margin-left">
                <div style="line-height: 24px">
                  <span
                    class="vi-font-weight--bold vi-color--primary vi-font-size--large"
                  >
                    {{ member.username }}
                  </span>
                </div>
                <div style="line-height: 24px">
                  <span class="vi-color--light">
                    {{ member.realName }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <i class="iconfont icon-jiantou vi-color--light"></i>
            </div>
          </div>
        </div>
      </div>
      <div style="overflow: hidden;margin-bottom: 1px">
        <vui-grid gutter="1">
          <vui-grid-child span="12">
            <div
              style="height: 100%"
              class=" vv-panel  vi-padding--large  vi-padding-bottom--larger vi-padding-top--larger "
            >
              <div class="vi-text-align--center">
                <div style="line-height: 28px">
                  <span class="vi-color--light vi-margin-right--small">
                    全部收款
                  </span>
                  <i
                    class="iconfont  vi-color--light"
                    :class="{
                      'icon-tubiao-': money.total.show === 'yes',
                      'icon-yincang': money.total.show !== 'yes'
                    }"
                    @click="changeMoneyShow"
                  ></i>
                </div>
                <div style="line-height: 28px">
                  <template v-if="money.total.show === 'yes'">
                    <span class="">￥ </span>
                    <span class="vi-font-weight--bold " style="font-size: 24px">
                      {{ withdraw.total || 0 }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="vi-font-weight--bold" style="font-size: 24px">
                      ****
                    </span>
                  </template>
                </div>
                <div>
                  <div
                    class="vi-btn is-btn--smaller vi-color--gray"
                    @click="check('total')"
                  >
                    查看明细
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>
          <vui-grid-child span="12" class="">
            <div
              style="height: 100%"
              class="vv-panel vi-padding--large vi-padding-bottom--larger vi-padding-top--larger"
            >
              <div class="vi-text-align--center">
                <div style="line-height: 28px">
                  <span class="vi-color--light">今日收款</span>
                </div>
                <div style="line-height: 28px">
                  <span class="">￥ </span>
                  <span class="vi-font-weight--bold " style="font-size: 24px">
                    {{ withdraw.today || 0 }}
                  </span>
                </div>
                <div>
                  <div
                    class="vi-btn is-btn--smaller vi-color--gray"
                    @click="check('today')"
                  >
                    查看明细
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>
        </vui-grid>
      </div>
      <div class=" " style="overflow: hidden;margin-bottom: 1px">
        <vui-grid gutter="1">
          <vui-grid-child span="12">
            <div @click="$router.push('/order-list')">
              <div class="vi-padding--large  vv-panel">
                <div class="vi-text-align--center">
                  <div style="line-height: 28px">
                    <i
                      class="iconfont icon-dingdan3  vi-color--primary"
                      style="font-size: 24px"
                    ></i>
                  </div>
                  <div style="line-height: 28px">
                    <span class="vi-color--light ">
                      全部订单
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>
          <vui-grid-child span="12">
            <div @click="$router.push('/order')">
              <div
                class="vi-padding--large vv-panel vv-track "
                :class="{
                  'is-track--active':
                    Number(orderTradding.sell) +
                      Number(orderTradding.buy) +
                      Number(orderTradding.appeal) >
                    0
                }"
              >
                <div class="vi-text-align--center">
                  <div style="line-height: 28px">
                    <i
                      class="iconfont icon-jinhangzhong  vi-color--primary"
                      style="font-size: 24px"
                    ></i>
                  </div>
                  <div style="line-height: 28px">
                    <span class="vi-color--light">
                      未完成订单
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>

          <template v-if="false">
            <vui-grid-child span="6">
              <div @click="$router.push('/order/recharge')">
                <div
                  class="vi-padding--large  vv-panel vv-track"
                  :class="{ 'is-track--active': orderTradding.buy > 0 }"
                >
                  <div class="vi-text-align--center">
                    <div style="line-height: 28px">
                      <i
                        class="iconfont icon-ruku  vi-color--primary"
                        style="font-size: 24px"
                      ></i>
                    </div>
                    <div style="line-height: 28px">
                      <span class="vi-color--light ">
                        买入订单
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </vui-grid-child>
            <vui-grid-child span="6">
              <div @click="$router.push('/order/custom')">
                <div
                  class="vi-padding--large  vv-panel vv-track"
                  :class="{ 'is-track--active': orderTradding.appeal > 0 }"
                >
                  <div class="vi-text-align--center">
                    <div style="line-height: 28px">
                      <i
                        class="iconfont icon-jingyingyichang  vi-color--primary"
                        style="font-size: 24px"
                      ></i>
                    </div>
                    <div style="line-height: 28px">
                      <span class="vi-color--light ">
                        申诉订单
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </vui-grid-child>
          </template>
        </vui-grid>
      </div>
      <div class=" " style="overflow: hidden;margin-bottom: 1px">
        <vui-grid gutter="1">
          <vui-grid-child span="6">
            <div @click="$router.push('/advert')">
              <div class="vi-padding--large vv-panel ">
                <div class="vi-text-align--center">
                  <div style="line-height: 28px">
                    <i
                      class="iconfont icon-guanggao  vi-color--primary"
                      style="font-size: 24px"
                    ></i>
                  </div>
                  <div style="line-height: 28px">
                    <span class="vi-color--light">
                      广告
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>
          <vui-grid-child span="6">
            <div @click="$router.push('/account')">
              <div class="vi-padding--large  vv-panel ">
                <div class="vi-text-align--center">
                  <div style="line-height: 28px">
                    <i
                      class="iconfont icon-zhanghaoguanli  vi-color--primary"
                      style="font-size: 24px"
                    ></i>
                  </div>
                  <div style="line-height: 28px">
                    <span class="vi-color--light ">
                      账号
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>
          <vui-grid-child span="6">
            <div @click="$router.push('/money')">
              <div class="vi-padding--large  vv-panel">
                <div class="vi-text-align--center">
                  <div style="line-height: 28px">
                    <i
                      class="iconfont icon-qianbao  vi-color--primary"
                      style="font-size: 24px"
                    ></i>
                  </div>
                  <div style="line-height: 28px">
                    <span class="vi-color--light ">
                      钱包
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>
          <vui-grid-child span="6">
            <div @click="$router.push('/team')">
              <div class="vi-padding--large  vv-panel">
                <div class="vi-text-align--center">
                  <div style="line-height: 28px">
                    <i
                      class="iconfont icon-tuandui  vi-color--primary"
                      style="font-size: 24px"
                    ></i>
                  </div>
                  <div style="line-height: 28px">
                    <span class="vi-color--light ">
                      推广
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </vui-grid-child>
        </vui-grid>
      </div>
    </div>
    <div class="vv-footer vi-border is-border--top is-border--thiner">
      <div class="vv-tabbar is-tabbar--white">
        <div class="vv-tabbar-child " @click="$router.replace('/buy')">
          <i class="iconfont icon-mairu vv-tabbar-icon"></i>
          <span class="vv-tabbar-text">买入</span>
        </div>
        <div class="vv-tabbar-child " @click="$router.replace('/sell')">
          <i class="iconfont icon-maichu vv-tabbar-icon"></i>
          <span class="vv-tabbar-text">卖出</span>
        </div>
        <div class="vv-tabbar-child is-tabbar--active">
          <i class="iconfont icon-wode1 vv-tabbar-icon"></i>
          <span class="vv-tabbar-text">我的</span>
        </div>
      </div>
    </div>
  </div>
</template>
