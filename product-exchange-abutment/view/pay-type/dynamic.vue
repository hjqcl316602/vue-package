<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 10:02:13
 * @LastEditTime: 2019-08-27 09:37:19
 * @LastEditors: Please set LastEditors
 -->
<script>
import Vue from "vue";
import payQr from "../components/qr";
import { getDynamicUrl } from "@/request";
export default {
  name: "PagePayDynamic",
  components: { payQr },
  data() {
    return {
      loaded: false,
      result: {
        code: "",
        data: {},
        msg: ""
      },
      backTime: null
    };
  },
  mounted() {
    this.getDynamicUrl();
  },
  methods: {
    getDynamicUrl() {
      this.loaded = false;
      getDynamicUrl({ accessToken: this.message.accessToken }).then(
        ({ code, data, msg }) => {
          this.loaded = true;
          this.result.code = code;
          this.result.data = data;
          this.result.msg = msg;
          let { leftTime } = this.result.data;
          if (leftTime) {
            this.backTime = leftTime * 1000 || 0;
            this.setTimer();
          }
        }
      );
    },
    /**
     * 设置定时器
     * type 是指定时器的类型 [payStatus,payTime]
     */
    setTimer(type) {
      this.clearTimer();
      this._timerBackTime = null;
      this._timerBackTime = setInterval(() => {
        this.backTime = this.backTime - 1000;
        if (this._timerBackTime === 0) {
          this.clearTimer();
        }
      }, 1000);
    },
    /**
     * 清除定时器
     */
    clearTimer() {
      clearInterval(this._timerBackTime);
      this._timerBackTime = null;
    },
    reload() {
      window.location.reload();
    }
  },
  beforeDestroy() {
    this.clearTimer();
  },
  props: {
    message: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<template>
  <div class="">
    <div class="">
      <div class="vi-margin-bottom">
        <div class="vi-text is-align--center">
          <span style="font-size: 24px">￥</span>
          <span style="font-size: 30px">{{ message.fee / 100 || 0 }}</span>
        </div>
        <div class="vi-text is-align--center">
          <span class="vi-text is-color--gray">{{ message.sn }}</span>
        </div>
      </div>

      <div class="vi-margin-top">
        <div class="vi-flex is-justify-content--center is-align-items--center">
          <div class="vi-margin-right  ">
            <img src="../../image/icon-card.png" alt="" style="height:40px" />
          </div>

          <div class="vi-margin-right ">
            <img src="../../image/icon-union.png" alt="" style="height:32px" />
          </div>
          <div class="vi-margin-right ">
            <span class=" vi-icon vi-text is-color--wx" style="font-size: 40px">
              &#xe7ba;
            </span>
          </div>
          <div class="">
            <span
              class=" vi-icon vi-text is-color--ali"
              style="font-size: 40px"
            >
              &#xe608;
            </span>
          </div>
        </div>
      </div>

      <div class="vi-margin-top">
        <div class="vi-text is-align--center" style="line-height: 24px">
          <span class="vi-text is-color--danger is-weight--bold">
            支持银联、云闪付、微信和支付宝扫码支付
          </span>
        </div>
      </div>

      <div class="vi-margin-top">
        <div class="vi-text is-align--center" style="line-height: 24px">
          <span class="vi-text is-color--danger">
            二维码只能扫码一次<br />
            推荐银行app扫码支付<br />
            支付失败，请重新获取二维码后重试
          </span>
        </div>
      </div>
    </div>

    <template v-if="loaded">
      <template v-if="result.code === '000'">
        <div class="vi-margin-top">
          <div class="vi-flex is-justify-content--center">
            <pay-qr :value="result.data.dynamicUrl"></pay-qr>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          style=" height: 300px;"
          class="vi-flex is-justify-content--center is-align-items--center is-flex-direction--column"
        >
          <span
            class="vi-icon vi-text is-color--danger "
            style="font-size: 24px"
            >&#xe61e;</span
          >
          <span style="line-height: 32px" class="vi-text is-color--danger  ">
            {{ result.msg }}
          </span>
        </div>
      </template>
    </template>
    <template v-else>
      <div
        style=" height: 300px;"
        class="vi-flex is-justify-content--center is-align-items--center is-flex-direction--column"
      >
        <vui-loading-wave align="center" color="#666"></vui-loading-wave>
        <span style="line-height: 32px" class="vi-text is-color--light ">
          请稍等，二维码正在生成中...
        </span>
      </div>
    </template>

    <div
      class="vi-margin-top vi-text is-align--center"
      v-if="loaded && result.code === '000'"
    >
      <span class="vi-text is-weight--bold is-size--medium is-color--danger">
        有效时间：{{ backTime | toTime }}
      </span>
    </div>

    <div class=" vi-margin-top">
      <div class="vi-flex is-flex-wrap--nowrap">
        <div
          class="vi-text is-align--center vi-flex is-flex-direction--column "
        >
          <span class="vi-text is-size--smaller">
            将二维码截屏并保存至本地相册
          </span>
        </div>
        <div class="vi-padding">
          <i class="vi-icon vi-text is-color--primary">&#xe680;</i>
        </div>
        <div class="vi-text is-align--center vi-flex is-flex-direction--column">
          <span class="vi-text is-size--smaller">
            打开银联、云闪付、微信或支付宝扫一扫
          </span>
        </div>
        <div class="vi-padding ">
          <i class="vi-icon vi-text is-color--primary">&#xe680;</i>
        </div>
        <div
          class="vi-text is-align--center vi-flex is-flex-direction--column "
        >
          <span class="vi-text is-size--smaller">从本地相册选取截屏二维码</span>
        </div>
      </div>
    </div>
    <div class="vi-margin-top" v-if="loaded && result.code === '000'">
      <div
        class="vi-btn is-btn--pack is-btn--primary is-btn--long"
        @click="reload"
      >
        重新获取二维码
      </div>
    </div>

    <div class="vi-margin-top" v-if="false">
      <div class="vi-text is-align--center " style="line-height: 24px">
        <span class="vi-text is-color--danger">
          付款15分钟未到账请联系客服
        </span>
      </div>
      <div class="vi-text is-align--center " style="line-height: 24px">
        <span class="vi-text is-color--danger">
          每笔订单是唯一的，请勿重复支付
        </span>
      </div>
      <div class="vi-text is-align--center " style="line-height: 24px">
        <span class="vi-text is-color--danger">
          请在有效时间内支付，超时请勿支付
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
