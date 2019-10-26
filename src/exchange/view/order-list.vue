<script>
import { getOrder } from "../request/order";
import { mapState } from "vuex";

const statusTypes = [
  { name: "未付款", value: "1" },
  { name: "已付款", value: "2" },
  { name: "已完成", value: "3" },
  { name: "已取消", value: "0" },
  { name: "申诉中", value: "4" }
];
export default {
  name: "vv-order-list",
  data() {
    return {
      options: statusTypes,
      params: {
        pageNo: 0,
        pageSize: 10,
        status: localStorage.getItem("order/tab/type") || "3",
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
    getType(type) {
      return (
        types.find(ele => {
          return ele["text"] === type;
        }) || {}
      );
    },
    getStatus(status) {
      return (
        statusTypes.find(ele => {
          return ele["value"] == status;
        }) || {}
      );
    },
    changeTab(value) {
      localStorage.setItem("order/tab/type", value);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.init();
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
    <div
      class="vv-header vi-border is-border--bottom is-border--thiner vv-panel"
    >
      <vui-tab-group v-model="params.status" :threshold="5" @change="changeTab">
        <vui-tab
          v-for="(item, index) in options"
          :key="index"
          :name="item['value']"
        >
          <div
            class="vv-tab-panel"
            :class="{ 'is-tab--active': item['value'] === params.status }"
          >
            {{ item["name"] }}
          </div>
        </vui-tab>
      </vui-tab-group>
    </div>
    <div style="padding-top: 50px" v-if="params.list.length > 0" ref="wrap">
      <vui-loadmore @load="loadmore" :can-load="canLoad">
        <div
          class="vv-panel vi-padding--large vi-border is-border--bottom is-border--thiner"
          v-for="(item, index) in params.list"
          :key="index"
          @click="selectOrder(item)"
        >
          <div
            class="vi-flex vi-justify-content--space-between vi-margin-bottom"
            style="line-height: 24px"
          >
            <vui-image
              height="24px"
              width="40px"
              fill-type="height"
              align-type="left"
              :src="$getAdvertTypes(item.payMode, 'text').icon"
            >
            </vui-image>
            <span
              class="vi-color--primary vi-font-size--large vi-font-weight--bold"
            >
              {{ item.money }}
            </span>
          </div>

          <div
            class="vi-flex  vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div class="vi-padding-right--large vi-text-align--right ">
              <span class="vi-color--gray">
                订单号
              </span>
            </div>
            <div class=" ">
              <span class="vi-color--light">
                {{ item.orderSn }}
              </span>
            </div>
          </div>

          <div
            class="vi-flex  vi-justify-content--space-between"
            style="line-height: 28px"
            v-if="item.unit"
          >
            <div class="vi-padding-right--large vi-text-align--right ">
              <span class="vi-color--gray">
                币种
              </span>
            </div>
            <div class="">
              <span class="vi-color--light">
                {{ item.unit }}
              </span>
            </div>
          </div>

          <div
            class="vi-flex  vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div class="vi-padding-right--large vi-text-align--right ">
              <span class="vi-color--gray">
                交易对象
              </span>
            </div>
            <div class=" ">
              <span class="vi-color--light">
                {{ item.name }}
              </span>
            </div>
          </div>

          <div
            class="vi-flex  vi-justify-content--space-between"
            style="line-height: 28px"
            v-if="item.amount"
          >
            <div class="vi-padding-right--large vi-text-align--right ">
              <span class="vi-color--gray">
                数量
              </span>
            </div>
            <div class=" ">
              <span class="vi-color--light">
                {{ item.amount }}
              </span>
            </div>
          </div>

          <div
            class="vi-flex  vi-justify-content--space-between"
            style="line-height: 28px"
            v-if="item.price"
          >
            <div class="vi-padding-right--large vi-text-align--right ">
              <span class="vi-color--gray">
                单价
              </span>
            </div>
            <div class="vi-color--light ">
              <span class=""> {{ item.price }} CNY </span>
            </div>
          </div>

          <div
            class="vi-flex  vi-justify-content--space-between"
            style="line-height: 28px"
          >
            <div class="vi-padding-right--large vi-text-align--right ">
              <span class="vi-color--gray">
                时间
              </span>
            </div>
            <div class=" ">
              <span class="vi-color--light">
                {{ item.createTime }}
              </span>
            </div>
          </div>

          <div
            class="vi-flex  vi-justify-content--space-between"
            style="line-height: 28px"
            v-if="item.payRemark"
          >
            <div class="vi-padding-right--large vi-text-align--right ">
              <span class="vi-color--gray">
                备注
              </span>
            </div>
            <div class=" ">
              <span class="vi-color--light">
                {{ item.payRemark }}
              </span>
            </div>
          </div>
        </div>
      </vui-loadmore>
    </div>

    <div
      class="vi-padding--large vi-center"
      style="height: 100vh;padding-bottom: 50px"
      v-else
    >
      <div class="vi-text-align--center">
        <div class="vi-margin-bottom">
          <i
            class="iconfont icon-meiyoudingdan-01 vi-color--gray vi-font-size--large"
          ></i>
        </div>
        <div>
          <span class="vi-color--gray">
            无{{ getStatus(this.params.status).name }}订单
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
