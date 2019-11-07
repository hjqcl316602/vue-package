<script>
import { getPayConfirmOrder } from "@/request/order";
import { mapState } from "vuex";

export default {
  name: "vv-order-hand",
  data() {
    return {
      params: {
        list: []
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.getPayConfirmOrder();
    },
    getPayConfirmOrder() {
      getPayConfirmOrder().then(({ data }) => {
        if (data.code === 0) {
          this.params.list = data["data"];
        } else this.$message.danger(data.message);
      });
    },
    selectOrder(item) {
      this.$router.push({
        path: "/order-detail",
        query: {
          orderSn: item.orderSn,
          type: "order-list"
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
  <div class="">
    <div v-if="params.list.length > 0" ref="wrap">
      <div
        class="vi-background vi-margin-bottom"
        v-for="(item, index) in params.list"
        :key="index"
        @click="selectOrder(item)"
      >
        <div
          class="vi-flex is-justify-content--space-between is-align-items--center vi-padding vi-border is-border--bottom is-border--thiner"
        >
          <span
            class="vi-icon"
            :style="{ color: $getAdvertTypes(item.payMode, 'text').color }"
            style="font-size: 24px"
            v-html="$getAdvertTypes(item.payMode, 'text').icon"
          ></span>
          <span>
            <span class="vi-text is-color--primary"> {{ item.money }} </span>
            <span>CNY</span>
          </span>
        </div>

        <div
          class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">订单号</span>
          <span class="">
            {{ item.orderSn }}
          </span>
        </div>
        <div
          class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">币种</span>
          <span class="">
            {{ item.unit }}
          </span>
        </div>

        <div
          class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">数量</span>
          <span>
            <span class="vi-text is-color--warning">
              {{ item.amount | toShousand }}
            </span>
            <span>{{ item.unit }} </span>
          </span>
        </div>
        <div
          class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">交易对象</span>
          <span class="">
            {{ item.name }}
          </span>
        </div>
        <div
          class="vi-flex is-justify-content--space-between is-align-items--center vi-padding-ad vi-border is-border--bottom is-border--thiner"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">时间</span>
          <span class="">
            {{ item.createTime }}
          </span>
        </div>
      </div>
      <div
        slot="footer"
        v-if="params.total > 4"
        class="vi-text is-align--center"
        style="line-height: 44px"
      >
        <span class="vi-text is-color--gray"
          >总共{{ this.params.total }}条未完成订单</span
        >
      </div>
    </div>

    <template v-else>
      <div
        class="vi-flex is-justify-content--center is-align-items--center"
        style="height: 300px"
      >
        <div class="vi-text is-align--center">
          <div class="vi-margin-bottom">
            <span class="vi-icon vi-text is-color--gray">&#xe618;</span>
          </div>
          <div>
            <span class="vi-text is-color--gray">
              无未完成订单
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
