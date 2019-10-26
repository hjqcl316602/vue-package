<script>
import {
  getAdvertiseAll,
  onAdvertise,
  offAdvertise,
  deleteAdvertise
} from "../request/advert";
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
      let advertDetail = localStorage.getItem("advert-detail");
      this.detail.message = advertDetail ? JSON.parse(advertDetail) : {};
    },
    handler(type) {
      if (type === "on") {
        this.onAdvertise();
      } else if (type === "off") {
        this.offAdvertise();
      } else if (type === "del") {
        this.deleteAdvertise();
      } else if (type === "update") {
        this.$router.push({
          path: "/advert-edit/update",
          query: {
            id: this.detail.message.id,
            mode: this.detail.message.payMode,
            maxLimit: this.detail.message.maxLimit,
            number: this.detail.message.number
          }
        });
      }
    },
    onAdvertise() {
      onAdvertise({
        id: this.detail.message.id
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.back();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    offAdvertise() {
      offAdvertise({
        id: this.detail.message.id
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.back();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    deleteAdvertise() {
      deleteAdvertise({
        id: this.detail.message.id
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.back();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    back() {
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-panel vi-padding--large" style="min-height: 100vh">
    <div class="">
      <div
        class="vi-flex vi-justify-content--space-between"
        style="line-height: 36px"
      >
        <vui-image
          height="24px"
          width="40px"
          fill-type="height"
          align-type="left"
          :src="$getAdvertTypes(detail.message.payMode, 'text').icon"
        >
        </vui-image>
        <span
          class=" vi-font-weight--bold"
          :class="{
            'vi-color--danger': detail.message.status === 0,
            'vi-color--gray': detail.message.status === 1
          }"
        >
          {{ $getAdvertStatusTypes(detail.message.status).text }}
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray">
          剩余数量
        </span>
        <span class="vi-color--primary">
          {{ detail.message.remainAmount }}
        </span>
      </div>

      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray  ">
          支付方式
        </span>
        <span class="  vi-color--light ">
          {{ detail.message.payMode }}
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          类型
        </span>
        <span class="vi-color--light  ">
          {{ $getTransactionTypes(detail.message.advertiseType).text }}
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          币种
        </span>
        <span class=" vi-color--light  ">
          {{ detail.message.coin ? detail.message.coin.name : "--" }}
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          数量
        </span>
        <span class=" vi-color--light  ">
          {{ detail.message.number }}
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          单价
        </span>
        <span class=" vi-color--light  "> {{ detail.message.price }}CNY </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          限额
        </span>
        <span class=" vi-color--light  ">
          {{ detail.message.minLimit }}~{{ detail.message.maxLimit }}CNY
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          创建时间
        </span>
        <span class="  vi-color--light ">
          {{ detail.message.createTime }}
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          更新时间
        </span>
        <span class="  vi-color--light ">
          {{ detail.message.updateTime }}
        </span>
      </div>
      <div
        class=" vi-flex vi-justify-content--space-between"
        style="line-height: 28px"
      >
        <span class="vi-color--gray ">
          编号
        </span>
        <span class=" vi-color--light  ">
          {{ detail.message.id }}
        </span>
      </div>
    </div>
    <div class="vi-margin-top--large vi-text-align--right">
      <template v-if="detail.message.status === 1">
        <template v-if="detail.message.remainAmount > 0">
          <div
            class="vi-btn is-btn--hollow is-btn--warning is-btn--thiner is-btn--radius "
            @click="handler('on')"
          >
            <span>上架</span>
          </div>
        </template>
        <div
          class="vi-btn is-btn--hollow is-btn--primary is-btn--thiner is-btn--radius "
          @click="handler('update')"
        >
          <span>修改</span>
        </div>
        <div
          class="vi-btn is-btn--hollow is-btn--danger is-btn--thiner is-btn--radius "
          @click="handler('del')"
        >
          <span>删除</span>
        </div>
      </template>
      <template v-else>
        <div
          class="vi-btn is-btn--hollow is-btn--warning is-btn--thiner is-btn--radius "
          @click="handler('off')"
        >
          <span>下架</span>
        </div>
      </template>
    </div>
  </div>
</template>
