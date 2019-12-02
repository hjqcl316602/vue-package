<script>
import { Hexer, funer } from "@package/es";
import { getCardDetail, createDraw, uploadQrImage } from "@/request";
export default {
  name: "draw",
  data() {
    return {
      params: {
        type: 1,
        token: "",
        accessToken: "",
        fee: "",
        memId: "",
        subMemId: "",
        mobile: "",
        appId: "",

        cardNo: "",
        bank: "",
        bankLogo: "",
        bankRealName: "",

        wechat: "",
        wechatUrl: "",
        qrWeCodeUrl: "",

        alipay: "",
        alipayUrl: "",
        alipayCodeUrl: "",
        alipayRealName: "",

        unionpay: "",
        unionpayUrl: "",
        unionpayCodeUrl: ""
      },
      actionTypes: {
        options: this.$drawTypes,
        show: false
      },
      confirm: {
        show: false
      }
    };
  },
  props: {},
  computed: {},
  watch: {
    ["params.cardNo"]: {
      handler(val, olval) {
        this.getCardDetail();
      }
    }
  },
  methods: {
    init() {
      this.params = Object.assign(this.params, this.$route.params);
      console.log(this.params);
      let message = this.analysisToken();
      this.params = Object.assign(this.params, message);
      console.log(message);
    },
    /**
     * 解析数据
     */

    analysisToken() {
      try {
        let hex = new Hexer();
        let hexToString = hex.decodeComponent(this.params.token);
        let message = JSON.parse(hexToString);
        return message;
      } catch (e) {
        this.$router.replace({
          name: "Error",
          query: { msg: "异常，请重试或联系客服！" }
        });
      }
    },
    getCardDetail: funer.debouncer(function() {
      getCardDetail({
        cardNo: this.params.cardNo
      }).then(({ code, data, msg }) => {
        if (code === "000") {
          let { bankName, bankLogo } = data;
          if (bankName) {
            this.params.bank = bankName;
            this.params.bankLogo = bankLogo;
          } else {
            this.$message.danger("该银行不支持！");
          }
        } else {
          this.params.bank = "";
          this.params.bankLogo = "";
        }
      });
    }, 1000),
    actionTypeSelect({ type, value }) {
      this.params.type = value;
    },
    beforeSubmit() {
      if (this.params.type === 1) {
        if (!this.params.bankRealName)
          return this.$message.danger(
            "请输入您的真实姓名，确保和银行卡姓名一致"
          );
        if (!/^[0-9]{15,19}$/.test(this.params.cardNo))
          return this.$message.danger("卡号格式错误，由15-19位数字组成");
        if (!this.params.bank)
          return this.$message.danger(
            "开户行信息获取失败，更换其他的银行或重试"
          );
      } else if (this.params.type === 2) {
        if (!this.params.wechat)
          return this.$message.danger("请输入您的微信账号");
        if (!this.params.qrWeCodeUrl || !this.params.wechatUrl)
          return this.$message.danger("请上传您的微信收款二维码");
      } else if (this.params.type === 3) {
        if (!this.params.alipay)
          return this.$message.danger("请输入您的支付宝账号");
        if (!this.params.alipayRealName)
          return this.$message.danger("请输入您的支付宝真实姓名");
        if (!this.params.alipayCodeUrl || !this.params.alipayUrl)
          return this.$message.danger("请上传您的支付宝收款二维码");
      } else if (this.params.type === 4) {
        if (!this.params.unionpay)
          return this.$message.danger("请输入您的云闪付账号");
        if (!this.params.unionpayCodeUrl || !this.params.unionpayUrl)
          return this.$message.danger("请上传您的云闪付收款二维码");
      }
      this.confirm.show = true;
    },
    confirmOk() {
      let { type, token, fee, memId, subMemId, appId, ...rest } = this.params;
      rest.channelId = type;
      createDraw(rest).then(({ code, data, msg }) => {
        if (code === "000") {
          this.$message.success("您的提现申请已提交，注意查收");
          this.$router.replace({
            name: "DrawStatus",
            params: {
              accessToken: this.params.accessToken,
              appId: this.params.appId
            }
          });
        } else this.$message.danger(msg);
      });
    },
    upload(e, type) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      e.target.value = "";
      uploadQrImage(formData).then(({ code, data, msg }) => {
        console.log(code, data);
        if (code === "000") {
          let { qr, url } = data;
          if (qr && url) {
            if (type === "wx") {
              this.params.qrWeCodeUrl = url;
              this.params.wechatUrl = qr;
            } else if (type === "ali") {
              this.params.alipayCodeUrl = url;
              this.params.alipayUrl = qr;
            } else if (type === "union") {
              this.params.unionpayCodeUrl = url;
              this.params.unionpayUrl = qr;
            }
          } else {
            this.$message.danger("图片解析或上传失败");
          }
        } else this.$message.danger(msg);
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div
    class="vi-cotain is-contain--ver is-contain--min  vv-page is-page--max is-page--center vi-padding vi-background"
  >
    <template>
      <vui-action
        :options="actionTypes.options"
        v-model="actionTypes.show"
        @select="actionTypeSelect"
      >
      </vui-action>
      <vui-confirm v-model="confirm.show" title="提现确认" @ok="confirmOk">
        <div class="vi-padding vi-text is-align--center">
          <span class="vi-text is-color--danger">
            您是否确认你提交的提现信息准确无误，否则提现失败?
          </span>
        </div>
      </vui-confirm>
    </template>
    <div class="">
      <div
        class="vi-border is-border--bottom is-border--thiner "
        style="line-height: 44px;"
      >
        <div class="vi-flex vi-padding-ad is-align-items--center">
          <div style=";width:80px" class="vi-text is-align--right">
            <span class="vi-text">账号</span>
          </div>
          <div class="vi-flex-item is-flex--1 vi-padding-ad">
            <div class="vi-flex is-justify-content--flex-end ">
              <div class="    ">
                <span class="vi-margin-left vi-icon vi-text  ">
                  {{ params.subMemId }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="vi-border is-border--bottom is-border--thiner "
        style="line-height: 44px;"
      >
        <div class="vi-flex vi-padding-ad is-align-items--center">
          <div style=";width:80px" class="vi-text is-align--right">
            <span class="vi-text">提现金额</span>
          </div>
          <div class="vi-flex-item is-flex--1 vi-padding-ad">
            <div class="vi-flex is-justify-content--flex-end ">
              <div class="    ">
                <span class="vi-margin-left vi-icon vi-text  ">
                  ￥ {{ params.fee / 100 || 0 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="vi-border is-border--bottom is-border--thiner "
        @click="actionTypes.show = true"
        style="line-height: 44px;"
      >
        <div class="vi-flex vi-padding-ad is-align-items--center">
          <div style=";width:80px" class="vi-text is-align--right">
            <span class="vi-text">类型</span>
          </div>
          <div class="vi-flex-item is-flex--1 vi-padding-ad">
            <div
              class="vi-flex is-justify-content--space-between is-align-items--center"
            >
              <div class="vi-flex-item is-flex--1">
                <div class="vi-flex  is-align-items--center">
                  <span
                    class="vi-icon"
                    v-html="$getDrawTypes(params.type).icon"
                    :style="{ color: $getDrawTypes(params.type).color }"
                    style="font-size: 24px"
                  ></span>
                  <span class="vi-margin-left vi-icon  ">
                    {{ $getDrawTypes(params.type).text }}
                  </span>
                </div>
              </div>
              <div class="    ">
                <span class="vi-margin-left vi-icon vi-text is-color--light">
                  &#xe61f;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template v-if="params.type === 1">
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">姓名</span>
            </div>
            <input
              type="text"
              class="vi-input is-input--larger"
              placeholder="请输入您的银行卡姓名"
              v-model="params.bankRealName"
            />
            <div
              class="vi-padding-ad"
              v-if="params.bankRealName"
              @click="params.bankRealName = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">卡号</span>
            </div>
            <input
              type="tel"
              class="vi-input is-input--larger"
              placeholder="请输入您的卡号"
              v-model="params.cardNo"
            />
            <div
              class="vi-padding-ad"
              v-if="params.cardNo"
              @click="params.cardNo = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>

        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">开户行</span>
            </div>
            <div class="vi-flex-item is-flex--1">
              <div
                class="vi-padding-ad vi-flex is-justify-content--space-between is-align-items--center"
              >
                <span>{{ params.bank }}</span>
                <img :src="params.bankLogo" style="height: 32px" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="params.type === 2">
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">账号</span>
            </div>
            <input
              type="text"
              class="vi-input is-input--larger"
              placeholder="请输入您的微信账号"
              v-model="params.wechat"
            />
            <div
              class="vi-padding-ad"
              v-if="params.wechat"
              @click="params.wechat = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px;height:44px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">收款码</span>
            </div>
            <div class="vi-flex-item is-flex--1 vi-padding-ad ">
              <div class="">
                <label for="upload-2" class="vi-upload">
                  <input
                    type="file"
                    id="upload-2"
                    accept="image/*"
                    @change="e => upload(e, 'wx')"
                  />
                  <div class="vi-text is-align--center">
                    <img
                      :src="params.qrWeCodeUrl"
                      alt=""
                      v-if="params.qrWeCodeUrl"
                      style="width: 150px;"
                    />
                    <span class="vi-icon" style="font-size: 24px" v-else>
                      &#xe621;
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="params.type === 3">
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">账号</span>
            </div>
            <input
              type="text"
              class="vi-input is-input--larger"
              placeholder="请输入您的支付宝账号"
              v-model="params.alipay"
            />
            <div
              class="vi-padding-ad"
              v-if="params.alipay"
              @click="params.alipay = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">实名</span>
            </div>
            <input
              type="text"
              class="vi-input is-input--larger"
              placeholder="请输入您的支付宝实名"
              v-model="params.alipayRealName"
            />
            <div
              class="vi-padding-ad"
              v-if="params.alipayRealName"
              @click="params.alipayRealName = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px;height:44px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">收款码</span>
            </div>
            <div class="vi-flex-item is-flex--1 vi-padding-ad ">
              <div class="">
                <label for="upload-3" class="vi-upload">
                  <input
                    type="file"
                    id="upload-3"
                    accept="image/*"
                    @change="e => upload(e, 'ali')"
                  />
                  <div class="vi-text is-align--center">
                    <img
                      :src="params.alipayCodeUrl"
                      alt=""
                      v-if="params.alipayCodeUrl"
                      style="width: 150px;"
                    />
                    <span class="vi-icon" style="font-size: 24px" v-else>
                      &#xe621;
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="params.type === 4">
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">账号</span>
            </div>
            <input
              type="text"
              class="vi-input is-input--larger"
              placeholder="请输入您的云闪付账号"
              v-model="params.unionpay"
            />
            <div
              class="vi-padding-ad"
              v-if="params.unionpay"
              @click="params.unionpay = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px;height:44px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">收款码</span>
            </div>
            <div class="vi-flex-item is-flex--1 vi-padding-ad ">
              <div class="">
                <label for="upload-4" class="vi-upload">
                  <input
                    type="file"
                    id="upload-4"
                    accept="image/*"
                    @change="e => upload(e, 'union')"
                  />
                  <div class="vi-text is-align--center">
                    <img
                      :src="params.unionpayCodeUrl"
                      alt=""
                      v-if="params.unionpayCodeUrl"
                      style="width: 150px;"
                    />
                    <span class="vi-icon" style="font-size: 24px" v-else>
                      &#xe621;
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="vi-margin-top is-margin-top--large">
      <div
        class="vi-btn is-btn--pack is-btn--primary is-btn--long "
        @click="beforeSubmit"
      >
        提交
      </div>
    </div>
  </div>
</template>
