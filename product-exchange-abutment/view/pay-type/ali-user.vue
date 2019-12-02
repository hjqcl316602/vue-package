<script>
import Vue from "vue";
import payQr from "../components/qr";
import { Storager, Queryer, Urler } from "@package/es";
const APPID_TO_ALIPAY = "20000067";
/**
 * 跳转到支付宝内部，指定的路径和参数的传递
 */
function getAlipayUrl(path) {
  let query = new Queryer();
  let urler = new Urler();
  let href = window.location.href;
  let index = href.indexOf("#");
  let url = urler.encodeURIComponent(href.substring(0, index + 1) + path);
  return `alipays://platformapi/startapp?appId=${APPID_TO_ALIPAY}&url=${url}`;
}
export default {
  name: "pay-ali",
  components: { payQr },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openApp() {
      let test = false;
      if (test) {
        this.$router.push(
          `/alipay/${this.message.token}/${this.message.payType}`
        );
      } else {
        window.location.href = getAlipayUrl(
          `/alipay/${this.message.token}/${this.message.payType}`
        );
      }
    }
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
      <div class="vi-flex is-justify-content--center is-align-items--center">
        <span class=" vi-icon vi-text is-color--ali" style="font-size: 40px">
          &#xe608;
        </span>
        <span class="vi-margin-left" style="font-size: 18px">
          支付宝转账
        </span>
      </div>
      <div class="vi-text is-align--center">
        <span style="font-size: 24px">￥</span>
        <span style="font-size: 30px">{{ message.fee / 100 || 0 }}</span>
      </div>
      <div class="vi-text is-align--center">
        <span class="vi-text is-color--gray">{{ message.sn }}</span>
      </div>
      <div class="vi-text is-align--center">
        <span class="vi-text is-color--danger" style="font-size: 18px">
          请勿修改转账信息，否则不到账
        </span>
      </div>
      <div class="vi-text is-align--center">
        <span class="vi-text is-weight--bold" style="font-size: 18px">
          {{ message.alipayRealName || "--" }}
        </span>
      </div>
    </div>
    <div class="vi-margin-top">
      <div class="vi-flex is-justify-content--center">
        <pay-qr :value="message.qr"></pay-qr>
      </div>
    </div>

    <div class="vi-margin-top vi-text is-align--center">
      <span class="vi-text is-weight--bold is-size--medium is-color--danger">
        有效时间：{{ message.timeLimit | toTime }}
      </span>
    </div>

    <div class="vi-margin-top vi-text is-align--center">
      <span class="">
        单击下方按钮【打开支付宝】进入支付宝APP支付即可
      </span>
    </div>

    <div class="vi-margin-top">
      <div class="vi-text is-align--center " style="line-height: 24px">
        <span class="vi-text is-color--danger">
          付款15分钟未到账请联系客服
        </span>
      </div>
      <div class="vi-text is-align--center " style="line-height: 24px">
        <span class="vi-text is-color--danger"
          >每笔订单是唯一的，请勿重复支付</span
        >
      </div>
      <div class="vi-text is-align--center " style="line-height: 24px">
        <span class="vi-text is-color--danger"
          >请在有效时间内支付，超时请勿支付</span
        >
      </div>
    </div>
    <div class="vi-margin-top  ">
      <div
        class="vi-btn is-btn--long is-btn--ali is-btn--pack"
        @click="openApp"
      >
        打开支付宝
      </div>
    </div>
  </div>
</template>
<style scoped></style>
