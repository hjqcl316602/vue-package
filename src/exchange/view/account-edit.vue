<script>
import { advertTypes } from "../mixin";
import { getCardDetail, createAccount } from "../request";
import { uploadQrImage } from "../request/upload";
import funner from "../../../package/es/funer";
import { qrAlipay } from "../image";

export default {
  name: "",
  data() {
    return {
      image: {
        alipay: qrAlipay
      },
      params: {
        mode: 5,
        password: ""
      },
      action: {
        show: false,
        options: advertTypes
      },
      actionPolymer: {
        show: false,
        options: [
          {
            text: "支付宝",
            value: "支付宝"
          },
          {
            text: "微信",
            value: "微信"
          }
        ]
      },

      card: {
        realName: "",
        url: "",
        reUrl: "",
        name: "",
        mask: "" // 银行简称
      },
      wx: {
        name: "",
        originUrl: "",
        url: ""
      },
      alipay: {
        realName: "",
        name: "",
        originUrl: "",
        url: "",
        userId: "",
        userIdAgain: ""
      },
      unionpay: {
        name: "",
        originUrl: "",
        url: ""
      },

      polymer: {
        name: "",
        originUrl: "",
        url: "",
        payMode: []
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {},

    selectAction(item) {
      this.action.show = false;
      this.params.mode = item.value;
    },
    selectActionPolyer(item) {
      let value = item.value;
      if (this.polymer.payMode.includes(value)) {
        this.polymer.payMode = this.polymer.payMode.filter(ele => {
          return ele !== value;
        });
      } else {
        this.polymer.payMode.push(value);
      }
    },

    saveAccount() {
      let params = {};
      if (this.params.mode === 1) {
        if (!this.card.realName) {
          this.$message.danger("请输入您的银行卡真实姓名");
          return false;
        }
        if (!this.card.url || !this.card.reUrl) {
          this.$message.danger("请输入您的卡号");
          return false;
        }
        if (
          !/^[0-9]{15,19}$/.test(this.card.url) ||
          !/^[0-9]{15,19}$/.test(this.card.reUrl)
        ) {
          this.$message.danger("卡号格式不正确");
          return false;
        }
        if (this.card.url !== this.card.reUrl) {
          this.$message.danger("请输入相同的银行卡号");
          return false;
        }
        if (!this.card.name) {
          this.$message.danger("开户行信息获取失败");
          return false;
        }
        if (!this.params.password) {
          this.$message.danger("请输入您的资金密码");
          return false;
        }
        params = {
          name: this.card.name,
          url: this.card.url,
          realName: this.card.realName,
          alipayOrMask: this.card.mask
        };
      } else if (this.params.mode === 2) {
        if (!this.wx.name) {
          this.$message.danger("请输入您的微信账号");
          return false;
        }
        if (!this.wx.originUrl) {
          this.$message.danger("请上传微信收款二维码");
          return false;
        }
        params = {
          name: this.wx.name,
          url: this.wx.url,
          originUrl: this.wx.originUrl
        };
      } else if (this.params.mode === 3) {
        if (!this.alipay.name) {
          this.$message.danger("请输入您的支付宝账号");
          return false;
        }
        if (!this.alipay.realName) {
          this.$message.danger("请输入您的支付宝实名");
          return false;
        }
        if (!this.alipay.originUrl) {
          this.$message.danger("请上传支付宝收款二维码");
          return false;
        }
        if (!this.alipay.originUrl) {
          this.$message.danger("请上传支付宝收款二维码");
          return false;
        }
        params = {
          name: this.alipay.name,
          realName: this.alipay.realName,
          url: this.alipay.url,
          originUrl: this.alipay.originUrl,
          alipayOrMask: this.alipay.userId
        };
      } else if (this.params.mode === 4) {
        if (!this.unionpay.name) {
          this.$message.danger("请输入您的云闪付账号");
          return false;
        }
        if (!this.unionpay.originUrl) {
          this.$message.danger("请上传云山付收款二维码");
          return false;
        }
        params = {
          name: this.unionpay.name,
          url: this.unionpay.url,
          originUrl: this.unionpay.originUrl
        };
      } else if (this.params.mode === 5) {
        if (!this.polymer.name) {
          this.$message.danger("请输入您的聚合码账号");
          return false;
        }
        if (!this.polymer.originUrl) {
          this.$message.danger("请上传聚合码收款二维码");
          return false;
        }
        if (!this.polymer.payMode.join(",")) {
          this.$message.danger("请选择付款方式");
          return false;
        }
        params = {
          name: this.polymer.name,
          url: this.polymer.url,
          originUrl: this.polymer.originUrl,
          alipayOrMask: this.polymer.payMode.join(",")
        };
      }
      params.type = this.params.mode;
      params.jyPassword = this.params.password;
      this.createAccount(params);
    },
    createAccount(params) {
      createAccount(params).then(res => {
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

    getCardDetail: funner.debouncer(function() {
      getCardDetail({
        cardNo: this.card.reUrl
      }).then(res => {
        let data = res.data;
        if (data.code === "000") {
          let res = data["data"] || {};
          if (res["bank"] && res["bankName"]) {
            this.card.name = res["bankName"];
            this.card.mask = res["bank"];
          } else {
            this.$message.danger("该银行不支持！");
          }
        } else {
          this.card.name = "";
          this.card.mask = "";
        }
      });
    }, 1000),
    beforeUpload(value, type) {
      uploadQrImage(value).then(res => {
        let data = res.data;
        if (data.code === "000") {
          let message = data.data || {};
          if (message.qr && message.url) {
            this[type].url = message.qr;
            this[type].originUrl = message.url;
            this.$message.success("成功解析并上传");
          } else {
            this[type].url = "";
            this[type].originUrl = "";
            this.$message.danger("解析或上传失败");
          }
        } else {
          this.$message.danger(data.message);
        }
      });
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    ["card.reUrl"]: {
      handler(val, olval) {
        this.getCardDetail();
      }
    }
  }
};
</script>

<template>
  <div class="vv-transfer vv-panel" style=" min-height: 100vh">
    <vui-action
      :options="action.options"
      v-model="action.show"
      @select="selectAction"
      :is-cancel="false"
    >
    </vui-action>
    <vui-action
      :is-cancel="false"
      :options="actionPolymer.options"
      v-model="actionPolymer.show"
      @select="selectActionPolyer"
    >
    </vui-action>
    <div class="vi-padding--large ">
      <div>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-require">
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <span class="vi-font-weight--bold">类型</span>
            </div>
            <div
              class="vi-flex--1 vi-padding-right vi-padding-left"
              style="line-height: 44px;"
            >
              <span>
                {{ $getAdvertTypes(params.mode).text }}
              </span>
            </div>
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
              @click="action.show = true"
            >
              <i class="iconfont icon-jiantou"></i>
            </div>
          </div>
        </div>

        <template v-if="params.mode === 1">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">姓名</span>
              </div>
              <input
                type="text"
                class=""
                placeholder="请输入您的银行卡姓名"
                v-model="card.realName"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="card.realName"
                @click="card.realName = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">卡号</span>
              </div>
              <input
                type="tel"
                class=""
                placeholder="请输入您的卡号"
                v-model="card.url"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="card.url"
                @click="card.url = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">确认卡号</span>
              </div>
              <input
                type="tel"
                class=""
                placeholder="请再次输入您的卡号"
                v-model="card.reUrl"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="card.reUrl"
                @click="card.reUrl = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-flex vi-require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">开户行</span>
              </div>
              <div
                class="vi-flex--1 vi-padding-right vi-padding-left"
                style="line-height: 44px;"
              >
                <span>
                  {{ card.name }}
                </span>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.mode === 2">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">账号</span>
              </div>
              <input
                type="text"
                class=""
                placeholder="请输入您的微信账号"
                v-model="wx.name"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="wx.name"
                @click="wx.name = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-flex vi-require">
              <div
                style="width:80px"
                class="vi-padding-right vi-padding-left vi-center--ver vi-justify-content--flex-end"
              >
                <span class="vi-font-weight--bold">收款码</span>
              </div>
              <div class="vi-flex--1 vi-padding">
                <img
                  :src="wx.originUrl"
                  alt=""
                  style="max-width: 100%;max-height: 200px"
                  v-if="wx.originUrl"
                />
                <vui-upload
                  v-else
                  :layerSize="100"
                  @change="res => beforeUpload(res, 'wx')"
                >
                  <div style="line-height: 100px">
                    <i
                      class="iconfont icon-shangchuan-copy "
                      style="font-size: 40px"
                    ></i>
                  </div>
                </vui-upload>
              </div>
              <div
                class="vi-padding-right vi-padding-left vi-text-align--center vi-center--ver"
                v-if="wx.originUrl"
                @click="wx.originUrl = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.mode === 3">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">账号</span>
              </div>
              <input
                type="text"
                class=""
                placeholder="请输入您的支付宝账号"
                v-model="alipay.name"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="alipay.name"
                @click="alipay.name = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">实名</span>
              </div>
              <input
                type="text"
                class=""
                placeholder="请输入您的支付宝实名"
                v-model="alipay.realName"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="alipay.realName"
                @click="alipay.realName = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-flex vi-require">
              <div
                style="width:80px"
                class="vi-padding-right vi-padding-left  vi-center--ver vi-justify-content--flex-end"
              >
                <span class="vi-font-weight--bold">收款码</span>
              </div>
              <div class="vi-flex--1 vi-padding">
                <img
                  :src="alipay.originUrl"
                  alt=""
                  style="max-width: 100%;max-height: 200px"
                  v-if="alipay.originUrl"
                />
                <vui-upload
                  v-else
                  :layerSize="100"
                  @change="res => beforeUpload(res, 'alipay')"
                >
                  <div style="line-height: 100px">
                    <i
                      class="iconfont icon-shangchuan-copy "
                      style="font-size: 40px"
                    ></i>
                  </div>
                </vui-upload>
              </div>
              <div
                class="vi-padding-right vi-padding-left vi-center"
                v-if="alipay.originUrl"
                @click="alipay.originUrl = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
            <div class="vi-border is-border--bottom is-border--thiner">
              <div class="  vi-input is-input--larger is-input--require">
                <div
                  style="line-height: 44px;width:80px"
                  class="vi-padding-right vi-padding-left vi-text-align--right"
                >
                  <span class="vi-font-weight--bold">ID号</span>
                </div>
                <input
                  type="tel"
                  class=""
                  placeholder="请输入您的支付宝ID号"
                  v-model="alipay.userId"
                />
                <div
                  style="line-height: 43px"
                  class="vi-padding-right vi-padding-left"
                  v-if="alipay.userId"
                  @click="alipay.userId = ''"
                >
                  <i class="iconfont icon-shanchu" style="color:#999"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="vi-text-align--center vi-padding">
            <div>
              <span class="vi-color--danger">
                将下方二维码保存至相册，打开支付宝APP选择扫一扫，从本地相册中选择扫码，将得到的结果填入到输入框中即可，确保输入的支付宝ID准确无误，否则导致收款失败
              </span>
            </div>
            <div class="vi-margin-top">
              <img
                :src="image.alipay"
                alt=""
                style="max-width: 100%;max-height: 200px"
              />
            </div>
          </div>
        </template>
        <template v-if="params.mode === 4">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">账号</span>
              </div>
              <input
                type="text"
                class=""
                placeholder="请输入您的云闪付账号"
                v-model="unionpay.name"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="unionpay.name"
                @click="unionpay.name = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-flex vi-require">
              <div
                style="width:80px"
                class="vi-padding-right vi-padding-left vi-center--ver vi-justify-content--flex-end"
              >
                <span class="vi-font-weight--bold">收款码</span>
              </div>
              <div class="vi-flex--1 vi-padding">
                <img
                  :src="unionpay.originUrl"
                  alt=""
                  style="max-width: 100%;max-height: 200px"
                  v-if="unionpay.originUrl"
                />
                <vui-upload
                  v-else
                  :layerSize="100"
                  @change="res => beforeUpload(res, 'unionpay')"
                >
                  <div style="line-height: 100px">
                    <i
                      class="iconfont icon-shangchuan-copy "
                      style="font-size: 40px"
                    ></i>
                  </div>
                </vui-upload>
              </div>
              <div
                class="vi-padding-right vi-padding-left vi-center"
                v-if="unionpay.originUrl"
                @click="unionpay.originUrl = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.mode === 5">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="  vi-input is-input--larger is-input--require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">账号</span>
              </div>
              <input
                type="text"
                class=""
                placeholder="请输入您的聚合码账号"
                v-model="polymer.name"
              />
              <div
                style="line-height: 43px"
                class="vi-padding-right vi-padding-left"
                v-if="polymer.name"
                @click="polymer.name = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-flex vi-require">
              <div
                style="width:80px"
                class="vi-padding-right vi-padding-left vi-center--ver vi-justify-content--flex-end"
              >
                <span class="vi-font-weight--bold">收款码</span>
              </div>
              <div class="vi-flex--1 vi-padding">
                <img
                  :src="polymer.originUrl"
                  alt=""
                  style="max-width: 100%;max-height: 200px"
                  v-if="polymer.originUrl"
                />
                <vui-upload
                  v-else
                  :layerSize="100"
                  @change="res => beforeUpload(res, 'polymer')"
                >
                  <div style="line-height: 100px">
                    <i
                      class="iconfont icon-shangchuan-copy "
                      style="font-size: 40px"
                    ></i>
                  </div>
                </vui-upload>
              </div>
              <div
                class="vi-padding-right vi-padding-left vi-center"
                v-if="polymer.originUrl"
                @click="polymer.originUrl = ''"
              >
                <i class="iconfont icon-shanchu" style="color:#999"></i>
              </div>
            </div>
          </div>
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-flex vi-require">
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
              >
                <span class="vi-font-weight--bold">付款方式</span>
              </div>
              <div
                class="vi-flex--1 vi-padding-right vi-padding-left"
                style="line-height: 44px;"
              >
                <span>
                  {{ polymer.payMode.join(",") }}
                </span>
              </div>
              <div
                style="line-height: 44px;width:80px"
                class="vi-padding-right vi-padding-left vi-text-align--right"
                @click="actionPolymer.show = true"
              >
                <i class="iconfont icon-jiantou"></i>
              </div>
            </div>
          </div>
        </template>
        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="  vi-input is-input--larger is-input--require">
            <div
              style="line-height: 44px;width:80px"
              class="vi-padding-right vi-padding-left vi-text-align--right"
            >
              <span class="vi-font-weight--bold">交易密码</span>
            </div>
            <input
              type="password"
              class=""
              placeholder="请输入您的交易密码"
              v-model="params.password"
            />
            <div
              style="line-height: 43px"
              class="vi-padding-right vi-padding-left"
              v-if="params.password"
              @click="params.password = ''"
            >
              <i class="iconfont icon-shanchu" style="color:#999"></i>
            </div>
          </div>
        </div>

        <div class="vi-margin-top--large">
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--long is-btn--radius is-btn--thiner"
            @click="saveAccount"
          >
            保存
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
