<script>
import { getAdvertise } from "../request/advert";
import {
  iconHeadNormal,
  iconAli,
  iconWx,
  iconUnion,
  iconCard,
  iconPolymer
} from "../image";

let types = [
  {
    text: "银联",
    icon: iconCard,
    value: 1
  },
  {
    text: "微信",
    icon: iconWx,
    value: 2
  },
  {
    text: "支付宝",
    icon: iconAli,
    value: 3
  },
  {
    text: "云闪付",
    icon: iconUnion,
    value: 4
  },
  {
    text: "聚合码",
    icon: iconPolymer,
    value: 5
  }
];

export default {
  name: "vv-home",
  data() {
    return {
      icon: {
        headEmpty: iconHeadNormal,
        ali: iconAli,
        wx: iconWx,
        union: iconUnion,
        card: iconCard,
        polymer: iconPolymer
      },
      params: {
        pageNo: 1,
        pageSize: 10,
        advertiseType: 1,
        unit: "ttm",
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
    getAdvertise(more = false) {
      if (this.params.load) return false;
      this.params.load = true;
      getAdvertise({
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
        advertiseType: this.params.advertiseType,
        unit: this.params.unit
      })
        .then(res => {
          let data = res["data"];
          if (data["code"] === 0) {
            if (more) {
              this.params.list = this.params.list.concat(
                data["data"]["context"]
              );
            } else {
              this.params.list = data["data"]["context"];
            }
            this.params.total = data["data"]["totalElement"];
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
    loadmore() {
      this.params.pageNo++;
      this.getAdvertise(true);
    },
    getType(type) {
      return (
        types.find(ele => {
          return ele["text"] === type;
        }) || {}
      );
    }
  },
  mounted() {
    this.getAdvertise();
  }
};
</script>

<template>
  <div class="vv-home">
    <div v-if="params.list.length > 0" style="padding-bottom: 50px">
      <vui-loadmore @load="loadmore" :can-load="canLoad">
        <div
          class="vv-panel vi-padding--large vi-border is-border--bottom is-border--thiner"
          v-for="(item, index) in params.list"
          :key="index"
        >
          <div
            class="vi-flex vi-justify-content--space-between vi-align-items--center vi-margin-bottom--large"
          >
            <div class="vi-flex vi-align-items--center">
              <div class="vv-head vi-margin-right">
                <vui-image
                  width="100%"
                  height="100%"
                  fill-type="min"
                  :src="item.avatar"
                >
                  <div slot="error">
                    <img :src="icon.headEmpty" alt="" class="vi-cover" />
                  </div>
                </vui-image>
              </div>
              <span class="vi-font-size--medium">{{ item["memberName"] }}</span>
            </div>
            <div>
              <vui-image
                height="20px"
                width="40px"
                fill-type="height"
                align-type="right"
                :src="getType(item['payMode'])['icon']"
              >
              </vui-image>
            </div>
          </div>
          <div>
            <div
              class="  vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">成交量</span>
              <span class="vi-color--light">
                {{ item["transactions"] }}
              </span>
            </div>
            <div
              class=" vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">单价</span>
              <span class="vi-color--light"> {{ item["price"] }}CNY </span>
            </div>
            <div
              class=" vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">限额</span>
              <span class="vi-color--light">
                <span>
                  {{ item.minLimit }}
                </span>
                ~
                <span> {{ item["maxLimit"] }}CNY </span>
              </span>
            </div>

            <div
              class=" vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">剩余数量</span>
              <span class="vi-color--primary vi-font-weight--bold">
                {{ item["remainAmount"] }}
              </span>
            </div>
          </div>
        </div>
        <div
          slot="footer"
          v-if="params.total > 5 && params.total === params.list.length"
          class="vi-padding--large vi-text-align--center"
        >
          <span class="vi-color--gray">总共{{ this.params.total }}条广告</span>
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
            无买入广告
          </span>
        </div>
      </div>
    </div>

    <div class="vv-footer vi-border is-border--top is-border--thiner">
      <div class="vv-tabbar is-tabbar--white">
        <div class="vv-tabbar-child is-tabbar--active">
          <i class="iconfont icon-mairu vv-tabbar-icon"></i>
          <span class="vv-tabbar-text">买入</span>
        </div>
        <div class="vv-tabbar-child" @click="$router.replace('/sell')">
          <i class="iconfont icon-maichu vv-tabbar-icon"></i>
          <span class="vv-tabbar-text">卖出</span>
        </div>
        <div class="vv-tabbar-child" @click="$router.replace('/user')">
          <i class="iconfont icon-wode1 vv-tabbar-icon"></i>
          <span class="vv-tabbar-text">我的</span>
        </div>
      </div>
    </div>
  </div>
</template>
