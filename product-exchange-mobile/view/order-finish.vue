<script>
import { getOrder } from "@/request/order";
import { mapState } from "vuex";

export default {
  name: "vv-order-finish",
  data() {
    return {
      params: {
        pageNo: 0,
        pageSize: 10,
        status: 3,
        list: [],
        total: 0,
        load: false
      }
    };
  },
  props: {},
  computed: {
    canLoad() {
      return !this.params.load && this.params.list.length !== this.params.total;
    }
  },
  methods: {
    init() {
      this.params.pageNo = 0;
      this.getOrder(false);
    },
    loadmore() {
      this.params.pageNo++;
      this.getOrder(true);
    },
    getOrder(more = false) {
      if (this.params.load) return false;
      this.params.load = true;
      getOrder({
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
        status: this.params.status
      })
        .then(res => {
          let data = res["data"];
          if (data["code"] === 0) {
            if (more) {
              this.params.list = this.params.list.concat(
                data["data"]["content"]
              );
            } else {
              this.params.list = data["data"]["content"];
            }
            this.params.total = data["data"]["totalElements"];
            console.log(this.params.total, this.params.list.length);
          }
          this.params.load = false;
        })
        .catch(err => {
          if (more) {
            this.params.pageNo--;
          }
          this.params.load = false;
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
      <vui-loadmore @load="loadmore" :can-load="canLoad">
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
              <span class="vi-text is-color--primary">
                {{ item.money | toShousand }}
              </span>
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
              <span>{{ item.unit }}</span>
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
          v-if="params.total > 4 && params.total === params.list.length"
          class="vi-text is-align--center"
          style="line-height: 44px"
        >
          <span class="vi-text is-color--gray"
            >总共{{ this.params.total }}条已完成订单</span
          >
        </div>
      </vui-loadmore>
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
              无已完成订单
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
