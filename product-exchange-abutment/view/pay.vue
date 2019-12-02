<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 10:02:13
 * @LastEditTime: 2019-08-27 11:36:03
 * @LastEditors: Please set LastEditors
 -->
<script type="text/ecmascript-6">
import Vue from "vue";
import { getOrderMessage, cancelOrder } from "@/request";
import payCard from '@/view/pay-type/card'
import payAliCard from '@/view/pay-type/ali-card'
import payWx from '@/view/pay-type/wx'
import payAli from '@/view/pay-type/ali'
import payUnion from '@/view/pay-type/union'
import payAliUser from '@/view/pay-type/ali-user'
import payAliUserQuick from '@/view/pay-type/ali-user-quick'
import payDynamic from '@/view/pay-type/dynamic'
import { Hexer, Urler, Queryer } from "@package/es";


const APPID_TO_ALIPAY = "20000067";
/**
 * 跳转到支付宝内部，指定的路径和参数的传递
 */
function getAlipayUrl(path) {
    let query = new Queryer();
    let urler = new Urler();
    let href = window.location.href;
    let index = href.indexOf("#");
    let url = urler.encodeURIComponent(href.substring(0, index + 1) + path);
    return `alipays://platformapi/startapp?appId=${APPID_TO_ALIPAY}&url=${url}`;
}
export default {
    name: "PagePays",
    components: { payCard,payWx ,payAli,payAliUser,payAliCard,payUnion,payDynamic,payAliUserQuick },
    data() {
        return {
            isShow: false, // 是否显示支付页面
            params: {
                payType: 4,
                token: "",
                accessToken: "",
                appId: "",
                fee: "",
                sn: "",
                timeLimit: 0,
                qr: "",
                needRemark: "",
                payRemark: "",
                orderId: ""
            },
            timer: {
                payStatus: null,
                payStatusDuration: 5 * 1000,
                payTime: null,
                payTimeDuration: 1 * 1000
            },
            cancel: {
                popup: false
            }
        };
    },
    mounted() {
        this.initialize();
    },
    methods: {
        /**
         * 页面进入
         * 1.首先得到url参数 payType token accessToken
         * 2.token解析
         * 3.通过accessToken去获取该订单的详情，并判断当前订单的状态，如果是0，则表示取消，3表示成功，其他状态则定时再获取
         * 4.定时获取订单的详情
         */
        async initialize() {
            this.params = Object.assign(this.params, this.$route.params);
            this.params = Object.assign(this.params, this.analysisToken());
            console.log(this.params);

            this.getOrderMessage();
            this.setTimer("payStatus");
        },

        /*
         *获取订单的支付信息
         * init 是否是第一次调用，第一次则将开始计算倒计时
         * 若状态是取消和完成付款，则跳转到状态的页面即可
         */
        getOrderMessage(init = true) {
            getOrderMessage(
                { accessToken: this.params.accessToken },{ loading : init }
            ).then(({ data ,code ,msg }) => {
                if(code === '000'){
                    let { leftTime ,status, orderId } = data;
                    this.params.orderId = orderId ;
                    if (status === 0 || status === 3) {
                        setTimeout(() => {
                            this.$router.replace({
                                name: "PayStatus",
                                params: {
                                    accessToken: this.params.accessToken,
                                    appId: this.params.appId
                                }
                            });
                        }, 50);

                    } else {
                        if (init) {
                            this.params.timeLimit = leftTime
                                ? leftTime * 1000
                                : 0;
                            this.params.timeLimit > 0 && this.setTimer("payTime");
                            this.isShow = true;
                        }
                    }
                    if(leftTime === 0){
                        setTimeout(() => {
                            this.$router.replace({
                                name: "Error",
                                query:{
                                    msg:'订单已过期'
                                }
                            });
                        }, 50);
                    }
                }else  this.$message.danger(msg)

            });
        },
        /**
         * 解析token，16进制转化为字符串
         */
        analysisToken() {
            try {
                let hex = new Hexer();
                let hexToString = hex.decodeComponent(this.params.token);
                let message = JSON.parse(hexToString);
                return message;
            } catch (e) {
                this.$router.replace({
                    name: "Error",
                    query: { msg: "异常，请重试或联系客服！" }
                });
            }
        },
        /**
         * 设置定时器
         * type 是指定时器的类型 [payStatus,payTime]
         */
        setTimer(type) {
            this.clearTimer(type);
            if (type == "payTime") {
                this.timer.payTime = null;
                this.timer.payTime = setInterval(() => {
                    this.params.timeLimit = this.params.timeLimit - 1000;
                    //console.log(this.params.timeLimit)
                    if (this.params.timeLimit === 0) {
                        this.clearTimer(type);
                    }
                }, this.timer.payTimeDuration);
            } else if (type == "payStatus") {
                this.timer.payStatus = null;
                this.timer.payStatus = setInterval(() => {
                    this.getOrderMessage(false);
                }, this.timer.payStatusDuration);
            }
        },
        /**
         * 清除定时器
         */
        clearTimer(type) {
            clearInterval(this.timer[type]);
            this.timer[type] = null;
        },
        createCustom(){
            this.$router.push({
                name: "CustomDetail",
                params: {
                    appId: this.params.appId,
                    accessToken: this.params.accessToken
                },
                query: { orderId: this.params.orderId }
            });
        },
        cancelOrder() {
            cancelOrder({ accessToken: this.params.accessToken }).then(({ code , data , msg }) => {

                if(code === '000'){
                    setTimeout(() => {
                        this.$router.replace({
                            name: "PayStatus",
                            params: {
                                accessToken: this.params.accessToken,
                                appId: this.params.appId
                            }
                        });
                    }, 50);
                }else  this.$message.danger(msg)
            });
        }
    },
    // 页面离开时清除定时器
    beforeDestroy() {
        this.clearTimer("payTime");
        this.clearTimer("payStatus");
    }
};
</script>
<template>
  <div
    class="vi-cotain is-contain--ver is-contain--min  vv-page is-page--max is-page--center vi-padding vi-background"
  >
    <div class="vv-header">
      <div class=" vv-page is-page--max is-page--center ">
        <div
          class="vi-padding vi-flex is-justify-content--flex-end is-align-items--center"
        >
          <span class="  vi-text   " @click="createCustom" v-if="false">
            申诉
          </span>
          <span
            class="vi-icon vi-text is-color--danger "
            style="font-size: 24px"
            @click="cancel.popup = true"
          >
            &#xe644;
          </span>
        </div>
      </div>
    </div>
    <vui-confirm v-model="cancel.popup" title="信息确认" @ok="cancelOrder">
      <div class="vi-padding vi-text is-align--center">
        <span class="vi-text is-color--danger">是否确定取消该充值订单?</span>
      </div>
    </vui-confirm>

    <template v-if="false">
      <div class="vv-close is-close--top-right" @click="selectSide('cancel')">
        <i class="iconfont icon-delete vc-text--xl-x vc-text--danger"></i>
      </div>
    </template>

    <pay-card :message="params" v-if="params.payType == 1"></pay-card>
    <pay-wx :message="params" v-if="params.payType == 2"></pay-wx>
    <pay-ali :message="params" v-if="params.payType == 3"></pay-ali>
    <pay-union :message="params" v-if="params.payType == 4"></pay-union>
    <pay-ali-card :message="params" v-if="params.payType == 5"></pay-ali-card>
    <pay-ali-user :message="params" v-if="params.payType == 6"></pay-ali-user>
    <pay-dynamic :message="params" v-if="params.payType == 7"></pay-dynamic>
    <pay-ali-user-quick
      :message="params"
      v-if="params.payType == 8"
    ></pay-ali-user-quick>
  </div>
</template>
<style scoped></style>
