<script>
import { getAccountFix, delAccountFix } from "@/request";
export default {
  name: "vv-account-fix",
  data() {
    return {
      params: {
        type: "",
        id: "",
        list: []
      },
      actionAccount: {
        show: false,
        options: [
          {
            text: "删除",
            value: "delete"
          }
        ]
      },
      confirmAccount: {
        show: false,
        id: "",
        title: "删除固码",
        password: ""
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      let { type, id } = this.$route.query;
      this.params.type = Number(type);
      this.params.id = id;
      console.log(this.params);
      this.getAccountFix();
    },
    getAccountFix() {
      getAccountFix({
        payInfoId: this.params.id
      }).then(({ data }) => {
        if (data.code === 0) {
          this.params.list = data.data.reverse();
        } else this.$message.danger(data.message);
      });
    },
    selectAcount({ id }) {
      this.actionAccount.show = true;
      this.confirmAccount.id = id;
    },
    actionAccountSelect({ text, value }) {
      if (value === "delete") {
        this.confirmAccount.show = true;
      }
    },
    sureHandler() {
      if (!this.confirmAccount.password)
        return this.$message.danger("请输入您的资金密码");
      delAccountFix({
        id: this.confirmAccount.id,
        jyPassword: this.confirmAccount.password
      }).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success(data.message);
          this.confirmAccount.show = false;
          this.confirmAccount.password = "";
          this.init();
        } else this.$message.danger(data.message);
      });
    },
    onNavigationBarTap({ index, text }) {
      if (index === 0 && text === "绑定") {
        this.$router.push("/account-fix-edit?id=" + this.params.id);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="">
    <template>
      <vui-action
        :options="actionAccount.options"
        v-model="actionAccount.show"
        @select="actionAccountSelect"
      >
      </vui-action>
      <vui-confirm v-model="confirmAccount.show" :title="confirmAccount.title">
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="sureHandler"
          >
            确认
          </div>
        </div>
        <div class="vi-flex vi-padding-ad " style="line-height: 44px">
          <div
            style="width: 80px"
            class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
          >
            <span>资金密码</span>
          </div>
          <input
            type="password"
            class="vi-flex-item is-flex--1 vi-input is-input--larger "
            placeholder="请输入您的资金密码"
            v-model="confirmAccount.password"
          />
          <div
            class="vi-padding-ad"
            v-if="confirmAccount.password"
            @click="confirmAccount.password = ''"
          >
            <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
          </div>
        </div>
      </vui-confirm>
    </template>
    <div v-if="params.list.length > 0">
      <div
        class="vi-margin-bottom vi-background"
        v-for="(item, index) in params.list"
        :key="index"
        @click="selectAcount(item)"
      >
        <div class="vi-flex">
          <div class="vi-flex-item is-flex--1 ">
            <div
              class="vi-flex is-align-items--center vi-padding vi-border is-border--bottom is-border--thiner"
            >
              <div class="" style="width: 80px">
                <span
                  class="vi-icon"
                  style="font-size: 24px"
                  v-html="$getAdvertTypes(params.type).icon"
                  :style="{ color: $getAdvertTypes(params.type).color }"
                >
                </span>
              </div>
            </div>
            <div
              class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px"
            >
              <div class="" style="width: 80px">
                <span class="vi-text is-color--light">编号</span>
              </div>
              <div class=" ">
                <span class=" "> {{ item.id }} </span>
              </div>
            </div>
            <div
              class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px"
            >
              <div class="" style="width: 80px">
                <span class="vi-text is-color--light">金额</span>
              </div>
              <div class=" ">
                <span class=" "> ￥ {{ item.fee / 100 || 0 }} </span>
              </div>
            </div>

            <div
              class="vi-flex is-justify-content--space-between vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px"
            >
              <div class="" style="width: 80px">
                <span class="vi-text is-color--light">备注</span>
              </div>
              <div class=" ">
                <span class=" ">
                  {{ item.remark || "--" }}
                </span>
              </div>
            </div>
          </div>
          <div style="width: 150px" class="vi-padding" v-if="item.originUrl">
            <img :src="item.originUrl" alt="" style="max-width: 100%" />
          </div>
        </div>
      </div>
      <div
        v-if="params.list.length > 4"
        class="vi-text is-align--center"
        style="line-height: 44px"
      >
        <span class="vi-text is-color--gray"
          >总共{{ params.list.length }}条固码</span
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
              无固码信息
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
