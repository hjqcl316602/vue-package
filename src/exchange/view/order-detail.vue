<script>
import {
  getOrderDetail,
  closeAppealOrder,
  setOrderPay
} from "../request/order";

const statusSoure = [
  { status: 0, text: "已取消", className: "vi-color--light" },
  { status: 1, text: "等待付款", className: "vi-color--warning" },
  { status: 2, text: "等待放行", className: "vi-color--warning" },
  { status: 3, text: "已完成", className: "vi-color--danger" },
  { status: 4, text: "申诉中", className: "vi-color--danger" }
];
export default {
  name: "",
  data() {
    return {
      params: {
        orderSn: "",
        type: "",
        loaded: false
      },
      message: {},
      payInfo: {
        type: "",
        wechatPay: {},
        unionpay: {},
        bankInfo: {},
        alipay: {},
        aggregate: {}
      },
      reserveTime: "",
      pay: {
        show: false
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.params = Object.assign(this.params, this.$route.query);
      this.setTimer();
    },
    setTimer() {
      this.clearTimer();
      this.getOrderDetail();
      this._timer = setInterval(() => {
        if (this.message.status === 3 || this.message.status === 0) {
          this.clearTimer();
        } else {
          this.getOrderDetail();
        }
      }, 10 * 1000);
    },
    clearTimer() {
      clearInterval(this._timer);
      this._timer = null;
    },
    getOrderDetail() {
      getOrderDetail({
        orderSn: this.params.orderSn
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.message = data.data;
          this.params.loaded = true;
          this.payInfo.type = this.message.payMode;
          this.payInfo = Object.assign(this.payInfo, this.message.payInfo);
          if (this.message.status === 1 || this.message.status === 2) {
            this.setBackTimer();
          } else {
            this.clearBackTimer();
          }
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    closeAppealOrder() {
      closeAppealOrder({
        orderId: this.message.orderId
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

    setOrderPay() {
      setOrderPay({
        orderSn: this.message.orderSn
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.init();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    getType(type) {
      return (
        types.find(ele => {
          return ele["text"] === type;
        }) || {}
      );
    },
    getStatus(type) {
      return (
        statusSoure.find(ele => {
          return ele.status === type;
        }) || {}
      );
    },
    handler(type, target) {
      if (type === "confirm") {
        if (target === "pay") {
          this.pay.show = true;
        } else {
          this.$router.push({
            path: "/confirm",
            query: {
              id: this.message.orderSn,
              handler: type,
              target: "order",
              type: this.$getAdvertTypes(this.message.payMode, "text").value,
              money: this.message.money
            }
          });
        }
      } else if (type === "transfer") {
        this.$router.push({
          path: "/transfer",
          query: {
            type: "order",
            orderSn: this.message.orderSn,
            money: this.message.money
          }
        });
      } else if (type === "close-custom") {
        this.closeAppealOrder();
      }
    },
    /**
     * 设置倒计时定时器
     */

    setBackTimer() {
      this.clearBackTimer();
      let createTime = +new Date(this.message["createTime"]);
      let currentTime = +new Date(this.message["currentTime"]);
      let timeLimit = Number(this.message["timeLimit"]) * 60 * 1000;

      this.reserveTime = this.getBackTime(createTime, currentTime, timeLimit);
      this._backTimer = setInterval(() => {
        currentTime += 1000;
        this.reserveTime = this.getBackTime(createTime, currentTime, timeLimit);
      }, 1000);
    },
    /**
     * 清除定时器
     */
    clearBackTimer() {
      clearInterval(this._backTimer);
      this._backTimer = null;
    },
    /**
     * 获取倒计时
     */
    getBackTime(createTimes, currentTimes, timeLimits) {
      let backTimes = timeLimits - (currentTimes - createTimes);
      if (backTimes <= 0) {
        return "";
      }
      function getTime(times) {
        let hour = 1000 * 60 * 60;

        let minute = 1000 * 60;

        let second = 1000;

        let hours = Math.floor(times / hour);

        let minutes = Math.floor((times - hours * hour) / minute);

        let seconds = Math.floor(
          (times - hours * hour - minutes * minute) / second
        );

        //console.log(hours, minutes, seconds);

        if (hours > 0) {
          return `${hours}时${getZero(minutes)}分${getZero(seconds)}秒`;
        }

        if (minutes > 0) {
          return `${getZero(minutes)}分${getZero(seconds)}秒`;
        }

        if (seconds > 0) {
          return `${getZero(seconds)}秒`;
        }

        return 0;
      }

      function getZero(time) {
        return Number(time) > 9 ? time : "0" + time;
      }

      return getTime(backTimes);
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.clearBackTimer();
    this.clearTimer();
  }
};
</script>

<template>
  <div class="vv-panel" style="min-height: 100vh;padding-bottom: 50px">
    <vui-confirm v-model="pay.show" title="确认信息" @ok="setOrderPay">
      <div class="vi-padding vi-text-align--center">
        <span>您是否确认已完成付款？</span>
      </div>
    </vui-confirm>
    <div class="vi-padding--large" v-if="params.loaded">
      <div>
        <div
          class="vi-flex  vi-justify-content--space-between vi-margin-bottom"
          style="line-height: 24px"
        >
          <vui-image
            height="24px"
            width="40px"
            fill-type="height"
            align-type="left"
            :src="$getAdvertTypes(message.payMode, 'text')['icon']"
          >
          </vui-image>
          <span
            class="  vi-font-weight--bold vi-color--primary vi-font-size--large"
          >
            {{ message.money }}
          </span>
        </div>
        <div
          class="vi-flex vi-justify-content--space-between"
          style="line-height: 28px"
        >
          <div>
            <span class="vi-color--gray">状态</span>
          </div>
          <div class="" :class="getStatus(message.status).className">
            <span>{{ getStatus(message.status).text }}</span>
          </div>
        </div>
        <template>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div class="vi-color--gray">
              <span class="vi-color--gray">编号</span>
            </div>
          </div>
          <div class="vi-padding-left--larger">
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <div class="vi-color--gray">
                <span class="vi-color--gray">订单号</span>
              </div>
              <div class="">
                <span>{{ message.orderSn }}</span>
              </div>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
              v-if="message.channelOrderId"
            >
              <div>
                <span class="vi-color--gray">渠道编号</span>
              </div>
              <div class="">
                <span>{{ message.channelOrderId }}</span>
              </div>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
              v-if="message.subMemId"
            >
              <div>
                <span class="vi-color--gray">渠道用户编号</span>
              </div>
              <div class="">
                <span>{{ message.subMemId }}</span>
              </div>
            </div>
          </div>
        </template>

        <template>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div>
              <span class="vi-color--gray">交易信息</span>
            </div>
          </div>
          <div class="vi-padding-left--larger">
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <div>
                <span class="vi-color--gray">交易对象</span>
              </div>
              <div class="">
                <span>{{ message.otherSide }}</span>
              </div>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <div>
                <span class="vi-color--gray">交易价格</span>
              </div>
              <div class="">
                <span>{{ message.price }}CNY</span>
              </div>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <div>
                <span class="vi-color--gray">交易数量</span>
              </div>
              <div class="">
                <span> {{ message.amount }} {{ message.unit }} </span>
              </div>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
              v-if="message.commission"
            >
              <div class="">
                <span class="vi-color--gray">手续费</span>
              </div>
              <div class="">
                <span>{{ message.commission }}</span>
              </div>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
              v-if="message.payRemark"
            >
              <div>
                <span class="vi-color--gray">备注</span>
              </div>
              <div class="">
                <span>{{ message.payRemark }}</span>
              </div>
            </div>
          </div>
        </template>

        <template>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div>
              <span class="vi-color--gray">时间</span>
            </div>
          </div>
          <div class="vi-padding-left--larger">
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
              v-if="message.createTime"
            >
              <div>
                <span class="vi-color--gray">创建</span>
              </div>
              <div>
                <span class="">{{ message.createTime }}</span>
              </div>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
              v-if="message.payTime"
            >
              <div>
                <span class="vi-color--gray">付款</span>
              </div>
              <div>
                <span class="">{{ message.payTime }}</span>
              </div>
            </div>

            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
              v-if="reserveTime"
            >
              <div class="">
                <span class="vi-color--gray">取消倒计时</span>
              </div>
              <div class="">
                <span>{{ reserveTime }}</span>
              </div>
            </div>
          </div>
        </template>

        <template v-if="message.transferNumber">
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div>
              <span class="vi-color--gray">转账信息</span>
            </div>
          </div>
          <div class="vi-padding-left--larger">
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <div>
                <span class="vi-color--gray">金额</span>
              </div>
              <div class="">
                <span>{{ message.transferNumber }}</span>
              </div>
            </div>

            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <div>
                <span class="vi-color--gray">时间</span>
              </div>
              <div class="">
                <span>{{ message.transferTime }}</span>
              </div>
            </div>
          </div>
        </template>
        <template>
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div class="">
              <span class="vi-color--gray">收/付款</span>
            </div>
          </div>
          <div class=" vi-padding-left--larger">
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <div>
                <span class="vi-color--gray">类型 </span>
              </div>
              <div class="">
                <span>{{ payInfo.type }}</span>
              </div>
            </div>
            <template v-if="payInfo.type === '银联'">
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">卡号</span>
                </div>
                <div class="">
                  <span>{{ payInfo.bankInfo.cardNo }}</span>
                </div>
              </div>
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">姓名</span>
                </div>
                <div class="">
                  <span>{{ payInfo.bankInfo.bankRealName }}</span>
                </div>
              </div>
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">开户行</span>
                </div>
                <div class="">
                  <span>{{ payInfo.bankInfo.bank }}</span>
                </div>
              </div>
            </template>
            <template v-if="payInfo.type === '微信'">
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">账号</span>
                </div>
                <div class="">
                  <span>{{ payInfo.wechatPay.wechat }}</span>
                </div>
              </div>
              <div class="vi-margin-top">
                <img
                  :src="payInfo.wechatPay.qrWeCodeUrl"
                  alt=""
                  style="max-width: 100%;"
                />
              </div>
            </template>
            <template v-if="payInfo.type === '支付宝'">
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">账号</span>
                </div>
                <div class="">
                  <span>{{ payInfo.alipay.alipay }}</span>
                </div>
              </div>
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">真实姓名</span>
                </div>
                <div class="">
                  <span>{{ payInfo.alipay.alipayRealName }}</span>
                </div>
              </div>
              <div class="vi-margin-top">
                <img
                  :src="payInfo.alipay.alipayCodeUrl"
                  alt=""
                  style="max-width: 100%;"
                />
              </div>
            </template>
            <template v-if="payInfo.type === '云闪付'">
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">账号</span>
                </div>
                <div class="">
                  <span>{{ payInfo.unionpay.unionpay }}</span>
                </div>
              </div>
              <div class="vi-margin-top">
                <img
                  :src="payInfo.unionpay.unionpayCodeUrl"
                  alt=""
                  style="max-width: 100%;"
                />
              </div>
            </template>
            <template v-if="payInfo.type === '聚合码'">
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">账号</span>
                </div>
                <div class="">
                  <span>{{ payInfo.aggregate.aggregate }}</span>
                </div>
              </div>
              <div
                class="vi-flex vi-justify-content--space-between"
                style="line-height: 28px"
              >
                <div>
                  <span class="vi-color--gray">收付款方式</span>
                </div>
                <div class="">
                  <span>{{ payInfo.aggregate.aggregateMode }}</span>
                </div>
              </div>
              <div class="vi-margin-top">
                <img
                  :src="payInfo.aggregate.aggregateCodeUrl"
                  alt=""
                  style="max-width: 100%;"
                />
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="vi-margin-top--large vi-text-align--right" v-if="false">
        <div
          class="vi-btn is-btn--warning is-btn--radius   is-btn--hollow is-btn--thiner"
          @click="handler('close-custom')"
          v-if="params.type === 'custom'"
        >
          关闭申诉
        </div>
        <div
          class="vi-btn is-btn--primary is-btn--radius   is-btn--hollow is-btn--thiner"
          @click="handler('confirm')"
          v-if="message.status === 2 && message.type === 1"
        >
          确认放币
        </div>
        <div
          class="vi-btn is-btn--primary is-btn--radius   is-btn--hollow is-btn--thiner"
          @click="handler('confirm', 'pay')"
          v-if="message.status === 1 && message.type === 0"
        >
          确认付款
        </div>
        <div
          class="vi-btn is-btn--danger is-btn--radius   is-btn--hollow is-btn--thiner"
          @click="handler('transfer')"
          v-if="!message.transferNumber"
        >
          直接转账
        </div>
      </div>
    </div>
    <div
      class="vv-tabbar vv-footer vv-panel vi-border is-border--top is-border--thiner"
    >
      <div
        style="height: 100%;line-height: 50px"
        class="vv-tabbar-child vi-btn is-btn--warning is-btn--long is-btn--pack"
        @click="handler('close-custom')"
        v-if="params.type === 'customer'"
      >
        关闭申诉
      </div>
      <div
        style="height: 100%;line-height: 50px"
        class="vv-tabbar-child vi-btn is-btn--primary is-btn--long is-btn--pack"
        @click="handler('confirm')"
        v-if="message.status === 2 && message.type === 1"
      >
        确认放币
      </div>
      <div
        style="height: 100%;line-height: 50px"
        class="vv-tabbar-child vi-btn is-btn--primary is-btn--long is-btn--pack"
        @click="handler('confirm', 'pay')"
        v-if="message.status === 1 && message.type === 0"
      >
        确认付款
      </div>
      <div
        style="height: 100%;line-height: 50px"
        class="vv-tabbar-child vi-btn is-btn--danger is-btn--long is-btn--pack"
        @click="handler('transfer')"
        v-if="!message.transferNumber"
      >
        直接转账
      </div>
    </div>
  </div>
</template>
