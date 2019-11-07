<script>
import { getTransaction } from "../request";
const recordTypes = [
  {
    value: 0,
    label: "充值"
  },
  {
    value: 1,
    label: "提现"
  },
  {
    value: 2,
    label: "转账",
    className: "is-color--danger"
  },
  {
    value: 3,
    label: "币币交易"
  },
  {
    value: 4,
    label: "法币买入",
    className: "is-color--primary"
  },
  {
    value: 5,
    label: "法币卖出",
    className: "is-color--primary"
  },
  {
    value: 6,
    label: "活动奖励"
  },
  {
    value: 7,
    label: "推广奖励",
    className: "is-color--warning"
  },
  {
    value: 8,
    label: "分红"
  },
  {
    value: 9,
    label: "投票"
  },
  {
    value: 10,
    label: "人工充值"
  },
  {
    value: 11,
    label: "配对"
  },
  {
    value: 12,
    label: "佣金奖励",
    className: "is-color--success"
  }
];
export default {
  name: "",
  data() {
    return {
      query: {},
      params: {
        pageNo: 1,
        pageSize: 10,
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
      this.query = Object.assign(this.query, this.$route.query);
      this.getTransaction();
    },
    getTransaction(more = false) {
      if (this.params.load) return false;
      this.params.load = true;
      getTransaction({
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
        startTime: this.query.startTime,
        endTime: this.query.endTime
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
            this.params.total = data["data"]["totalElements"] || 0;
            console.log(this.params.total, this.params.list.length);
          } else {
            this.$message.danger("获取流水列表失败");
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
      this.getTransaction(true);
    },
    getRecordType(type) {
      return (
        recordTypes.find(el => {
          return el.value === type;
        }) || {}
      );
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="vv-record">
    <div v-if="params.list.length > 0">
      <vui-loadmore @load="loadmore" :can-load="canLoad">
        <div
          class="vi-background vi-margin-bottom"
          v-for="(item, index) in params.list"
          :key="index"
        >
          <div class="">
            <div
              class="vi-flex is-justify-content--space-between vi-border is-border--bottom is-border--thiner vi-padding-ad"
              style="line-height: 36px"
            >
              <div>
                <span class="vi-text is-color--light">
                  数量
                </span>
              </div>
              <div class="">
                <span
                  class="vi-text "
                  :class="getRecordType(item.type).className"
                >
                  {{ item.amount | toShousand }}
                </span>
                <span>
                  {{ item["symbol"] }}
                </span>
              </div>
            </div>

            <div
              class="vi-flex is-justify-content--space-between vi-border is-border--bottom is-border--thiner vi-padding-ad "
              style="line-height: 36px"
            >
              <div>
                <span class="vi-text is-color--light">
                  类型
                </span>
              </div>
              <div class="">
                <span class="vi-text">
                  {{ getRecordType(item["type"])["label"] }}
                </span>
              </div>
            </div>

            <div
              class="vi-flex is-justify-content--space-between vi-border is-border--bottom is-border--thiner vi-padding-ad"
              style="line-height: 36px"
            >
              <div>
                <span class="vi-text is-color--light">
                  交易时间
                </span>
              </div>
              <div class="">
                <span class="">
                  {{ item.createTime }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          slot="footer"
          v-if="params.total > 5 && params.total === params.list.length"
          class="  vi-text is-align--center"
          style="line-height: 44px"
        >
          <span class="vi-text is-color--gray"
            >总共{{ this.params.total }}条流水</span
          >
        </div>
      </vui-loadmore>
    </div>
    <div
      class="vi-flex is-justify-content--center is-align-items--center"
      style="height: 300px"
      v-else
    >
      <div class="vi-text is-align--center">
        <div class="vi-margin-bottom">
          <span class="vi-icon vi-text is-color--gray">&#xe618;</span>
        </div>
        <div>
          <span class="vi-text is-color--gray">
            无流水信息
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
