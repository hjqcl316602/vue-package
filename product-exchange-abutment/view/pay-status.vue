<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 10:02:13
 * @LastEditTime: 2019-09-06 11:56:37
 * @LastEditors: Please set LastEditors
 -->
<script type="text/ecmascript-6">
import { getOrderMessage } from "@/request";

export default {
    name: "PagePayStatus",
    components: {},

    data() {
        return {
            params: {
                accessToken: "",
                appId: "",
                status: "",
                money: "",
                createTime: "",
                orderSn: "",
                payTime: "",
                channelOrderId: "",
                payMode: "",
                orderId: ""
            }
        };
    },
    mounted() {
        this.initPage();
    },
    methods: {
        /**
         * 页面初始化
         */
        async initPage() {
            this.params = Object.assign(this.params, this.$route.params);
            this.getOrderMessage()
        } ,
        getOrderMessage(){
            getOrderMessage({
                accessToken: this.params.accessToken
            },{ loading :  true , loadingLeastTime : 500 }).then(( { data ,code ,msg })=>{
                if( code === '000'){
                  this.params = Object.assign(this.params,data)
                }else this.$message.danger(msg)
            });
        }
    }
};
</script>
<template>
  <div
    class="vi-cotain is-contain--ver is-contain--min vv-page is-page--max is-page--center vi-background vi-padding"
  >
    <div class="vi-ratio" v-if="$getOrderStatusTypes(params.status)">
      <div class="vi-ratio--wrap" data-ratio="2:1">
        <div
          class="vi-ratio--inner vi-flex is-flex-direction--column is-justify-content--center is-align-items--center"
        >
          <span
            class=" vi-icon vi-text"
            :class="$getOrderStatusTypes(params.status).className"
            v-html="$getOrderStatusTypes(params.status).icon"
            style="font-size: 40px"
          ></span>
          <span>
            {{ $getOrderStatusTypes(params.status).text }}
          </span>
        </div>
      </div>
    </div>

    <div class=" ">
      <template v-if="params.money">
        <div
          class="vi-flex is-justify-content--space-between"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">金额</span>
          <span class=""> ￥{{ params.money }} </span>
        </div>
      </template>
      <template v-if="params.payMode">
        <div
          class="vi-flex is-justify-content--space-between"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">支付方式</span>
          <span class=""> {{ params.payMode }} </span>
        </div>
      </template>
      <template v-if="params.channelOrderId">
        <div
          class="vi-flex is-justify-content--space-between"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">订单编号</span>
          <span class=" ">{{ params.channelOrderId }} </span>
        </div>
      </template>
      <template v-if="params.orderSn">
        <div
          class="vi-flex is-justify-content--space-between"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">流水号</span>
          <span class=" ">{{ params.orderSn }} </span>
        </div>
      </template>
      <template v-if="params.createTime">
        <div
          class="vi-flex is-justify-content--space-between"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">创建时间</span>
          <span class=" ">{{ params.createTime }} </span>
        </div>
      </template>
      <template v-if="params.payTime">
        <div
          class="vi-flex is-justify-content--space-between"
          style="line-height: 36px"
        >
          <span class="vi-text is-color--light">支付时间</span>
          <span class=" ">{{ params.payTime }} </span>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped></style>
