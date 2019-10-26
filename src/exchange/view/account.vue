<script>
import { getAccount, deleteAccount } from "../request";

export default {
  name: "vv-account",
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
      this.getAccount();
    },
    getAccount() {
      getAccount().then(res => {
        let data = res["data"];
        if (data.code === 0) {
          let list = data["data"];
          this.params.list = list
            .filter(item => item["checked"] === 1)
            .sort(function(a, b) {
              return a.type - b.type;
            })
            .concat(
              list
                .filter(item => item["checked"] === 0)
                .sort(function(a, b) {
                  return a.type - b.type;
                })
            );
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },

    selectAcount(item) {
      localStorage.setItem("account/detail", JSON.stringify(item));
      this.$router.push("/account-detail");
      //this.detail.show = true;
      //this.detail.message = item;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-account">
    <div v-if="params.list.length > 0" style="padding-bottom: 50px">
      <div
        class="vi-border is-border--bottom is-border--thiner"
        v-for="(item, index) in params.list"
        :key="index"
        @click="selectAcount(item)"
      >
        <div class="vv-panel vi-padding--large">
          <div class="">
            <div class="">
              <div
                class="vi-flex vi-justify-content--space-between vi-margin-bottom "
                style="line-height: 24px"
              >
                <div class="">
                  <vui-image
                    height="28px"
                    width="40px"
                    fill-type="height"
                    align-type="left"
                    :src="$getAdvertTypes(item.type).icon"
                  >
                  </vui-image>
                </div>
                <div class="">
                  <span
                    :class="{
                      'vi-color--danger': item.checked === 1,
                      'vi-color--gray': item.checked === 0
                    }"
                  >
                    {{ $getAccountStatusTypes(item.checked).text }}
                  </span>
                </div>
              </div>
            </div>
            <div class="">
              <template v-if="item.type === 1">
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">卡号</span>
                  <span class=" ">
                    {{ item.url }}
                  </span>
                </div>
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">真实姓名</span>
                  <span class="vi-color--light">{{ item.realName }}</span>
                </div>
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">开户行</span>
                  <span class="vi-color--light">
                    {{ item.name }}
                  </span>
                </div>
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">简称</span>
                  <span class="vi-color--light">
                    {{ item.alipayOrMask || "--" }}
                  </span>
                </div>
              </template>
              <template v-if="item.type === 2 || item.type === 4">
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">账号</span>
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
              </template>
              <template v-if="item.type === 3">
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">账号</span>
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">真实姓名</span>
                  <span class="vi-color--light">{{ item.realName }}</span>
                </div>
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">ID号</span>
                  <span class="vi-color--light">
                    {{ item.alipayOrMask || "--" }}
                  </span>
                </div>
              </template>
              <template v-if="item.type === 5">
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray ">账号</span>
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
                <div
                  class=" vi-flex vi-justify-content--space-between"
                  style="line-height: 28px"
                >
                  <span class="vi-color--gray">支付方式</span>
                  <span class="vi-color--light">
                    {{ item.alipayOrMask || "--" }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
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
            无账号
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
          @click="
            $router.push({ path: '/account-edit', query: { type: 'create' } })
          "
        >
          添加账号
        </div>
      </div>
    </div>
  </div>
</template>
