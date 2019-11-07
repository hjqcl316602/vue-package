<script>
import { domer } from "@package/es";
import { uploadCompressImage } from "@/request/upload";
import { getHistoryMessageCdPKf } from "@/request/chat";
import { mapState } from "vuex";
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
import config from "@/config";
export default {
  name: "",
  data() {
    return {
      params: {
        type: ""
      },
      chat: {
        message: "",
        list: [],
        loading: false, //当前请求是否加载完
        pageSize: 20,
        connected: false,
        finished: true // 是否已加载完聊天数据
      }
    };
  },
  props: {},
  computed: {
    ...mapState({
      userMember: state => state.user.member
    })
  },
  methods: {
    init() {
      this.params.type = this.$route.query.type;
      this.getChatMessage();
      this.createConnectSocket();
    },

    /**
     * 建立联系
     */

    createConnectSocket: function() {
      let promise = new Promise((resolve, reject) => {
        this.closeSocket();
        let self = this;
        var socket = new SockJS(config.http + "/chat/socket/chat-webSocket");
        this._stompClientChat = Stomp.over(socket);
        this._stompClientChat.debug = function name(params) {
          console.log(params);
        };
        this._stompClientChat.connect(
          {},
          function(frame) {
            self.$message.success("聊天室连接成功，可以进行聊天了~");
            self.chat.connected = true;
            resolve();
          },
          function() {
            self.$message.success("聊天室连接失败，请重试");

            self.chat.connected = false;
            reject();
          }
        );
      }).then(res => {
        this._stompClientChat.subscribe(
          "/topic/chatMsg/cd/" + this.userMember.id,
          res => {
            let message = JSON.parse(res.body);
            console.log("chat-socket-message");
            console.log(message);

            if (message["uidType"] != 5) return;
            this.getChatMessage();
          }
        );
      });
    },
    /**
     * 订阅发送信息
     */
    sendSocketMessage({ content, type }) {
      let message = {};
      message["uidFrom"] = this.userMember.id;
      message["nameFrom"] = this.userMember.username;
      message["content"] = content;
      message["type"] = type;
      message["uidType"] = 7;
      //message["nameTo"] = this.message["kfName"]; 自动分配客服
      //message["uidTo"] = this.message["kfId"];
      console.log("chat-message");
      this.chat.list.push(message);
      this.scrollToBottom();
      this._stompClientChat.send(
        "/app/message/chat",
        {},
        JSON.stringify(message)
      );
    },

    /**
     * 发送文本消息
     */

    sendMessage: function() {
      if (!this.chat.connected) {
        return this.$message.danger("当前聊天室连接未成功，请重试");
      }
      if (!this.chat.message) {
        return this.$message.danger("聊天内容不能为空！");
      }
      this.sendSocketMessage({ content: this.chat.message, type: 0 });
      this.chat.message = "";
    },

    /**
     * 关闭实时通信
     */
    closeSocket() {
      if (this._stompClientChat) {
        this._stompClientChat.disconnect();
        this._stompClientChat = null;
      }
    },
    getChatMessage(more = false) {
      if (this.params.type === "user") {
        console.log("user");
        if (this.chat.loading) return this.$message.danger("正在加载中");

        this.chat.loading = true;
        let params = {
          cdId: this.userMember.id
        };
        if (more) {
          params.minChatId = this.chat.list[0]["chatId"];
        } else {
          params.minChatId = 0;
        }
        getHistoryMessageCdPKf(params)
          .then(({ data }) => {
            this.chat.loading = false;
            if (data.code === "000") {
              let list = data.data ? data.data.reverse() : [];
              this.chat.finished = this.chat.pageSize > list.length;

              if (more) {
                this.chat.list = [...list, ...this.chat.list];
              } else {
                this.chat.list = list;
                this.scrollToBottom();
              }
            } else {
              this.$message.danger("加载失败");
            }
          })
          .catch(e => {
            this.$message.danger("加载失败");
            this.chat.loading = false;
          });
      }
    },
    uploadImage(e) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      e.target.value = "";
      uploadCompressImage(formData).then(({ data }) => {
        if (data.code === "000" && data.data && data.data.url) {
          this.sendSocketMessage({ content: data.data.url, type: 1 });
        } else {
          this.$message.danger("图片上传失败");
        }
      });
    },
    /**
     * 让滚动条始终在底部
     */
    scrollToBottom() {
      setTimeout(() => {
        let scrollHeight = domer.scroller.scrollHeight(this.$refs["chat-body"]);
        domer.scroller.scrollTop(window, scrollHeight);
      }, 500);
    },
    /**
     * 判断是否是用户自己
     */
    checkMine(item) {
      return item["uidType"] === 7;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="" style="padding-bottom: 50px">
    <div class="vv-chat" ref="chat-body">
      <div
        class="vi-text is-align--center"
        style="line-height: 44px"
        v-if="!chat.finished"
        @click="getChatMessage(true)"
      >
        <span class="vi-text is-color--primary">加载更多</span>
      </div>
      <div
        class="vv-chat-row "
        :class="{
          'is-row--left': !checkMine(item),
          'is-row--right': checkMine(item)
        }"
        v-for="(item, index) in chat.list"
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
        v-model="chat.message"
      />
      <div class="vi-padding-ad" v-if="chat.message" @click="chat.message = ''">
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
  </div>
</template>
