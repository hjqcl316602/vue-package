<script>
import { getAccount, deleteAccount, toggleAccount } from "../request";
import { mapMutations } from "vuex";
export default {
  name: "vv-account",
  data() {
    return {
      params: {
        list: [],
        type: ""
      },
      actionAccount: {
        show: false,
        options: []
      },
      confirmAccount: {
        show: false,
        title: "",
        id: "",
        checked: "",
        type: "",
        password: "",
        handler: ""
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    ...mapMutations({
      setPageCache: "set/page/cache",
      setPageAdvertType: "set/page/advertType"
    }),
    init() {
      this.params.type = this.$route.query.type || "normal";
      this.setPageCache("account");
      this.getAccount();
    },
    getAccount() {
      getAccount().then(({ data }) => {
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
    onNavigationBarTap({ index, text }) {
      if (index === 0 && text === "绑定") {
        this.$router.push("/account-edit");
      }
    },
    actionAccountSelect({ type, text, value }) {
      if (type === "confirm") {
        this.confirmAccount.show = true;
        this.confirmAccount.title = text;
        this.confirmAccount.handler = value;
      } else if (type === "jump") {
        if (value === "fix") {
          this.$router.push(
            "/account-fix?type=" +
              this.confirmAccount.type +
              "&id=" +
              this.confirmAccount.id
          );
        }
      }
    },

    sureHandler() {
      if (!this.confirmAccount.password) {
        this.$message.danger("请输入您的资金密码");
        return false;
      }
      if (this.confirmAccount.handler === "delete") {
        deleteAccount({
          id: this.confirmAccount.id,
          jyPassword: this.confirmAccount.password
        }).then(res => {
          let data = res["data"];
          if (data.code === 0) {
            this.$message.success("账号删除成功");
            this.confirmAccount.show = false;
            this.confirmAccount.password = "";
            this.confirmAccount.id = "";
            this.init();
          } else {
            this.$message.danger(data.message);
          }
        });
      } else {
        toggleAccount({
          id: this.confirmAccount.id,
          jyPassword: this.confirmAccount.password,
          checked: Math.abs(this.confirmAccount.checked - 1),
          type: this.confirmAccount.type
        }).then(res => {
          let data = res["data"];
          if (data.code === 0) {
            this.$message.success("账号切换成功");
            this.confirmAccount.show = false;
            this.confirmAccount.password = "";
            this.confirmAccount.id = "";
            this.confirmAccount.checked = "";
            this.confirmAccount.type = "";
            this.init();
          } else {
            this.$message.danger(data.message);
          }
        });
      }
    },

    selectAcount({ checked, id, type }) {
      this.confirmAccount.checked = checked;
      this.confirmAccount.id = id;
      this.confirmAccount.type = type;
      this.actionAccount.options = [];
      if (checked === 1) {
        if (this.params.type === "pick") {
          this.setPageAdvertType(type);
          this.$router.go(-1);
        } else {
          this.actionAccount.show = true;
          this.actionAccount.options.push({
            text: "关闭账号",
            value: "close",
            type: "confirm"
          });
        }
      } else {
        this.actionAccount.show = true;
        this.actionAccount.options.push({
          text: "开启账号",
          value: "open",
          type: "confirm"
        });
        this.actionAccount.options.push({
          text: "删除账号",
          value: "delete",
          type: "confirm"
        });
      }
      if ([2, 3, 4, 5].includes(type)) {
        this.actionAccount.options.push({
          text: "固码管理",
          value: "fix",
          type: "jump"
        });
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-account">
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
                  v-html="$getAdvertTypes(item.type).icon"
                  :style="{ color: $getAdvertTypes(item.type).color }"
                >
                </span>
              </div>
              <div class="vi-flex-item is-flex--1">
                <span
                  class="vi-text is-color--warning"
                  v-if="item.checked === 1"
                >
                  已开启
                </span>
                <span class="vi-text is-color--light" v-else>
                  待开启
                </span>
              </div>
            </div>
            <div
              class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
              style="line-height: 36px"
            >
              <div class="" style="width: 80px">
                <span class="vi-text is-color--light">类型</span>
              </div>
              <div class="vi-flex-item is-flex--1">
                <span class=" ">
                  {{ $getAdvertTypes(item.type).text }}
                </span>
              </div>
            </div>
            <template v-if="item.type === 1">
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">卡号</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.url }}
                  </span>
                </div>
              </div>
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">真实姓名</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.realName }}
                  </span>
                </div>
              </div>
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">开户行</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">简称</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.alipayOrMask || "--" }}
                  </span>
                </div>
              </div>
            </template>
            <template v-if="item.type === 2">
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">账号</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </template>
            <template v-if="item.type === 3">
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">账号</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">实名</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.realName }}
                  </span>
                </div>
              </div>
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">ID号</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.alipayOrMask || "--" }}
                  </span>
                </div>
              </div>
            </template>
            <template v-if="item.type === 4">
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">账号</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </template>
            <template v-if="item.type === 5">
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">账号</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">支付方式</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.alipayOrMask || "--" }}
                  </span>
                </div>
              </div>
            </template>
            <template v-if="item.type === 6">
              <div
                class="vi-flex vi-padding-ad vi-border is-border--bottom is-border--thiner"
                style="line-height: 36px"
              >
                <div class="" style="width: 80px">
                  <span class="vi-text is-color--light">账号</span>
                </div>
                <div class="vi-flex-item is-flex--1">
                  <span class=" ">
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </template>
          </div>
          <div style="width: 150px" class="vi-padding" v-if="item.originUrl">
            <img :src="item.originUrl" alt="" style="max-width: 100%" />
          </div>
        </div>
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
              无账号信息
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
