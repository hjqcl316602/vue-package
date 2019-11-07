<script>
export default {
  name: "vv-order-custom",
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<template>
  <div class="vv-order-custom">
    <div
      class="vv-panel vi-padding--large vi-border is-border--bottom is-border--thiner"
      v-for="item in 10"
    >
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            支付方式
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            支付宝
          </span>
        </div>
      </div>
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            订单号
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            tn20190921896880
          </span>
        </div>
      </div>
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            渠道编号
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            tn20190921896880
          </span>
        </div>
      </div>
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            用户编号
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            tn20190921896880
          </span>
        </div>
      </div>
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            币种
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            ttm
          </span>
        </div>
      </div>

      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            交易类型
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            卖出
          </span>
        </div>
      </div>
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            交易对象
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            daniu_andy
          </span>
        </div>
      </div>

      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            数量
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            1000
          </span>
        </div>
      </div>
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            金额
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            1000
          </span>
        </div>
      </div>
      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            手续费
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            0
          </span>
        </div>
      </div>

      <div class="vi-flex vi-margin-bottom ">
        <div
          class="vi-padding-right--large vi-text-align--right "
          style="width:80px"
        >
          <span class="vi-color--gray">
            备注
          </span>
        </div>
        <div class="vi-flex--1">
          <span class="">
            10000
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
