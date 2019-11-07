<script>
import formater from "@package/es/dater/formater";
import { loginOut } from "@/request/login";
import { getWithdraw } from "@/request";
import { mapState, mapMutations } from "vuex";
import {
  iconHeadNormal,
  scenic1,
  scenic2,
  scenic3,
  scenic4,
  scenic5,
  scenic6,
  scenic7,
  scenic8,
  scenic9,
  scenic10
} from "@/image";
import { getTraddingOrder } from "@/request/order";
let headImages = [
  scenic1,
  scenic2,
  scenic3,
  scenic4,
  scenic5,
  scenic6,
  scenic7,
  scenic8,
  scenic9,
  scenic10
];
export default {
  name: "vv-user",
  data() {
    return {
      icon: {
        headEmpty: headImages[Math.round(Math.random() * 9)]
      },
      withdraw: {
        today: 0,
        total: 0
      }
    };
  },
  props: {},
  computed: mapState({
    userMember: state => state.user.member,
    userSet: state => state.user.set,
    orderTradding: state => state.order.tradding,
    orderNoticeType: state => state.order.noticeType,
    chatUnread: state => state.chat.unread
  }),
  methods: {
    ...mapMutations({
      setUserSet: "set/user/set",
      setOrderTradding: "set/order/tradding",
      setPageCache: "set/page/cache"
    }),
    init() {
      this.getTraddingOrder();
      //this.getWithdraw();
      //this.getWithdraw("today");
      this.setPageCache("user");
    },
    showMoney(label) {
      this.setUserSet({ label, value: !this.userSet[label] });
    },
    check(type) {
      let object = {};
      if (type === "today") {
        object.startTime = formater(new Date(), "yyyy-MM-dd");
        object.endTime = formater(
          new Date(+new Date() + 24 * 60 * 60 * 1000),
          "yyyy-MM-dd"
        );
      }
      this.$router.push({
        path: "/record",
        query: object
      });
    },
    getWithdraw(type = "total") {
      let object = {};
      if (type === "today") {
        object.startTime = formater(new Date(), "yyyy-MM-dd");
        object.endTime = formater(
          new Date(+new Date() + 24 * 60 * 60 * 1000),
          "yyyy-MM-dd"
        );
      }
      getWithdraw(object).then(({ data }) => {
        if (data.code === 0) {
          let message = data.data;
          this.withdraw[type] = Number(message.amount || 0).toFixed(2);
        } else {
          this.$message.danger(data["message"]);
        }
      });
    },
    getTraddingOrder() {
      getTraddingOrder().then(({ data }) => {
        if (data.code === 0) {
          this.setOrderTradding("set/order/traddding", data.data);
        } else {
          this.$message.danger(data["message"]);
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
  <div class="vv-user">
    <div>
      <div class="vi-margin-bottom">
        <div
          class="vi-padding-ad vi-padding-ud is-padding-ud--large vi-background is-background--parimary"
        >
          <div
            class="vi-flex is-justify-content--space-between is-align-items--center "
            @click="$router.push('/set')"
          >
            <div class="vi-flex  is-align-items--center">
              <div class="vv-head  ">
                <vui-image
                  width="100%"
                  height="100%"
                  fill-type="min"
                  :src="userMember.avatar"
                >
                  <div slot="error" class="vi-cover">
                    <img :src="icon.headEmpty" alt="" class="vi-cover" />
                  </div>
                </vui-image>
              </div>
              <div class="vi-margin-left">
                <div>
                  <span class="vi-text is-color--white is-weight--bold">
                    {{ userMember.username }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span class="vi-icon vi-text is-color--white">&#xe61f;</span>
            </div>
          </div>
        </div>
      </div>

      <div class="vi-margin-bottom" v-if="false">
        <div class="vi-background">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-padding-ad" style="line-height: 36px">
              <span class="vi-text is-color--light">我的收款</span>
            </div>
          </div>
          <div class="vi-row">
            <div class="vi-span is-span--12">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
              >
                <span class="vi-text is-color--light is-size--smaller"
                  >全部收款</span
                >
                <span
                  style="line-height: 32px;font-size: 18px"
                  class="vi-text is-weight--bold"
                  @click="showMoney('moneyTotal')"
                >
                  {{ userSet.moneyTotal ? withdraw.total : "****" }}
                </span>
                <div
                  class="vi-btn is-btn--smaller is-btn--primary"
                  @click="check('total')"
                >
                  查看明细
                </div>
              </div>
            </div>
            <div class="vi-span is-span--12">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
              >
                <span class="vi-text is-color--light is-size--smaller"
                  >今日收款</span
                >
                <span
                  style="line-height: 32px;font-size: 18px"
                  class="vi-text is-weight--bold"
                  @click="showMoney('moneyToday')"
                >
                  {{ userSet.moneyToday ? withdraw.today : "****" }}
                </span>
                <div
                  class="vi-btn is-btn--smaller is-btn--primary"
                  @click="check('today')"
                >
                  查看明细
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-background">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-padding-ad" style="line-height: 36px">
              <span class="vi-text is-color--light">我的订单</span>
            </div>
          </div>
          <div class="vi-row">
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/order-finish')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe65d;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  已完成
                </span>
              </div>
            </div>
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large vv-track "
                :class="{
                  'is-track--active':
                    orderNoticeType.indexOf('type:flicker') > -1 &&
                    orderTradding.sell + orderTradding.buy > 0
                }"
                @click="$router.push('/order-hand')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe60a;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  未完成
                </span>
              </div>
            </div>
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large vv-track"
                @click="$router.push('/order-appeal')"
                :class="{
                  'is-track--active':
                    orderNoticeType.indexOf('type:flicker') > -1 &&
                    orderTradding.appeal > 0
                }"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe64f;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  申诉中
                </span>
              </div>
            </div>
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                  @click="$router.push('/order-cancel')"
                >
                  &#xe61b;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  已取消
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-background">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-padding-ad" style="line-height: 36px">
              <span class="vi-text is-color--light">个人中心</span>
            </div>
          </div>
          <div class="vi-row">
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/advert')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe674;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  广告
                </span>
              </div>
            </div>
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/account')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe639;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  账号
                </span>
              </div>
            </div>
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/money')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe61a;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  钱包
                </span>
              </div>
            </div>

            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/record')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe6be;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  流水
                </span>
              </div>
            </div>

            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/team')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe604;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  推广
                </span>
              </div>
            </div>

            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large vi-tag"
                @click="$router.push('/customer?type=user')"
              >
                <div
                  class="vi-tag-label is-tag--top-right"
                  style="top:8px;right:8px"
                  v-if="chatUnread"
                >
                  <span>{{ chatUnread }}</span>
                </div>
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe605;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  客服
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-background">
          <div class="vi-border is-border--bottom is-border--thiner">
            <div class="vi-padding-ad" style="line-height: 36px">
              <span class="vi-text is-color--light">广告市场</span>
            </div>
          </div>
          <div class="vi-row">
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/sell')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe601;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  出售
                </span>
              </div>
            </div>
            <div class="vi-span is-span--6">
              <div
                class="vi-flex is-flex-direction--column is-align-items--center vi-padding is-padding--large"
                @click="$router.push('/buy')"
              >
                <span
                  class="vi-icon vi-text is-color--primary vi-margin-bottom is-margin-bottom--small"
                  style="font-size: 18px"
                >
                  &#xe607;
                </span>
                <span class="vi-text is-color--light is-size--smaller">
                  购买
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
