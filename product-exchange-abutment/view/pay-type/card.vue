<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 10:02:13
 * @LastEditTime: 2019-08-27 09:37:19
 * @LastEditors: Please set LastEditors
 -->
<script>
import Vue from "vue";
import { Queryer, Urler } from "@package/es";

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
  name: "PagePayCard",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleSuccess(e) {
      this.$message.success("复制成功！" + e.text);
    },
    handleError(e) {
      this.$message.success("复制失败！");
    },
    openApp() {
      let test = true;
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
        <span class=" vi-icon vi-text is-color--card" style="font-size: 40px">
          &#xe620;
        </span>
        <span class="vi-margin-left" style="font-size: 18px">
          银行卡
        </span>
      </div>
      <div class="vi-text is-align--center">
        <span style="font-size: 24px">￥</span>
        <span style="font-size: 30px">{{ message.fee / 100 || 0 }}</span>
      </div>
      <div class="vi-text is-align--center">
        <span class="vi-text is-color--gray">{{ message.sn }}</span>
      </div>
      <template>
        <div class="vi-text is-align--center">
          <span class="vi-text is-color--danger" style="font-size: 18px">
            请确保付款金额一致，否则不到账
          </span>
        </div>
      </template>
    </div>
    <div v-if="message.qr.split(',').length > 0" class="vi-margin-top">
      <div class="vi-flex" style="line-height: 36px">
        <div
          class="vi-flex-item vi-text is-align--right vi-padding-right"
          style="width: 60px"
        >
          <span class="vi-text is-color--gray" style="font-size: 16px">
            卡号
          </span>
        </div>
        <div class="vi-flex-item is-flex--1">
          <div
            class="vi-flex is-align-items--center is-justify-content--space-between"
          >
            <span style="font-size: 16px">{{ message.qr.split(",")[0] }}</span>
            <div
              class="vi-btn is-btn--hollow is-btn--primary is-btn--smaller is-btn--thiner is-btn--radius"
              v-clipboard:copy="message.qr.split(',')[0]"
              　　v-clipboard:success="handleSuccess"
              　　v-clipboard:error="handleError"
            >
              复制
            </div>
          </div>
        </div>
      </div>
      <div class="vi-flex" style="line-height: 36px">
        <div
          class="vi-flex-item vi-text is-align--right vi-padding-right"
          style="width: 60px"
        >
          <span class="vi-text is-color--gray" style="font-size: 16px">
            户主
          </span>
        </div>
        <div class="vi-flex-item is-flex--1">
          <div
            class="vi-flex is-align-items--center is-justify-content--space-between"
          >
            <span style="font-size: 16px">{{ message.qr.split(",")[2] }}</span>
            <div
              class="vi-btn is-btn--hollow is-btn--primary is-btn--smaller is-btn--thiner is-btn--radius"
              v-clipboard:copy="message.qr.split(',')[2]"
              　　v-clipboard:success="handleSuccess"
              　　v-clipboard:error="handleError"
            >
              复制
            </div>
          </div>
        </div>
      </div>
      <div class="vi-flex" style="line-height: 36px">
        <div
          class="vi-flex-item vi-text is-align--right vi-padding-right"
          style="width: 60px"
        >
          <span class="vi-text is-color--gray" style="font-size: 16px">
            开户行
          </span>
        </div>
        <div class="vi-flex-item is-flex--1">
          <div
            class="vi-flex is-align-items--center is-justify-content--space-between"
          >
            <span style="font-size: 16px">{{ message.qr.split(",")[1] }}</span>
            <div
              class="vi-btn is-btn--hollow is-btn--primary is-btn--smaller is-btn--thiner is-btn--radius"
              v-clipboard:copy="message.qr.split(',')[1]"
              　　v-clipboard:success="handleSuccess"
              　　v-clipboard:error="handleError"
            >
              复制
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vi-margin-top vi-text is-align--center">
      <span class="vi-text is-weight--bold is-size--medium is-color--danger">
        有效时间：{{ message.timeLimit | toTime }}
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
  </div>
</template>
<style scoped></style>
