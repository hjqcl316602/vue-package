<script>
import {
  getOrderDetail,
  closeAppealOrder,
  setOrderPay,
  release
} from "@/request/order";
import { getAdvertiseInit } from "@/request/advert";
import { transferToOrder } from "@/request";
import { mapState, mapMutations } from "vuex";
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
      confirm: {
        transfer: {
          show: false,
          password: "",
          number: "",
          unit: ""
        },
        pay: {
          show: false
        },
        release: {
          show: false,
          password: ""
        },
        appeal: {
          show: false
        }
      },
      base: {
        balance: 0,
        leftBuyLimit: 0,
        leftSellLimit: 0,
        limit: 0
      }
    };
  },
  props: {},
  computed: {
    ...mapState({
      pageMessage: state => state.page.message
    })
  },
  methods: {
    ...mapMutations({
      setPageMessage: "set/page/message"
    }),
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
    setNavigationTaps() {
      let { title } = this.pageMessage;
      let { status, type } = this.message;

      let next = [];
      if (status === 2 && type === 1) {
        next.push("确认放行");
      }
      if (status === 1 && type === 0) {
        next.push("确认付款");
      }
      if (this.params.type === "appeal") {
        next.push("关闭");
        next.push("客服");
      }

      let prev = [];

      if (this.message.status !== 3 && this.message.transferNumber == null) {
        prev.push("转账");
      }
      this.setPageMessage({ prev, title, next });
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
          this.setNavigationTaps();
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
    },
    onSuccess() {
      this.$message.success("复制成功");
    },
    onError() {
      this.$message.danger("复制失败");
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
    onNavigationBarTap({ index, text, type }) {
      console.log(index, text);
      if (type === "prev") {
        if (text === "转账") {
          this.getAdvertiseInit();
          this.confirm.transfer.number = this.message.amount;
          this.confirm.transfer.show = true;
          this.confirm.transfer.unit = this.message.unit;
        }
      } else {
        if (text === "确认放行") {
          this.confirm.release.show = true;
        } else if (text === "确认付款") {
          this.confirm.pay.show = true;
        } else if (text === "关闭") {
          this.confirm.appeal.show = true;
        } else if (text === "客服") {
          let { orderSn, orderId } = this.message;
          let { kfName, kfId } = this.$route.query;
          this.$router.push(
            "/customer-appeal?orderId=" +
              orderId +
              "&orderSn=" +
              orderSn +
              "&kfName=" +
              kfName +
              "&kfId=" +
              kfId
          );
        }
      }
    },
    confirmOk(type) {
      if (type === "transfer") {
        let { number, password } = this.confirm.transfer;
        if (!number) return this.$message.danger("请输入转账的数量");
        if (!password) return this.$message.danger("请输入您的资金密码");
        transferToOrder({
          number,
          orderSn: this.params.orderSn,
          jyPassword: password
        }).then(({ data }) => {
          if (data.code === 0) {
            this.confirm.transfer.number = "";
            this.confirm.transfer.password = "";
            this.confirm.transfer.show = false;
            this.init();
            this.$message.success(data.message);
          } else this.$message.danger(data.message);
        });
      } else if (type === "release") {
        let { password } = this.confirm.release;
        if (!password) return this.$message.danger("请输入您的资金密码");
        release({
          orderSn: this.params.orderSn,
          jyPassword: password
        }).then(({ data }) => {
          if (data.code === 0) {
            this.confirm.release.password = "";
            this.confirm.release.show = false;
            this.$message.success(data.message);
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else this.$message.danger(data.message);
        });
      } else if (type === "pay") {
        setOrderPay({
          orderSn: this.params.orderSn
        }).then(({ data }) => {
          if (data.code === 0) {
            this.init();
            this.confirm.release.show = false;
            this.$message.success(data.message);
          } else {
            this.$message.danger(data.message);
          }
        });
      } else if (type === "appeal") {
        closeAppealOrder({
          orderId: this.message.orderId
        }).then(({ data }) => {
          if (data.code === 0) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
            this.confirm.appeal.show = false;
            this.$message.success(data.message);
          } else {
            this.$message.danger(data.message);
          }
        });
      }
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
  <div class="">
    <template>
      <vui-confirm v-model="confirm.release.show" title="确认放行">
        <div>
          <div class="vi-text is-align--center" style="line-height: 44px">
            <span class="vi-text is-color--danger"
              >请谨慎放行，错放不可追回</span
            >
          </div>
          <div class="vi-flex vi-padding-ad " style="line-height: 44px">
            <div
              style="width: 80px"
              class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
            >
              <span>资金密码</span>
            </div>
            <input
              type="password"
              class="vi-flex-item is-flex--1 vi-input is-input--larger "
              placeholder="请输入您的资金密码"
              v-model="confirm.release.password"
            />
            <div
              class="vi-padding-ad"
              v-if="confirm.release.password"
              @click="confirm.release.password = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="confirmOk('release')"
          >
            确认放行
          </div>
        </div>
      </vui-confirm>
      <vui-confirm v-model="confirm.transfer.show" title="转账">
        <div>
          <div
            class="vi-flex vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 44px"
          >
            <div
              style="width: 80px"
              class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
            >
              <span>数量</span>
            </div>
            <input
              type="number"
              class="vi-flex-item is-flex--1 vi-input is-input--larger"
              placeholder="请输入转账数量"
              v-model="confirm.transfer.number"
            />
            <div
              class="vi-padding-ad"
              v-if="confirm.transfer.number"
              @click="confirm.transfer.number = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
            <span class="vi-margin-left">
              {{ confirm.transfer.unit }}
            </span>
          </div>
          <div
            style="line-height: 36px"
            class="vi-text is-align--right vi-padding-ad"
          >
            <span> 提示：可用{{ confirm.transfer.unit }}数量 </span>
            <span class="vi-text is-color--warning">
              {{ base.leftSellLimit | toShousand }}
            </span>
          </div>
          <div class="vi-flex vi-padding-ad " style="line-height: 44px">
            <div
              style="width: 80px"
              class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
            >
              <span>资金密码</span>
            </div>
            <input
              type="password"
              class="vi-flex-item is-flex--1 vi-input is-input--larger "
              placeholder="请输入您的资金密码"
              v-model="confirm.transfer.password"
            />
            <div
              class="vi-padding-ad"
              v-if="confirm.transfer.password"
              @click="confirm.transfer.password = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="confirmOk('transfer')"
          >
            确认转账
          </div>
        </div>
      </vui-confirm>
      <vui-confirm v-model="confirm.pay.show" title="确认付款">
        <div
          class="vi-padding vi-text is-align--center"
          style="line-height: 40px"
        >
          <span>
            您是否确认已完成付款？
          </span>
        </div>
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="confirmOk('pay')"
          >
            确认付款
          </div>
        </div>
      </vui-confirm>
      <vui-confirm v-model="confirm.appeal.show" title="关闭申诉">
        <div
          class="vi-padding vi-text is-align--center"
          style="line-height: 40px"
        >
          <span>
            您是否确认已处理完成？
          </span>
        </div>
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="confirmOk('appeal')"
          >
            关闭申诉
          </div>
        </div>
      </vui-confirm>
    </template>
    <div class="vi-background vi-margin-bottom" v-if="params.loaded">
      <div>
        <div class="vi-text is-align--center" style="line-height: 80px;">
          <span class="vi-text is-color--primary" style="font-size: 24px">
            {{ message.money | toShousand }}
          </span>
          <span>CNY</span>
          <span style="font-size: 24px">/</span>
          <span class="vi-text is-color--warning" style="font-size: 24px">
            {{ message.amount || 0 | toShousand }}
          </span>
          <span>{{ message.unit }} </span>
        </div>

        <div
          class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">状态</span>
          <span
            class="vi-text "
            :class="$getOrderStatusTypes(message.status).className"
          >
            {{ $getOrderStatusTypes(message.status).text }}
          </span>
        </div>

        <template>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">交易信息</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">交易币种</span>
            <span>
              {{ message.unit }}
            </span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">交易价格</span>
            <span class="vi-text  "> {{ message.price || 0 }} CNY </span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">交易对象</span>
            <span class="">{{ message.otherSide }}</span>
          </div>

          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
            v-if="message.commission"
          >
            <span class="vi-text is-color--light">手续费</span>
            <span class="">{{ message.commission || 0 }} </span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
            v-if="message.payRemark"
          >
            <span class="vi-text is-color--light">备注</span>
            <span class="">{{ message.payRemark }} </span>
          </div>
        </template>
        <template>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">时间</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">创建时间</span>
            <span class="">{{ message.createTime }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">付款时间</span>
            <span class="">{{ message.payTime }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
            v-if="reserveTime && (message.status === 1 || message.status === 2)"
          >
            <span class="vi-text is-color--light">取消倒计时</span>
            <span class="">{{ reserveTime }}</span>
          </div>
        </template>

        <template>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">收付款方式</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding vi-border is-border--bottom is-border--thiner"
            style="text-indent: 36px"
          >
            <span class="vi-text is-color--light">类型</span>
            <span
              class="vi-icon"
              :style="{ color: $getAdvertTypes(message.payMode, 'text').color }"
              style="font-size: 24px"
              v-html="$getAdvertTypes(message.payMode, 'text').icon"
            ></span>
          </div>
          <template v-if="message.payMode === '银联'">
            <div
              class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;"
            >
              <div style="text-indent: 36px">
                <span class="vi-text is-color--light">卡号</span>
              </div>
              <div class="vi-flex is-align-items--center">
                <span class="vi-margin-right">
                  {{ payInfo.bankInfo.cardNo }}
                </span>
                <div
                  class=" vi-btn is-btn--hollow is-btn--thiner is-btn--radius is-btn--primary is-btn--smaller"
                  v-clipboard:copy="payInfo.bankInfo.cardNo"
                  　　v-clipboard:success="()=>onSuccess('returnUrl')"
                  　　v-clipboard:error="onError"
                >
                  复制
                </div>
              </div>
            </div>
            <div
              class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;"
            >
              <div style="text-indent: 36px">
                <span class="vi-text is-color--light">真实姓名</span>
              </div>
              <div class="vi-flex is-align-items--center">
                <span class="vi-margin-right">
                  {{ payInfo.bankInfo.bankRealName }}
                </span>
                <div
                  class=" vi-btn is-btn--hollow is-btn--thiner is-btn--radius is-btn--primary is-btn--smaller"
                  v-clipboard:copy="payInfo.bankInfo.bankRealName"
                  　　v-clipboard:success="()=>onSuccess('returnUrl')"
                  　　v-clipboard:error="onError"
                >
                  复制
                </div>
              </div>
            </div>
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">开户行</span>
              <span>{{ payInfo.bankInfo.bank }}</span>
            </div>
          </template>
          <template v-if="message.payMode === '微信'">
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">账号</span>
              <span>{{ payInfo.wechatPay.wechat }}</span>
            </div>
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">收款码</span>
              <div class="vi-padding-ud">
                <img
                  :src="payInfo.wechatPay.qrWeCodeUrl"
                  style="max-width: 100px;max-height: 150px"
                  alt=""
                />
              </div>
            </div>
          </template>
          <template v-if="message.payMode === '支付宝'">
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">账号</span>
              <span>{{ payInfo.alipay.alipay }}</span>
            </div>
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">实名</span>
              <span>{{ payInfo.alipay.alipayRealName }}</span>
            </div>
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">收款码</span>
              <div class="vi-padding-ud">
                <img
                  :src="payInfo.alipay.alipayCodeUrl"
                  style="max-width: 100px;max-height: 150px"
                  alt=""
                />
              </div>
            </div>
          </template>
          <template v-if="message.payMode === '云闪付'">
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">账号</span>
              <span>{{ payInfo.unionpay.unionpay }}</span>
            </div>
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">收款码</span>
              <div class="vi-padding-ud">
                <img
                  :src="payInfo.unionpay.unionpayCodeUrl"
                  style="max-width: 100px;max-height: 150px"
                  alt=""
                />
              </div>
            </div>
          </template>

          <template v-if="message.payMode === '聚合码'">
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">账号</span>
              <span>{{ payInfo.aggregate.aggregate }}</span>
            </div>
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">支付方式</span>
              <span>{{ payInfo.aggregate.aggregateMode }}</span>
            </div>
            <div
              class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px;text-indent: 36px"
            >
              <span class="vi-text is-color--light">收款码</span>
              <div class="vi-padding-ud">
                <img
                  :src="payInfo.aggregate.aggregateCodeUrl"
                  style="max-width: 100px;max-height: 150px"
                  alt=""
                />
              </div>
            </div>
          </template>

          <template v-if="message.payMode === '动态码'"> </template>
        </template>

        <template>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">编号</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;"
          >
            <div style="text-indent: 36px">
              <span class="vi-text is-color--light">订单号</span>
            </div>
            <div class="vi-flex is-align-items--center">
              <span class="vi-margin-right">{{ message.orderSn }}</span>
              <div
                class=" vi-btn is-btn--hollow is-btn--thiner is-btn--radius is-btn--primary is-btn--smaller"
                v-clipboard:copy="params.orderSn"
                　　v-clipboard:success="()=>onSuccess('returnUrl')"
                　　v-clipboard:error="onError"
              >
                复制
              </div>
            </div>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">渠道编号</span>
            <span class="">{{ message.channelOrderId || "--" }}</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">聚道用户编号</span>
            <span class="">{{ message.subMemId || "--" }}</span>
          </div>
        </template>

        <template v-if="message.transferNumber">
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">转账信息</span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">数量</span>
            <span class=""
              >{{ message.transferNumber | toShousand }}
              {{ message.unit }}</span
            >
          </div>
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px;text-indent: 36px"
          >
            <span class="vi-text is-color--light">时间</span>
            <span class="">{{ message.transferTime }} </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
