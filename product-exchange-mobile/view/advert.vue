<script>
import {
  getAdvertiseAll,
  onAdvertise,
  offAdvertise,
  deleteAdvertise
} from "@/request/advert";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      params: {
        pageNo: 1,
        pageSize: 10,
        list: [],
        total: 0,
        load: false
      },
      detail: {
        message: {}
      },
      actionAdvert: {
        show: false,
        options: []
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
    ...mapMutations({
      setPageCache: "set/page/cache",
      setPageAdvertType: "set/page/advertType"
    }),
    init() {
      this.params.pageNo = 1;
      this.getAdvertiseAll();
      this.setPageCache("advert");
    },
    getAdvertiseAll(more = false) {
      if (this.params.load) return false;
      this.params.load = true;
      getAdvertiseAll({
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize
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
            this.params.list = this.params.list.sort((a, b) => {
              return a.status - b.status;
            });
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

    loadmore() {
      this.params.pageNo++;
      this.getAdvertiseAll(true);
    },
    selectAdvert(picker) {
      this.detail.message = picker;
      this.actionAdvert.show = true;
      if (picker.status === 0) {
        this.actionAdvert.options = [{ text: "下架广告", value: "off" }];
      } else {
        if (!picker.remainAmount) {
          this.actionAdvert.options = [
            { text: "修改广告", value: "update" },
            { text: "删除广告", value: "del" }
          ];
        } else {
          this.actionAdvert.options = [
            { text: "上架广告", value: "on" },
            { text: "修改广告", value: "update" },
            { text: "删除广告", value: "del" }
          ];
        }
      }
    },
    actionAdvertSelect({ text, value }) {
      if (value === "on") {
        this.onAdvertise();
      } else if (value === "off") {
        this.offAdvertise();
      } else if (value === "del") {
        this.deleteAdvertise();
      } else if (value === "update") {
        let {
          id,
          payMode,
          maxLimit,
          number,
          advertiseType
        } = this.detail.message;
        this.$router.push({
          path: "/advert-edit/update",
          query: { id, payMode, maxLimit, number, advertiseType }
        });
      }
    },
    onAdvertise() {
      onAdvertise({
        id: this.detail.message.id
      }).then(({ data }) => {
        if (data.code === 0) {
          this.init();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    offAdvertise() {
      offAdvertise({
        id: this.detail.message.id
      }).then(({ data }) => {
        if (data.code === 0) {
          this.init();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    deleteAdvertise() {
      deleteAdvertise({
        id: this.detail.message.id
      }).then(({ data }) => {
        if (data.code === 0) {
          this.init();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    onNavigationBarTap({ index, text }) {
      if (index === 0 && text === "发布") {
        this.$router.push("/advert-edit/create");
      }
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-advert">
    <template>
      <vui-action
        :options="actionAdvert.options"
        v-model="actionAdvert.show"
        @select="actionAdvertSelect"
      ></vui-action>
    </template>
    <div class="" v-if="params.list.length > 0">
      <vui-loadmore @load="loadmore" :can-load="canLoad">
        <div
          class="vi-background vi-margin-bottom"
          v-for="(item, index) in params.list"
          :key="index"
          @click="selectAdvert(item)"
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
              <span class="vi-text is-color--danger" v-if="item.status === 0">
                已上架
              </span>
              <span class="vi-text is-color--gray" v-else>待上架</span>
            </span>
          </div>

          <div
            class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">剩余数量 | TTM</span>
            <span>
              <span class="vi-text is-color--primary">
                {{ item.remainAmount }}
              </span>
            </span>
          </div>

          <div
            class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">数量 | TTM </span>
            <span>
              <span> {{ item.number }} </span>
            </span>
          </div>

          <div
            class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">类型</span>
            <span
              class="vi-text "
              :class="{
                'is-color--warning': item.advertiseType === 0,
                'is-color--danger': item.advertiseType === 1
              }"
            >
              {{ $getTransactionTypes(item.advertiseType).text }}
            </span>
          </div>

          <div
            class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">单价 | CNY</span>
            <span> {{ item.price }} </span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">限额 | CNY</span>
            <span> {{ item.minLimit }}~{{ item.maxLimit }} </span>
          </div>
          <div
            class="vi-flex is-justify-content--space-between  vi-padding-ad vi-border is-border--bottom is-border--thiner"
            style="line-height: 36px"
          >
            <span class="vi-text is-color--light">创建时间</span>
            <span class="">
              {{ item.createTime }}
            </span>
          </div>
        </div>
        <div
          slot="footer"
          v-if="params.total > 1 && params.total === params.list.length"
          class="vi-text is-align--center"
          style="line-height: 44px"
        >
          <span class="vi-text is-color--gray"
            >总共{{ this.params.total }}条广告</span
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
              无广告信息
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
