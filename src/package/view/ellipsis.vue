<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 09:09:41
 * @LastEditTime: 2019-09-06 17:37:00
 * @LastEditors: Please set LastEditors
 * @msg 该方式的缺点是需要知道背景颜色
 -->
<script>
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    show: {
      model1: false,
      model2: true,
      clamp1: false,
      clamp2: false,
      lineHeight1: false,
      lineHeight2: false,
      slot: false
    },
    message:
      "飒飒阿萨稍微UI未读数你觉得呢是贷款手机  打开圣诞节开始东山街道你市地税局倒计时对大家说近段时间对大家说旧电脑上东山街道说的就手机端手机端那就手机端手机端就是觉得就算东山街道是觉得就算第三代计算机单击说的就是觉得就算你大数据的建设大街是的"
  };
};
instance.computed = {};
instance.methods = {
  handler(type, show) {
    this.show[show] = type !== "roll";
  }
};
instance.created = function() {};
instance.mounted = function() {};
instance.watch = {};
export default instance;
</script>

<template>
  <div class="vui-padding--large">
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom  ">
        <div class="vui-text--bold vui-text--primary">
          v-model
        </div>
        <div class="vui-text--light">
          是否展开 | boolean | v-model=false（默认值）
        </div>
      </div>
      <div class="">
        <vui-ellipsis ref="ellipsis" v-model="show.model1">
          <div style="line-height:18px">
            {{ message }}
          </div>
          <div
            slot="spread"
            class="vui-text-align--right "
            @click="handler('spread', 'model1')"
          >
            <vui-icon name="bottom-surface"></vui-icon>
          </div>
          <div
            slot="roll"
            class="vui-text-align--right "
            @click="handler('roll', 'model1')"
          >
            <vui-icon name="top-surface"></vui-icon>
          </div>
        </vui-ellipsis>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom  ">
        <div class="vui-text--bold vui-text--primary">
          v-model
        </div>
        <div class="vui-text--light">
          是否展开 | boolean | v-model=true
        </div>
      </div>
      <div class="">
        <vui-ellipsis ref="ellipsis" v-model="show.model2">
          <div style="line-height:18px">
            {{ message }}
          </div>
          <div
            slot="spread"
            class="vui-text-align--right "
            @click="handler('spread', 'model2')"
          >
            <vui-icon name="bottom-surface"></vui-icon>
          </div>
          <div
            slot="roll"
            class="vui-text-align--right "
            @click="handler('roll', 'model2')"
          >
            <vui-icon name="top-surface"></vui-icon>
          </div>
        </vui-ellipsis>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom  ">
        <div class="vui-text--bold vui-text--primary">
          clamp
        </div>
        <div class="vui-text--light">
          行数 | string | number | clamp = 1（默认值）
        </div>
      </div>
      <div class="">
        <vui-ellipsis ref="ellipsis" v-model="show.clamp1">
          <div style="line-height:18px">
            {{ message }}
          </div>
          <div
            slot="spread"
            class="vui-text-align--right "
            @click="handler('spread', 'clamp1')"
          >
            <vui-icon name="bottom-surface"></vui-icon>
          </div>
          <div
            slot="roll"
            class="vui-text-align--right "
            @click="handler('roll', 'clamp1')"
          >
            <vui-icon name="top-surface"></vui-icon>
          </div>
        </vui-ellipsis>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom  ">
        <div class="vui-text--bold vui-text--primary">
          clamp
        </div>
        <div class="vui-text--light">
          行数 | string | number | clamp = 2
        </div>
      </div>
      <div class="">
        <vui-ellipsis ref="ellipsis" v-model="show.clamp2" :clamp="2">
          <div style="line-height:18px">
            {{ message }}
          </div>
          <div
            slot="spread"
            class="vui-text-align--right "
            @click="handler('spread', 'clamp2')"
          >
            <vui-icon name="bottom-surface"></vui-icon>
          </div>
          <div
            slot="roll"
            class="vui-text-align--right "
            @click="handler('roll', 'clamp2')"
          >
            <vui-icon name="top-surface"></vui-icon>
          </div>
        </vui-ellipsis>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom  ">
        <div class="vui-text--bold vui-text--primary">
          line-height
        </div>
        <div class="vui-text--light">
          行高 | string | line-height = 18px（默认值）
        </div>
      </div>
      <div class="">
        <vui-ellipsis ref="ellipsis" v-model="show.lineHeight1">
          <div style="line-height:18px">
            {{ message }}
          </div>
          <div
            slot="spread"
            class="vui-text-align--right "
            @click="handler('spread', 'lineHeight1')"
          >
            <vui-icon name="bottom-surface"></vui-icon>
          </div>
          <div
            slot="roll"
            class="vui-text-align--right "
            @click="handler('roll', 'lineHeight1')"
          >
            <vui-icon name="top-surface"></vui-icon>
          </div>
        </vui-ellipsis>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom  ">
        <div class="vui-text--bold vui-text--primary">
          line-height
        </div>
        <div class="vui-text--light">
          行高 | string | line-height = 30px
        </div>
      </div>
      <div class="">
        <vui-ellipsis
          ref="ellipsis"
          v-model="show.lineHeight2"
          line-height="30px"
          :clamp="2"
        >
          <div style="line-height:30px">
            {{ message }}
          </div>
          <div
            slot="spread"
            class="vui-text-align--right "
            @click="handler('spread', 'lineHeight2')"
          >
            <vui-icon name="bottom-surface"></vui-icon>
          </div>
          <div
            slot="roll"
            class="vui-text-align--right "
            @click="handler('roll', 'lineHeight2')"
          >
            <vui-icon name="top-surface"></vui-icon>
          </div>
        </vui-ellipsis>
      </div>
    </div>

    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom  ">
        <div class="vui-text--bold vui-text--primary">
          slot
        </div>
        <div class="vui-text--light">
          slot='spread' | slot='roll'
        </div>
      </div>
      <div class="">
        <vui-ellipsis
          ref="ellipsis"
          v-model="show.slot"
          line-height="30px"
          :clamp="2"
        >
          <div style="line-height:30px">
            {{ message }}
          </div>
          <div
            slot="spread"
            class="vui-text-align--right "
            @click="handler('spread', 'slot')"
          >
            展开
          </div>
          <div
            slot="roll"
            class="vui-text-align--right "
            @click="handler('roll', 'slot')"
          >
            卷起
          </div>
        </vui-ellipsis>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
