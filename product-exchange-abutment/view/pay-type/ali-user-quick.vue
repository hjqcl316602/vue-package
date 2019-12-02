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
    },
    handleSuccess(e) {
      this.$message.success("复制成功！" + e.text);
    },
    handleError(e) {
      this.$message.success("复制失败！");
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
      <div class="vi-flex is-align-items--flex-end is-justify-content--center">
        <span style="font-size: 24px">￥</span>
        <span style="font-size: 36px">{{ message.fee / 100 || 0 }}</span>
        <div class="vi-margin-left">
          <div
            class="vi-btn is-btn--hollow is-btn--primary is-btn--smaller is-btn--thiner is-btn--radius "
            v-clipboard:copy="message.fee / 100"
            　　v-clipboard:success="handleSuccess"
            　　v-clipboard:error="handleError"
          >
            复制
          </div>
        </div>
      </div>
      <div class="vi-text is-align--center">
        <span class="vi-text is-color--gray">{{ message.sn }}</span>
      </div>
      <div class="vi-text is-align--center">
        <span class="vi-text is-color--danger" style="font-size: 18px">
          请确保付款金额一致，否则不到账
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

    <div class=" vi-margin-top">
      <div class="vi-text is-align--center">
        <span style="line-height: 32px">
          方式一：单击下方按钮打开支付宝
          <i class="vi-icon vi-text is-color--primary">&#xe680;</i>
          支付即可
        </span>
      </div>
      <div class="vi-text is-align--center">
        <span style="line-height: 32px">
          方式二：复制金额
          <i class="vi-icon vi-text is-color--primary">&#xe680;</i>
          截屏扫码
          <i class="vi-icon vi-text is-color--primary">&#xe680;</i>
          粘贴金额支付
        </span>
      </div>
      <div
        class="vi-flex is-flex-wrap--nowrap is-justify-content--space-between"
        v-if="false"
      >
        <div
          class="vi-text is-align--center vi-flex is-flex-direction--column "
        >
          <span class="vi-text is-size--smaller">
            复制上方金额
          </span>
        </div>
        <div class="vi-padding-ad">
          <i class="vi-icon vi-text is-color--primary">&#xe680;</i>
        </div>
        <div class="vi-text is-align--center vi-flex is-flex-direction--column">
          <span class="vi-text is-size--smaller">
            单击下方按钮打开支付宝
          </span>
        </div>
        <div class="vi-padding-ad ">
          <i class="vi-icon vi-text is-color--primary">&#xe680;</i>
        </div>
        <div
          class="vi-text is-align--center vi-flex is-flex-direction--column "
        >
          <span class="vi-text is-size--smaller">
            粘贴金额支付即可
          </span>
        </div>
      </div>
    </div>

    <div class="vi-margin-top">
      <div
        class="vi-btn is-btn--long is-btn--ali is-btn--pack is-btn--larger"
        @click="openApp"
        v-clipboard:copy="message.fee / 100"
        　　v-clipboard:success="handleSuccess"
        　　v-clipboard:error="handleError"
      >
        复制金额并打开支付宝
      </div>
    </div>

    <div class="vi-margin-top">
      <div class="vi-text is-align--center " style="line-height: 24px">
        <span class="vi-text is-color--danger">
          请使用非QQ浏览器打开
        </span>
      </div>
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
