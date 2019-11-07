<script>
import { getCardDetail, createAccount } from "../request";
import { uploadQrImage } from "../request/upload";
import funner from "../../package/es/funer";
import { qrAlipay } from "../image";

export default {
  name: "",
  data() {
    return {
      image: {
        alipay:
          "http://103.60.109.80/upload/164835e3-555f-4e42-9e9a-f6dbd7d1ae17.png"
      },
      params: {
        mode: 5,
        password: ""
      },
      action: {
        show: false,
        options: this.$advertTypes
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
      },
      dynamic: {
        name: ""
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
      } else if (this.params.mode === 6) {
        if (!this.dynamic.name) {
          this.$message.danger("请输入您的动态码账号");
          return false;
        }
        params = {
          name: this.dynamic.name
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
    onNavigationBarTap({ index, text }) {
      if (index === 0 && text === "保存") {
        this.saveAccount();
      }
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
      uploadQrImage(value).then(({ data }) => {
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
    },
    upload(e, type) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      e.target.value = "";
      this.beforeUpload(formData, type);
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
  <div class="">
    <vui-action
      :options="action.options"
      v-model="action.show"
      @select="selectAction"
    >
    </vui-action>
    <vui-action
      :options="actionPolymer.options"
      v-model="actionPolymer.show"
      @select="selectActionPolyer"
    >
    </vui-action>
    <div class="">
      <div class="vi-background vi-margin-bottom">
        <div
          class="vi-border is-border--bottom is-border--thiner "
          @click="action.show = true"
          style="line-height: 44px;"
        >
          <div class="vi-flex vi-padding-ad">
            <div style=";width:80px" class="vi-text is-align--right">
              <span class="vi-text">类型</span>
            </div>
            <div class="vi-flex-item is-flex--1 vi-padding-ad">
              <div class="vi-flex is-justify-content--space-between">
                <span>
                  {{ $getAdvertTypes(params.mode).text }}
                </span>
                <span class=" vi-icon">&#xe61f;</span>
              </div>
            </div>
          </div>
        </div>

        <template v-if="params.mode === 1">
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
                v-model="card.realName"
              />
              <div
                class="vi-padding-ad"
                v-if="card.realName"
                @click="card.realName = ''"
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
                v-model="card.url"
              />
              <div class="vi-padding-ad" v-if="card.url" @click="card.url = ''">
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
                <span class="">确认卡号</span>
              </div>
              <input
                type="tel"
                class="vi-input is-input--larger"
                placeholder="请再次输入您的卡号"
                v-model="card.reUrl"
              />
              <div
                class="vi-padding-ad"
                v-if="card.reUrl"
                @click="card.reUrl = ''"
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
              <div class="vi-padding-ad">
                <span>{{ card.name }}</span>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.mode === 2">
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
                v-model="wx.name"
              />
              <div class="vi-padding-ad" v-if="wx.name" @click="wx.name = ''">
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
                        :src="wx.originUrl"
                        alt=""
                        v-if="wx.originUrl"
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
        <template v-if="params.mode === 3">
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
                v-model="alipay.name"
              />
              <div
                class="vi-padding-ad"
                v-if="alipay.name"
                @click="alipay.name = ''"
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
                v-model="alipay.realName"
              />
              <div
                class="vi-padding-ad"
                v-if="alipay.realName"
                @click="alipay.realName = ''"
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
                      @change="e => upload(e, 'alipay')"
                    />
                    <div class="vi-text is-align--center">
                      <img
                        :src="alipay.originUrl"
                        alt=""
                        v-if="alipay.originUrl"
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

          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
              <div
                style="width:80px"
                class="vi-text is-align--right vi-tag is-tag--require"
              >
                <span class="">ID号</span>
              </div>
              <input
                type="text"
                class="vi-input is-input--larger"
                placeholder="请输入您的支付宝ID号"
                v-model="alipay.userId"
              />
              <div
                class="vi-padding-ad"
                v-if="alipay.userId"
                @click="alipay.userId = ''"
              >
                <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
              </div>
            </div>
          </div>
          <div class="vi-padding">
            <div class="vi-margin-bottom">
              <div style="line-height: 24px;text-indent: 24px">
                <span class="vi-text is-color--danger"
                  >步骤一：保存至相册：长按图片保存至相册，如若保存失败，截屏即可</span
                >
              </div>
              <div style="line-height: 24px;text-indent: 24px">
                <span class="vi-text is-color--danger"
                  >步骤二：扫一扫：打开支付宝APP选择扫一扫，从本地相册中选择该图片进行扫码</span
                >
              </div>
              <div style="line-height: 24px;text-indent: 24px">
                <span class="vi-text is-color--danger"
                  >步骤三：输入：得到的结果填入到上方输入框中</span
                >
              </div>
              <div style="line-height: 24px;text-indent: 24px">
                <span class="vi-text is-color--danger"
                  >温馨提示：确保输入的支付宝ID准确无误，否则导致收款失败</span
                >
              </div>
            </div>
            <div class="vi-text is-align--center">
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
                v-model="unionpay.name"
              />
              <div
                class="vi-padding-ad"
                v-if="unionpay.name"
                @click="unionpay.name = ''"
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
                      @change="e => upload(e, 'unionpay')"
                    />
                    <div class="vi-text is-align--center">
                      <img
                        :src="unionpay.originUrl"
                        alt=""
                        v-if="unionpay.originUrl"
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
        <template v-if="params.mode === 5">
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
                placeholder="请输入您的聚合码账号"
                v-model="polymer.name"
              />
              <div
                class="vi-padding-ad"
                v-if="polymer.name"
                @click="polymer.name = ''"
              >
                <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
              </div>
            </div>
          </div>
          <div
            class="vi-border is-border--bottom is-border--thiner "
            @click="actionPolymer.show = true"
            style="line-height: 44px;"
          >
            <div class="vi-flex vi-padding-ad">
              <div style=";width:80px" class="vi-text is-align--right">
                <span class="vi-text">支付方式</span>
              </div>
              <div class="vi-flex-item is-flex--1 vi-padding-ad">
                <div class="vi-flex is-justify-content--space-between">
                  <span>
                    {{ polymer.payMode.join("+") }}
                  </span>
                  <span class=" vi-icon">&#xe61f;</span>
                </div>
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
                  <label for="upload-5" class="vi-upload">
                    <input
                      type="file"
                      id="upload-5"
                      accept="image/*"
                      @change="e => upload(e, 'polymer')"
                    />
                    <div class="vi-text is-align--center">
                      <img
                        :src="polymer.originUrl"
                        alt=""
                        v-if="polymer.originUrl"
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
        <template v-if="params.mode === 6">
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
                placeholder="请输入您的动态码账号"
                v-model="dynamic.name"
              />
              <div
                class="vi-padding-ad"
                v-if="dynamic.name"
                @click="dynamic.name = ''"
              >
                <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
              </div>
            </div>
          </div>
        </template>

        <div class="vi-border is-border--bottom is-border--thiner">
          <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
            <div
              style="width:80px"
              class="vi-text is-align--right vi-tag is-tag--require"
            >
              <span class="">资金密码</span>
            </div>
            <input
              type="password"
              class="vi-input is-input--larger"
              placeholder="请输入您的资金密码"
              v-model="params.password"
            />
            <div
              class="vi-padding-ad"
              v-if="params.password"
              @click="params.password = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
