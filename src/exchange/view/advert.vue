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
      params: {
        pageNo: 1,
        pageSize: 10,
        list: [],
        total: 0,
        load: false
      },
      detail: {
        message: {}
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
      this.params.pageNo = 1;
      this.getAdvertiseAll();
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
    handler(item, type) {
      this.detail.message = item;
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
            id: item.id,
            mode: item.payMode,
            maxLimit: item.maxLimit,
            number: item.number
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
      }).then(res => {
        let data = res.data;
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
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.init();
          this.$message.success(data.message);
        } else {
          this.$message.danger(data.message);
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
  <div class="vv-advert">
    <div class="" style="padding-bottom: 50px" v-if="params.list.length > 0">
      <vui-loadmore @load="loadmore" :can-load="canLoad">
        <div
          class="vv-panel vi-border is-border--bottom is-border--thiner vi-padding--large"
          v-for="(item, index) in params.list"
          :key="index"
        >
          <div>
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
                class=""
                :class="{
                  'vi-color--danger': item.status === 0,
                  'vi-color--gray': item.status === 1
                }"
              >
                {{ $getAdvertStatusTypes(item.status).text }}
              </span>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">剩余数量</span>
              <span class=" vi-color--primary ">
                {{ item.remainAmount }}
              </span>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">类型</span>
              <span class="vi-color--light">
                {{ $getTransactionTypes(item.advertiseType).text }}
              </span>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">数量</span>
              <span class="vi-color--light"> {{ item.number }} </span>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">单价</span>
              <span class="vi-color--light"> {{ item.price }}CNY </span>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">限额</span>
              <span class="vi-color--light">
                {{ item.minLimit }}~{{ item.maxLimit }}CNY
              </span>
            </div>
            <div
              class="vi-flex vi-justify-content--space-between"
              style="line-height: 28px"
            >
              <span class="vi-color--gray">创建时间</span>
              <span class="vi-color--light"> {{ item.createTime }} </span>
            </div>
          </div>
          <div class="vi-margin-top--large vi-text-align--right">
            <template v-if="item.status === 1">
              <template v-if="item.remainAmount > 0">
                <div
                  class="vi-btn is-btn--hollow is-btn--small is-btn--warning is-btn--thiner is-btn--radius "
                  @click="handler(item, 'on')"
                >
                  <span>上架</span>
                </div>
              </template>
              <div
                class="vi-btn is-btn--hollow is-btn--small is-btn--primary is-btn--thiner is-btn--radius "
                @click="handler(item, 'update')"
              >
                <span>修改</span>
              </div>
              <div
                class="vi-btn is-btn--hollow is-btn--small is-btn--danger is-btn--thiner is-btn--radius "
                @click="handler(item, 'del')"
              >
                <span>删除</span>
              </div>
            </template>
            <template v-else>
              <div
                class="vi-btn is-btn--hollow is-btn--small is-btn--warning is-btn--thiner is-btn--radius "
                @click="handler(item, 'off')"
              >
                <span>下架</span>
              </div>
            </template>
          </div>
        </div>
        <div
          slot="footer"
          v-if="params.total > 1 && params.total === params.list.length"
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
            无广告，
            <span
              class="vi-color--primary"
              @click="$router.push({ path: '/advert-edit/create' })"
            >
              去发布
            </span>
          </span>
        </div>
      </div>
    </div>

    <div class="vv-footer">
      <div
        class="vi-btn-group   vv-panel vi-border is-border--top is-border--thiner"
      >
        <div
          class="vi-btn is-btn--long is-btn--primary "
          style="line-height: 50px;height:50px"
          @click="$router.push({ path: '/advert-edit/create' })"
        >
          发布广告
        </div>
      </div>
    </div>
  </div>
</template>
