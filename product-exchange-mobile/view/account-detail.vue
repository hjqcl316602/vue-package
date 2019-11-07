<script>
export default {
  name: "",
  data() {
    return {
      detail: {
        message: {}
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      let advertDetail = localStorage.getItem("account/detail");
      this.detail.message = advertDetail ? JSON.parse(advertDetail) : {};
    },
    handler(type) {
      this.$router.push({
        path: "/confirm",
        query: {
          id: this.detail.message.id,
          handler: type,
          target: "account",
          type: this.detail.message.type,
          checked: this.detail.message.checked,
          name:
            this.detail.message.type === 1
              ? this.detail.message.url
              : this.detail.message.name
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vi-padding--large vv-panel" style="min-height: 100vh">
    <div class="">
      <div class="vi-margin-bottom">
        <div
          class="vi-flex vi-justify-content--space-between vi-margin-bottom"
          style="line-height: 24px"
        >
          <vui-image
            height="28px"
            width="40px"
            fill-type="height"
            align-type="left"
            :src="$getAdvertTypes(detail.message.type).icon"
          >
          </vui-image>
          <span
            :class="{
              'vi-color--danger': detail.message.checked === 1,
              'vi-color--gray': detail.message.checked === 0
            }"
          >
            {{ $getAccountStatusTypes(detail.message.checked).text }}
          </span>
        </div>
        <template v-if="detail.message.type === 1">
          <div
            class="vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray ">卡号</span>
            <span class="">
              {{ detail.message.url }}
            </span>
          </div>
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">
              真实姓名
            </span>
            <span class="vi-color--light">
              {{ detail.message.realName }}
            </span>
          </div>
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray ">
              开户行
            </span>
            <span class="vi-color--light">
              {{ detail.message.name }}
            </span>
          </div>
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray">
              简称
            </span>
            <span class="vi-color--light ">
              {{ detail.message.alipayOrMask || "--" }}
            </span>
          </div>
        </template>
        <template v-if="detail.message.type === 2 || detail.message.type === 4">
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray ">
              账号
            </span>
            <span class="">
              {{ detail.message.name }}
            </span>
          </div>
        </template>
        <template v-if="detail.message.type === 3">
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray  " style="width:80px">
              账号
            </span>
            <span class="vi-color--light">
              {{ detail.message.name }}
            </span>
          </div>
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray  ">
              真实姓名
            </span>
            <span class="vi-color--light">
              {{ detail.message.realName }}
            </span>
          </div>
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray ">
              ID号
            </span>
            <span class="vi-color--light">
              {{ detail.message.alipayOrMask || "--" }}
            </span>
          </div>
        </template>
        <template v-if="detail.message.type === 5">
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray  ">
              账号
            </span>
            <span class=" ">
              {{ detail.message.name }}
            </span>
          </div>
          <div
            class=" vi-flex vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <span class="vi-color--gray ">
              支付方式
            </span>
            <span class="vi-color--light">
              {{ detail.message.alipayOrMask || "--" }}
            </span>
          </div>
        </template>
      </div>
      <template v-if="detail.message.type !== 1">
        <div class="" style="height:50vh;width:100%;">
          <vui-image
            :lazy="false"
            height="100%"
            width="100%"
            fill-type="max"
            align-type="center"
            :src="detail.message.originUrl"
          >
            <div slot="loading">
              <vui-loading-round></vui-loading-round>
            </div>
          </vui-image>
        </div>
      </template>
    </div>
    <div class="vi-margin-top--large vi-text-align--right">
      <div
        class="vi-btn is-btn--primary is-btn--radius   is-btn--hollow is-btn--thiner"
        v-if="detail.message.checked === 0"
        @click="handler('toggle')"
      >
        开启
      </div>
      <div
        class="vi-btn is-btn--warning is-btn--radius   is-btn--hollow is-btn--thiner"
        v-else
        @click="handler('toggle')"
      >
        关闭
      </div>
      <div
        class="vi-btn is-btn--danger is-btn--radius   is-btn--hollow is-btn--thiner"
        v-if="detail.message.checked === 0"
        @click="handler('del')"
      >
        删除
      </div>
    </div>
  </div>
</template>
