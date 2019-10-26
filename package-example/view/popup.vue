<script>
export default {
  name: "",
  data() {
    return {
      show: {
        bottom: false,
        right: false,
        left: false,
        top: false,
        demo: false
      }
    };
  },
  props: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<template>
  <div class="vi-padding">
    <div class="vi-btn" @click="show.top = true">上</div>
    <div class="vi-btn" @click="show.bottom = true">下</div>
    <div class="vi-btn" @click="show.left = true">左</div>
    <div class="vi-btn" @click="show.right = true">右</div>
    <div class="vi-btn" @click="show.demo = true">示例</div>
    <vui-popup v-model="show.top" type="top">
      <div class="vi-padding">
        <div style="height:500px">sdjskjd谁打的卡会计师</div>
      </div>
    </vui-popup>
    <vui-popup v-model="show.bottom" type="bottom">
      <div class="vi-padding">
        <div style="height:500px">sdjskjd谁打的卡会计师</div>
      </div>
    </vui-popup>
    <vui-popup v-model="show.left" type="left">
      <div class="vi-padding">
        <div style="height:500px;width:50vw">
          sdjskjd谁打的卡会计师sdjskjd谁打的卡会计师sdjskjd谁打的卡会计师sdjskjd谁打的卡会计师sdjskjd谁打的卡会计师
        </div>
      </div>
    </vui-popup>
    <vui-popup v-model="show.right" type="right">
      <div class="vi-padding">
        <div style="height:500px">sdjskjd谁打的卡会计师</div>
      </div>
    </vui-popup>
    <vui-popup v-model="show.demo" type="bottom">
      <vui-grail style=" height:70vh ">
        <div class="vi-padding" style="height:100%;overflow: auto">
          <div v-for="item in 15">
            sdjskjd阿萨达快捷的空间是肯定就是框架的斯柯达就开始就是快将定时夹快速简单快速就开始绝对是接口就是多少
          </div>
        </div>
        <vui-grail-child type="top" padding-height>
          <div class="vi-text-align--center">
            <span class="vi-font-weight--bold" style="line-height: 36px"
              >弹框标题
            </span>
          </div>
        </vui-grail-child>
        <vui-grail-child type="bottom" padding-height>
          <div class="vi-flex vi-justify-content--flex-end vi-padding">
            <div class="vi-margin-right">
              <div class="vi-btn is-btn--large" @click="show.demo = false">
                取消
              </div>
            </div>
            <div>
              <div class="vi-btn  is-btn--large is-btn--primary  ">确认</div>
            </div>
          </div>
        </vui-grail-child>
      </vui-grail>
    </vui-popup>
  </div>
</template>
