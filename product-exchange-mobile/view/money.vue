<script>
import { getWallet, getTransferHis, transferToUser } from "@/request";
export default {
  name: "",
  data() {
    return {
      list: {},
      message: {},
      actionOptions: {
        handler: [
          {
            text: "内部转账",
            value: "transfer"
          }
        ]
      },
      actionShow: {
        handler: false
      },
      confirmShow: {
        transfer: false
      },
      transfer: {
        hisList: [],
        number: "",
        mobile: "",
        realname: "",
        password: ""
      }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.getWallet();
      this.getTransferHis();
    },
    getWallet() {
      getWallet().then(({ data }) => {
        if (data["code"] === 0) {
          this.list = data["data"] || [];
        } else {
          this.$message.danger(data.message);
        }
      });
    },
    getTransferHis() {
      getTransferHis().then(({ data }) => {
        if (data.code === 0) {
          this.transfer.hisList = data.data;
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    selectItem(item) {
      console.log(item);
      this.message = item;
      this.actionShow.handler = true;
    },
    selectAction(picker) {
      if (picker.value === "transfer") {
        this.confirmShow.transfer = true;
      }
    },
    selectHisUser(item) {
      this.transfer.realname = item.realName;
      this.transfer.mobile = item.mobilePhone;
    },
    transferToUser() {
      if (!this.transfer.number) {
        this.$message.danger("请输入转账数量");
        return;
      }
      if (!this.transfer.mobile) {
        this.$message.danger("请输入对方的手机号码");
        return;
      }
      if (!this.transfer.realname) {
        this.$message.danger("请输入对方的真实姓名");
        return;
      }
      if (!this.transfer.password) {
        this.$message.danger("请输入您的资金密码");
        return;
      }
      transferToUser({
        number: this.transfer.number,
        mobile: this.transfer.mobile,
        realName: this.transfer.realname,
        jyPassword: this.transfer.password,
        unit: this.message.coin.name
      }).then(({ data }) => {
        if (data["code"] === 0) {
          this.init();
          this.confirmShow.transfer = false;
          this.$message.success("转账成功");
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
  <div class="">
    <template>
      <vui-confirm v-model="confirmShow.transfer" title="内部转账">
        <div
          slot="footer"
          class="vi-border is-border--top is-border--thiner vi-text is-align--right vi-padding"
        >
          <div
            class="vi-btn is-btn--primary is-btn--hollow is-btn--small is-btn--radius is-btn--thiner"
            @click="transferToUser"
          >
            确认转账
          </div>
        </div>
        <div class="">
          <div
            class="vi-flex vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 44px"
          >
            <div
              style="width: 80px"
              class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
            >
              <span>数量</span>
            </div>
            <input
              type="number"
              class="vi-flex-item is-flex--1 vi-input is-input--larger"
              placeholder="请输入转账数量"
              v-model="transfer.number"
            />
            <div
              class="vi-padding-ad"
              v-if="transfer.number"
              @click="transfer.number = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
            <span class="vi-margin-left"
              >{{ message.coin && message.coin.name }}
            </span>
          </div>
          <div class="vi-padding-ad" style="line-height: 36px">
            <span class="vi-text is-color--warning">
              <span>提示：最多可转账数量</span>
              <span class="vi-text is-color--danger">
                {{ message.balance || 0 }}
              </span>
              <span> {{ message.coin && message.coin.name }}</span>
            </span>
          </div>
          <div
            class="vi-flex vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 44px"
          >
            <div
              style="width: 80px"
              class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
            >
              <span>手机号</span>
            </div>
            <input
              type="tel"
              class="vi-flex-item is-flex--1 vi-input is-input--larger"
              placeholder="请输入对方的手机号码"
              v-model="transfer.mobile"
            />
            <div
              class="vi-padding-ad"
              v-if="transfer.mobile"
              @click="transfer.mobile = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>

          <div
            class="vi-flex vi-border is-border--bottom is-border--thiner vi-padding-ad"
            style="line-height: 44px"
          >
            <div
              style="width: 80px"
              class="vi-padding-right vi-text is-align--right vi-tag is-tag--require"
            >
              <span>真实姓名</span>
            </div>
            <input
              type="text"
              class="vi-flex-item is-flex--1 vi-input is-input--larger"
              placeholder="请输入对方的真实姓名"
              v-model="transfer.realname"
            />
            <div
              class="vi-padding-ad"
              v-if="transfer.realname"
              @click="transfer.realname = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
          <div class=" vi-border is-border--bottom is-border--thiner">
            <div
              class="vi-btn is-btn--primary"
              v-for="(item, index) in transfer.hisList"
              @click="selectHisUser(item)"
            >
              <span>{{ item.mobilePhone }} | {{ item.realName }}</span>
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
              v-model="transfer.password"
            />
            <div
              class="vi-padding-ad"
              v-if="transfer.password"
              @click="transfer.password = ''"
            >
              <span class="vi-text is-color--gray vi-icon">&#xe65e;</span>
            </div>
          </div>
        </div>
      </vui-confirm>
      <vui-action
        :options="actionOptions.handler"
        v-model="actionShow.handler"
        @select="selectAction"
      >
      </vui-action>
    </template>
    <div
      class="vi-background vi-margin-bottom"
      v-for="(item, index) in list"
      :key="index"
      @click="selectItem(item)"
    >
      <div
        class="vi-flex is-justify-content--space-between vi-border is-border--bottom is-border--thiner vi-padding-ad"
        style="line-height: 36px"
      >
        <div class=" ">
          <span class="vi-text is-color--light">
            币种
          </span>
        </div>
        <div class=" ">
          <span class="vi-text is-color--primary">
            {{ item.coin ? item.coin.name : "" }}
          </span>
        </div>
      </div>
      <div
        class="vi-flex is-justify-content--space-between vi-border is-border--bottom is-border--thiner vi-padding-ad"
        style="line-height: 36px"
      >
        <div class=" ">
          <span class="vi-text is-color--light">
            可用
          </span>
        </div>
        <div class=" ">
          <span class="vi-text is-color--warning">
            {{ item.balance }}
          </span>
        </div>
      </div>
      <div
        class="vi-flex is-justify-content--space-between vi-border is-border--bottom is-border--thiner vi-padding-ad"
        style="line-height: 36px"
      >
        <div class=" ">
          <span class="vi-text is-color--light">
            冻结
          </span>
        </div>
        <div class=" ">
          <span class="vi-text is-color--danger">
            {{ item.frozenBalance }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
