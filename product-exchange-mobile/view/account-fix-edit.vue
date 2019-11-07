<script>
import { uploadQrImage } from "@/request/upload";
import { getAccountRemark } from "@/request";
import { createAccountFix } from "../request";
export default {
  name: "vv-account-fix-edit",
  data() {
    return {
      params: {
        payInfoId: "",
        number: "",
        url: "",
        originUrl: "",
        password: "",
        remark: ""
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      let { id } = this.$route.query;
      this.params.payInfoId = id;
    },
    getAccountRemark() {
      getAccountRemark({
        payInfoId: this.params.payInfoId
      }).then(({ data }) => {
        if (data.code === 0) {
          this.params.remark = data.data ? data.data.remark : "";
        } else this.$message.danger(data.message);
      });
    },
    createAccountFix() {
      if (!this.params.number)
        return this.$message.danger("请输入您的收款金额");
      if (!this.params.remark) return this.$message.danger("请获取备注");
      if (!this.params.originUrl) return this.$message.danger("请上传收款码");
      if (!this.params.password)
        return this.$message.danger("请输入您的资金密码");
      createAccountFix({
        payInfoId: this.params.payInfoId,
        remark: this.params.remark,
        fee: this.params.number * 100,
        codeUrl: this.params.url,
        originUrl: this.params.originUrl,
        jyPassword: this.params.password
      }).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else this.$message.danger(data.message);
      });
    },
    beforeUpload(value) {
      uploadQrImage(value).then(({ data }) => {
        if (data.code === "000") {
          let message = data.data || {};
          if (message.qr && message.url) {
            this.params.url = message.qr;
            this.params.originUrl = message.url;
            this.$message.success("成功解析并上传");
          } else {
            this.params.url = "";
            this.params.originUrl = "";
            this.$message.danger("解析或上传失败");
          }
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    upload(e) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      e.target.value = "";
      this.beforeUpload(formData);
    },
    onNavigationBarTap({ index, text }) {
      if (index === 0 && text === "保存") {
        this.createAccountFix();
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vi-background">
    <div class="vi-border is-border--bottom is-border--thiner">
      <div class="vi-flex vi-padding-ad" style="line-height: 44px;">
        <div
          style="width:80px"
          class="vi-text is-align--right vi-tag is-tag--require"
        >
          <span class="">收款金额</span>
        </div>
        <input
          type="number"
          class="vi-input is-input--larger"
          placeholder="请输入您的收款金额"
          v-model="params.number"
        />
        <div
          class="vi-padding-ad"
          v-if="params.number"
          @click="params.number = ''"
        >
          <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
        </div>
      </div>
    </div>
    <div class="vi-border is-border--bottom is-border--thiner">
      <div
        class="vi-flex is-align-items--center vi-padding-ad"
        style="line-height: 44px;"
      >
        <div
          style="width:80px"
          class="vi-text is-align--right vi-tag is-tag--require"
        >
          <span class="">备注</span>
        </div>
        <input
          type="number"
          readonly=""
          class="vi-input is-input--larger"
          placeholder="请获取备注"
          v-model="params.remark"
        />
        <div
          class="vi-padding-ad"
          v-if="params.remark"
          @click="params.remark = ''"
        >
          <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
        </div>
        <div
          class="vi-btn is-btn--hollow is-btn--primary is-btn--smaller is-btn--radius is-btn--thiner"
          @click="getAccountRemark"
        >
          获取
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
                  :src="params.originUrl"
                  alt=""
                  v-if="params.originUrl"
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
</template>
