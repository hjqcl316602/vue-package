<script>
import Vue from "vue";
import { Hexer } from "@package/es";
const ALIPAY_TO_ALIPAY = "20000200";
const ALIPAY_TO_CARD = "09999988";
function ready(callback) {
  if (window.AlipayJSBridge) {
    callback && callback();
  } else {
    document.addEventListener("AlipayJSBridgeReady", callback, false);
  }
}
export default {
  name: "alipay",
  data() {
    return {
      params: {
        token: "",
        payType: ""
      }
    };
  },
  methods: {
    initialize() {
      this.params = Object.assign(this.params, this.$route.params);
      this.params = Object.assign(this.params, this.analysisToken());
      if (this.params.payType == 8) {
        setTimeout(() => {
          this.toAlipay();
        }, 0);
      }
    },
    handler(payType, type) {
      if (payType === "toAccount") {
        if (type === "alipay") {
          this.toAlipay();
        } else if (type === "scan") {
          this.toScan();
        }
      } else if (payType === "toCard") {
        this.toCard();
      }
    },
    /**
     * @description: 支付宝扫一扫
     * @param {type}
     * @return:
     */
    toScanQr() {
      let self = this;
      ready(function() {
        AlipayJSBridge.call("scan", {
          type: "qr",
          actionType: "scanAndRoute"
        });
      });
    },
    toScan() {
      let self = this;
      ready(function() {
        AlipayJSBridge.call(
          "scan",
          {
            type: "qr"
          },
          function(result) {
            if ("error" in result) return;
            if (
              "imageChannel" in result &&
              result["imageChannel"] === "album"
            ) {
              setTimeout(() => {
                self.$message("不能从相册中选择条形码或二维码");
              }, 300);
            } else {
              setTimeout(() => {
                self.toAlipay();
              }, 300);
            }
          }
        );
      });
    },
    toAlipay() {
      let href = this.params.qr;
      ready(function(params) {
        AlipayJSBridge.call(
          "pushWindow",
          {
            url: href,
            params: {
              closeCurrentWindow: false
            }
          },
          function() {}
        );
      });
    },
    toCard() {
      let cards = this.params.qr.split(",");
      let money = Number(this.params.fee) / 100;
      let cardNo = cards[0];
      let bankName = cards[1];
      let bankAccount = cards[2];
      let bankMark = cards[3];
      let href = `https://www.alipay.com/?appId=${ALIPAY_TO_CARD}&actionType=toCard&sourceId=bill&cardNo=${cardNo}&bankAccount=${bankAccount}&money=${money}&amount=${money}&bankMark=${bankMark}&bankName=${bankName}&orderSource= from`;
      //window.location.href = href;
      ready(function(params) {
        AlipayJSBridge.call(
          "pushWindow",
          {
            url: href,
            params: {
              closeCurrentWindow: false
            }
          },
          function() {}
        );
      });
    },
    /**
     * 解析token，16进制转化为字符串
     */
    analysisToken() {
      try {
        let hex = new Hexer();
        let hexToString = hex.decodeComponent(this.params.token);
        let message = JSON.parse(hexToString);
        return message;
      } catch (e) {
        console.log(e);
        this.$router.replace({
          name: "Error",
          query: { msg: "异常，请重试或联系客服！" }
        });
      }
    }
  },
  created() {
    this.initialize();
  }
};
</script>

<template>
  <div
    class="vi-cotain is-contain--ver is-contain--min vv-page is-page--max is-page--center vi-background vi-padding"
    v-if="params.payType != 8"
  >
    <div class="vi-text is-align--center" style="line-height: 100px">
      <span class="vi-icon vi-text is-color--ali" style="font-size: 40px"
        >&#xe608;</span
      >
    </div>
    <template v-if="params.payType == 5">
      <div class="vi-margin-bottom ">
        <div class="vi-margin-bottom ">
          <span class="vi-text is-weight--bold is-color--danger">温馨提示</span>
        </div>
        <div class="vi-margin-bottom">
          <p
            style="text-indent:20px; line-height: 24px "
            class="vi-text is-color--danger"
          >
            单击下方按钮【去支付】，如果能正常跳转至转账页面，继续转账即可
          </p>
          <p
            style="text-indent:20px; line-height: 24px "
            class="vi-text is-color--danger"
          >
            若跳转后出现系统原因导致不能正常转账，您需要返回至该页面后开启手机【飞行/离线模式】，再单击下方按钮【去支付】，跳转至转账页面后再关闭【飞行/离线模式】，等待网络恢复正常后即可继续转账
          </p>
        </div>
      </div>
      <div class="vi-margin-bottom  ">
        <div class="vi-margin-bottom ">
          <span class="vi-text is-weight--bold is-color--danger">注意事项</span>
        </div>
        <div>
          <p
            style="text-indent:20px;line-height: 24px"
            class="vi-text is-color--danger"
          >
            请勿修改转账信息
          </p>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="vi-text is-weight--bold is-color--danger">示例如下</span>
        </div>
        <div class="vi-text is-align--center ">
          <img src="../image/icon-unalive.png" alt="" style="max-width:200px" />
        </div>
      </div>

      <div>
        <div
          class="vi-btn is-btn--ali is-btn--pack is-btn--long"
          @click="handler('toCard', 'alipay')"
        >
          去支付
        </div>
      </div>
    </template>
    <template v-if="params.payType == 6">
      <div class="vi-margin-bottom ">
        <div class="vi-margin-bottom  ">
          <span class="vi-text is-weight--bold is-color--danger">温馨提示</span>
        </div>
        <div class="vi-margin-bottom">
          <p
            style="text-indent:20px;line-height: 24px "
            class="vi-text is-color--danger"
          >
            单击下方按钮【去支付】，如果能正常跳转至转账页面，继续转账即可
          </p>
          <p
            style="text-indent:20px;line-height: 24px"
            class="vi-text is-color--danger"
          >
            若跳转后出现系统原因导致不能正常转账，您需要返回至该页面单击下方按钮【扫一扫】，并选择您身边随处可见的二维码或条形码，对准其进行扫码，扫码之后若能正常跳转至转账页面，继续转账即可
          </p>
        </div>
      </div>
      <div class="vi-margin-bottom ">
        <div class="vi-margin-bottom ">
          <span class="vi-text is-weight--bold is-color--danger">注意事项</span>
        </div>
        <div>
          <p
            style="text-indent:20px;line-height: 24px"
            class="vi-text is-color--danger"
          >
            请勿修改转账信息
          </p>
          <p
            style="text-indent:20px;line-height: 24px"
            class="vi-text is-color--danger"
          >
            使用扫一扫时，不能从相册中选择条形码或二维码，可选如烟盒，零食，酒水...
          </p>
        </div>
      </div>
      <div class="vi-margin-bottom  ">
        <div class="vi-margin-bottom">
          <span class="vi-text is-weight--bold is-color--danger">示例如下</span>
        </div>
        <div class="vi-text is-align--center ">
          <img src="../image/icon-code.jpg" alt="" style="height:44px" />
          <img src="../image/icon-qr.jpg" alt="" style="height:44px" />
        </div>
      </div>
      <div class="vi-margin-top">
        <div class="vi-margin-bottom">
          <div
            class="vi-btn is-btn--pack is-btn--primary is-btn--long  "
            @click="handler('toAccount', 'alipay')"
          >
            去支付
          </div>
        </div>
        <div>
          <div
            class="vi-btn is-btn--hollow is-btn--primary is-btn--long is-btn--thiner"
            @click="handler('toAccount', 'scan')"
          >
            扫一扫
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
