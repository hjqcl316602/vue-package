<script>
import { getAdvertise } from "@/request/advert";
import { iconHeadNormal } from "@/image";

export default {
  name: "vv-buy",
  data() {
    return {
      icon: {
        headEmpty: iconHeadNormal
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
    <div v-if="params.list.length > 0">
      <vui-loadmore @load="loadmore" :can-load="canLoad">
        <div
          class="vi-background vi-margin-bottom  "
          v-for="(item, index) in params.list"
          :key="index"
        >
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center vi-border is-border--bottom is-border--thiner vi-padding"
          >
            <div class="vv-head is-head--small  ">
              <vui-image
                width="100%"
                height="100%"
                fill-type="min"
                :src="item.avatar"
              >
                <div slot="error" class="vi-cover">
                  <img :src="icon.headEmpty" alt="" class="vi-cover" />
                </div>
              </vui-image>
            </div>
            <div>
              <span
                class="vi-icon"
                :style="{ color: $getAdvertTypes(item.payMode, 'text').color }"
                style="font-size: 24px"
                v-html="$getAdvertTypes(item.payMode, 'text').icon"
              ></span>
            </div>
          </div>
          <div
            class="vi-flex is-justify-content--space-between  vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">剩余数量</span>
            <span>
              <span class="vi-text is-color--primary">
                {{ item.remainAmount | toShousand }}
              </span>
              <span>TTM</span>
            </span>
          </div>

          <div
            class="vi-flex is-justify-content--space-between  vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">单价</span>
            <span>{{ item.price }}CNY</span>
          </div>

          <div
            class="vi-flex is-justify-content--space-between  vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">限额</span>
            <span>
              <span>
                {{ item.minLimit | toShousand }}
              </span>
              ~
              <span> {{ item.maxLimit | toShousand }}CNY </span>
            </span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between  vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">广告主</span>

            <span>
              {{ item.memberName }}
            </span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between  vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">成交量</span>
            <span>
              {{ item.transactions }}
            </span>
          </div>
        </div>
        <div
          slot="footer"
          v-if="params.total > 5 && params.total === params.list.length"
          class="vi-text is-align--center"
          style="line-height: 44px"
        >
          <span class="vi-text is-color--gray"
            >总共{{ this.params.total }}条出售广告</span
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
              无出售广告
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
