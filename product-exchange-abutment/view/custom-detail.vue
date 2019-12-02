<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 10:02:13
 * @LastEditTime: 2019-08-20 18:38:15
 * @LastEditors: Please set LastEditors
 -->
<script>
import Vue from "vue";
import { domer } from "@package/es";
import {
  getOrderDetail,
  createSocket,
  uploadCompressImage,
  getChatHistory
} from "@/request";

export default {
  name: "CustomDeatil",
  data() {
    return {
      custom: {
        message: ""
      },
      header: {
        show: false
      },
      params: {
        accessToken: "",
        appId: "",
        orderId: "",
        orderSn: "",
        minChatId: 0,

        uidTo: "",
        uidFrom: "",
        nameFrom: "",
        nameTo: "",

        socketConneted: false,
        socketConnetedCount: 0
      },
      result: {},

      chats: [],

      chat: {
        loading: false,
        pageSize: 20,
        push: {
          loading: false,
          finished: true
        },
        number: 0
      },
      picture: {
        show: false,
        value: ""
      }
    };
  },

  mounted() {
    this.init();
    this.getClipboardImage();
  },
  methods: {
    /**
     * 页面初始化
     */

    async init() {
      let { accessToken, appId } = this.$route.params;
      let { orderId } = this.$route.query;
      this.params.accessToken = accessToken;
      this.params.appId = appId;
      this.params.orderId = orderId;

      let detail = await this.getOrderDetail(2);

      let list = await this.getChatHistory();

      this.createSocket();
    },

    /**
     * 时间：2019/9/18 ,
     * 描述：获取粘贴板的图片文件
     */

    getClipboardImage() {
      this.$refs["editable"].onpaste = event => {
        let value = event.clipboardData.items[0];
        if (value.kind === "file" && value.type.indexOf("image/") !== -1) {
          //this.selectPic(value.getAsFile(), "clipboard");
          this.uploadImage(value.getAsFile(), "clipboard");
          return false;
        }
      };
    },

    /**
     * 创建socket
     */
    createSocket() {
      this._socket = createSocket();

      let connect = this._socket.connect(
        {},
        frame => {
          this.$message.success("聊天室已连接，您可以进行聊天了~");
          this.params.socketConneted = true;
          this.params.socketConnetedCount = 0;
          this.subscribeSocketMessage();
        },
        frame => {
          //this.$toast("聊天室连接失败，请检查网络！");
          //this.params.socketConneted = false;
          this.params.socketConnetedCount++;
          if (this.params.socketConnetedCount == 10) {
            this.$message.danger("聊天室连接失败，请检查网络！");
            this.params.socketConnetedCount = 0;
          } else {
            this.params.socketConneted = false;
            this.createSocket();
          }
        }
      );

      this._socket.debug = function(str) {
        console.log(JSON.stringify(str));
      };
      //this._socket.heartbeat.outgoing = 10000;
      //this._socket.heartbeat.incoming = 0;
    },
    /**
     * 关闭实时通信
     */
    closeSocket() {
      if (this._socket) {
        this._socket.disconnect();
        this.$message.warning("聊天室已关闭！");
      }
    },

    /**
     * 订阅实时聊天信息
     */
    subscribeSocketMessage() {
      this._socket.subscribe(
        "/topic/chatMsg/kh/" + this.params.uidFrom,
        response => {
          let message = JSON.parse(response.body);
          // 会收到全部的信息 需要过滤出当前的订单对应的信息
          if (message["orderId"] == this.params.orderId) {
            this.chats.push(message);
          }
          this.scrollToBottom();
        }
      );
    },

    /**
     * 获取订单详情，并得到聊天需要的参数
     */
    getOrderDetail() {
      let { accessToken, appId, orderId } = this.params;
      return new Promise(resolve => {
        let promise = getOrderDetail(
          { accessToken, appId, orderId },
          { loading: true }
        );

        promise.then(({ code, data, msg }) => {
          if (code === "000") {
            this.result = Object.assign({}, data);

            this.params.uidFrom =
              this.result["customerId"] + "_" + this.result["subMemId"];

            this.params.uidTo = this.result["memberId"];

            this.params.nameFrom =
              this.result["subDealName"] || this.result["subMemId"];

            this.params.nameTo = this.result["memberName"];

            this.params.orderSn = this.result["orderSn"];

            resolve("detail");
          } else this.$message.danger(msg);
        });
      });
    },
    /**
     * 获取聊天列表
     */
    getChatHistory(more = false) {
      return new Promise(resolve => {
        if (this.chat.loading)
          return this.$message.warning("请稍等，正在获取聊天记录！");
        this.chat.loading = true;

        if (more) {
          this.params.minChatId = this.chats[0]["chatId"];
        } else {
          this.params.minChatId = 0;
        }
        let { accessToken, appId, orderId, minChatId } = this.params;
        let promise = getChatHistory({
          accessToken,
          appId,
          orderId,
          minChatId
        });

        promise.then(({ code, data, msg }) => {
          if (code === "000") {
            let list = data.reverse();

            this.chat.push.finished = this.chat.pageSize > list.length;

            if (more) {
              this.chats = [...list, ...this.chats];
            } else {
              this.chats = list;

              this.scrollToBottom();
            }

            this.chat.loading = false;

            resolve("list");
          } else this.$message.danger(msg);
        });

        promise.catch(() => {
          this.chat.loading = false;
        });
      });
    },

    /**
     * 处理页面头部的显示和隐藏，判断单击位置是否是头部
     */
    hanlderHeaderVisibility() {
      this._close = e => {
        this.header.show = this.$refs["header"].contains(e.target);
      };
      document.body.addEventListener("click", this._close);
    },
    /**
     * 让滚动条始终在底部
     */
    scrollToBottom() {
      setTimeout(() => {
        let scrollHeight = domer.scroller.scrollHeight(this.$refs["chat-body"]);
        domer.scroller.scrollTop(window, scrollHeight);
      }, 500);
      // setTimeout(() => {
      //   var div = this.$refs["chat-body"];
      //   div.scrollTop = div.scrollHeight;
      // }, 300);
    },

    /**
     * 发送消息
     */
    sendSocketMessage(params) {
      let sendParams = {
        uidTo: this.params.uidTo,
        uidFrom: this.params.uidFrom,
        orderId: this.params.orderId,
        orderSn: this.params.orderSn,
        nameFrom: this.params.nameFrom,
        nameTo: this.params.nameTo,
        content: params.content,
        type: params.type,
        appId: this.params.appId,
        accessToken: this.params.accessToken,
        uidType: 1
      };

      this.chats.push(sendParams);
      this.setMessageTimer();

      this.scrollToBottom();

      this._socket.send("/app/message/nologin", {}, JSON.stringify(sendParams));
    },

    setMessageTimer() {
      this.clearMessageTimer();
      if (this.chat.number === 1) return false;
      this.messageTimer = setTimeout(() => {
        this.chat.number++;
        this.chats.push({
          content:
            "亲，感谢的您耐心的等待，您的问题已收到，我们正在为您处理，谢谢",
          type: 0,
          uidType: 2
        });
        this.scrollToBottom();
      }, 1000 * 60);
    },
    clearMessageTimer() {
      clearTimeout(this.messageTimer);
    },

    /**
     * 发送消息
     */
    sendMessage() {
      if (!this.custom.message)
        return this.$message.danger("申诉内容不能为空!");
      if (!this.params.socketConneted)
        return this.$message.danger("聊天室连接失败，请刷新页面重试!");
      this.sendSocketMessage({
        content: this.custom.message,
        type: 0
      });
      this.custom.message = "";
    },
    /**
     * 选择图片并上传
     */
    uploadImage(e, type = "select") {
      let formData;
      if (type === "select") {
        let file = e.target.files[0];
        formData = new FormData();
        formData.append("file", file);
        e.target.value = "";
      } else {
        formData = new FormData();
        formData.append("file", e);
      }
      uploadCompressImage(formData).then(({ code, data, msg }) => {
        if (code === "000" && data && data.url) {
          if (this.params.socketConneted) {
            this.sendSocketMessage({ content: data.url, type: 1 });
          } else {
            this.$message.danger("聊天室连接失败，请刷新页面重试!");
          }
        } else {
          this.$message.danger(msg);
        }
      });
    },
    /**
     * 预览图片
     */
    showPicture(currentPic) {
      this.picture.show = true;
      this.picture.value = currentPic;
    },

    checkMine(item) {
      return item["uidType"] === 1;
    }
  },
  beforeDestroy() {
    this.closeSocket();
    document.body.removeEventListener("click", this._close);
    this.clearMessageTimer();
  }
};
</script>

<template>
  <div style="margin-bottom: 50px">
    <vui-mask v-model="picture.show" transition-name="fade">
      <div
        class="vi-padding vi-text is-align--center"
        style="width: 100%;height: 100%;"
        @click="picture.show = false"
      >
        <img
          :src="picture.value"
          alt=""
          style="max-width: 100%;max-height: 100%"
        />
      </div>
    </vui-mask>
    <div class="vv-chat" ref="chat-body">
      <div v-if="!chat.push.finished" class="vi-margin-bottom">
        <div
          class="vi-btn is-btn--long is-btn--primary is-btn--hollow is-btn--smaller is-btn--thiner is-btn--radius"
          @click="getChatHistory(true)"
        >
          加载更多
        </div>
      </div>
      <div
        class="vv-chat-row "
        :class="{
          'is-row--left': !checkMine(item),
          'is-row--right': checkMine(item)
        }"
        v-for="(item, index) in chats"
      >
        <div class="vv-chat-tag" style="" v-if="!checkMine(item)"></div>

        <div class="vv-chat-content">
          <div class="vv-chat-arrow"></div>
          <div class="vv-chat-message">
            <div>
              <span v-if="item.type === 0">{{ item.content }}</span>
              <img
                v-else
                :src="item.content"
                alt=""
                style="max-width:250px;max-height: 350px"
                @click="showPicture(item.content)"
              />
            </div>
            <div class="vi-margin-top" v-if="item.sendTimeStr">
              <span class="vi-text is-color--gray ">
                {{ item.sendTimeStr }}
              </span>
            </div>
          </div>
        </div>
        <div class="vv-chat-tag" style="" v-if="checkMine(item)"></div>
      </div>
    </div>
    <div class="vv-footer vi-flex vi-background vi-padding" style=" ">
      <label for="upload-2" class="vi-upload">
        <input
          type="file"
          id="upload-2"
          accept="image/*"
          @change="e => uploadImage(e)"
        />
        <div
          class="vi-text  vi-flex is-justify-content--center is-align-items--center"
        >
          <span class="vi-icon" style="font-size: 24px">
            &#xe621;
          </span>
        </div>
      </label>
      <input
        type="text"
        class="vi-input is-input--smaller"
        v-model="custom.message"
        ref="editable"
        placeholder="请输入您申诉的内容..."
        @keyup.enter="sendMessage"
      />
      <div
        class="vi-padding-ad"
        v-if="custom.message"
        @click="custom.message = ''"
      >
        <span class="vi-icon" style="line-height: 28px">
          &#xe65e;
        </span>
      </div>
      <div>
        <div
          @click="sendMessage"
          class="vi-btn is-btn--pack is-btn--primary is-btn--radius is-btn--smaller"
        >
          发送
        </div>
      </div>
    </div>
    <div class="vv-custom-deatil" v-if="false">
      <vui-mask v-model="picture.show" transition-name="fade">
        <div
          class="vc-padding vc-flex--center"
          style="width: 100%;height: 100%;"
        >
          <img
            :src="picture.value"
            alt=""
            style="max-width: 100%;max-height: 100%"
          />
        </div>
      </vui-mask>
      <div class="vv-body" ref="body">
        <div class="vv-body__content">
          <div class="vc-text--center vc-margin--bm" v-if="!chat.push.finished">
            <span class="vc-text--theme" @click="loadMore">加载更多</span>
          </div>

          <div class="vv-chat">
            <div
              class=" vv-chat__item  vc-margin--bm"
              v-for="(item, i) in chats"
              :class="{
                'is-left': item['uidType'] === 2,
                'is-right': item['uidType'] === 1
              }"
              :key="i"
            >
              <!-- :class="{'is-left':item['type'] === 'left','is-right':item['type'] === 'right'}" -->
              <template v-if="item['uidType'] === 2">
                <div class="vv-chat__head">
                  <div class="vv-chat__head--inner vc-flex--center">
                    <span class="vc-text--white vc-text--bold vc-text--sm"
                      >客服</span
                    >
                    <!-- {{ item['nameFrom'] ? item['nameFrom'].split('')[0] : '' }} -->
                  </div>
                </div>
                <div>
                  <div class="vv-chat__content">
                    <div>
                      <div v-if="item['type'] === 0">
                        <span
                          class="vc-text vc-text--lg vc-text--baseline--md vc-text--break"
                          >{{ item["content"] }}</span
                        >
                      </div>
                      <div
                        v-if="item['type'] === 1"
                        @click="showPicture(item['content'])"
                      >
                        <img
                          :src="item['content']"
                          alt=""
                          style="max-width:200px;max-height:200px"
                        />
                      </div>
                    </div>
                    <i class="vv-chat__point"></i>
                  </div>
                  <div
                    class="vc-text--left vc-margin__sm--tp vc-margin--lt"
                    v-if="item['sendTimeStr']"
                  >
                    <span class=" vc-text--sm" style="color:#ddd">{{
                      item["sendTimeStr"]
                    }}</span>
                  </div>
                </div>
              </template>
              <template v-if="item['uidType'] === 1">
                <div>
                  <div class="vv-chat__content">
                    <div>
                      <div v-if="item['type'] === 0">
                        <span
                          class="vc-text vc-text--lg vc-text--baseline--md vc-text--break"
                          >{{ item["content"] }}</span
                        >
                      </div>
                      <div
                        v-if="item['type'] === 1"
                        @click="showPicture(item['content'])"
                      >
                        <img
                          :src="item['content']"
                          alt=""
                          style="max-width:200px;max-height:200px"
                        />
                      </div>
                    </div>
                    <i class="vv-chat__point"></i>
                  </div>
                  <div
                    class="vc-text--right vc-margin__sm--tp vc-margin--rt"
                    v-if="item['sendTimeStr']"
                  >
                    <span class=" vc-text--sm" style="color:#ddd">{{
                      item["sendTimeStr"]
                    }}</span>
                  </div>
                </div>
                <div class="vv-chat__head">
                  <div class="vv-chat__head--inner vc-flex--center">
                    <span class="vc-text--white vc-text--bold vc-text--sm"
                      >我</span
                    >
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="vv-header">
        <div class="vc-text--center" style="line-height:50px">
          <span class="vc-text--bold">{{ result["orderSn"] }}</span>
        </div>
      </div>

      <div class="vv-header" ref="header" v-if="false">
        <div class=" vv-cell vc-flex--between-center vc-border--bm ">
          <span class="vc-text vc-text--break vc-text--bold">
            {{ result["orderSn"] }}
          </span>
          <div>
            <Icon
              name="icon-arrow "
              class="vv-header__switch "
              :class="{ 'is-open': header.show }"
              @click.native.stop="header.show = !header.show"
            ></Icon>
          </div>
        </div>
        <div class="vv-header__detail " :class="{ 'is-show': header.show }">
          <div
            class=" vc-flex vc-content--between vc-border--bm vc-padding__md-lg "
          >
            <div
              class="vc-flex vc-direction--column vc-items--start vc-content--between"
            >
              <span class="vc-margin--bm vc-text--light">
                {{ result["payMode"] }}
              </span>
              <span class="vc-text--gray ">
                {{ result["advertiseType"] | strAdvertiseType }}
              </span>
            </div>
            <div
              class="vc-flex vc-direction--column vc-items--end vc-content--between"
            >
              <span class="vc-margin--bm vc-text--light"
                >￥{{ result["money"] }}</span
              >
              <span class="vc-text--gray ">{{ result["createTime"] }}</span>
            </div>
          </div>
        </div>

        <div
          class="vv-header__cell vc-flex vc-content--end vc-padding--ud vc-padding__md-lg--ad"
          v-if="false"
        >
          <div class="vc-btn is-circle is-hollow  vc-btn--primary ">
            关闭申诉
          </div>
        </div>
      </div>
      <div class="vv-footer">
        <div class="vv-footer__content">
          <div class="" style="width:28px;">
            <!--<Upload @change="selectPic"></Upload>-->
          </div>
          <div class="vc-flex--fit">
            <!--<van-field-->
            <!--v-model="custom.message"-->
            <!--type="textarea"-->
            <!--placeholder="请输入您申诉的内容..."-->
            <!--rows="1"-->
            <!--:autosize="{ maxHeight: 100, minHeight: 24 }"-->
            <!--/>-->
            <input
              type="text"
              class="vp-input"
              v-model="custom.message"
              ref="editable"
              placeholder="请输入您申诉的内容..."
              @keyup.enter="sendMessage"
            />
          </div>

          <div class="">
            <div
              class="vc-btn vc-btn--primary vc-btn--small is-radius"
              @click="sendMessage"
            >
              发送
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
