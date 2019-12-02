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
export default {
  name: "PagePayWx",
  components: { payQr },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
        <span class=" vi-icon vi-text is-color--union" style="font-size: 40px">
          &#xe68b;
        </span>
        <span class="vi-margin-left" style="font-size: 18px">
          云闪付
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
          请确保付款金额一致，否则不到账
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

    <div class=" vi-margin-top">
      <div class="vi-flex is-flex-wrap--nowrap">
        <div
          class="vi-text is-align--center vi-flex is-flex-direction--column "
        >
          <i class="vi-icon vi-text is-color--union">&#xe628;</i>
          <span class="vi-text is-size--smaller"
            >将二维码截屏并保存至本地相册
          </span>
        </div>
        <div class="vi-padding">
          <i class="vi-icon vi-text is-color--union">&#xe680;</i>
        </div>
        <div class="vi-text is-align--center vi-flex is-flex-direction--column">
          <i class="vi-icon vi-text is-color--union">&#xe68b;</i>
          <span class="vi-text is-size--smaller">
            打开云闪付APP、银行APP、热门APP首页扫码进行支付
          </span>
        </div>
        <div class="vi-padding ">
          <i class="vi-icon vi-text is-color--union">&#xe680;</i>
        </div>
        <div
          class="vi-text is-align--center vi-flex is-flex-direction--column "
        >
          <i class="vi-icon vi-text is-color--union">&#xe60e;</i>
          <span class="vi-text is-size--smaller">从本地相册选取截屏二维码</span>
        </div>
      </div>
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
