<script>
export default {
  name: "",
  data() {
    return {
      list: 20
    };
  },
  props: {},
  computed: {},
  methods: {
    loadmore() {
      this.list += 20;
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="" style="height:500px;overflow: auto">
    <vui-loadmore @load="loadmore" loaded>
      <div
        class="vi-text-align--center vi-padding--large vi-border vi-border is-border--bottom is-border--thiner"
        style="background-color: #fff;"
        v-for="(item, index) in list"
      >
        <span class="vi-font-size--large">
          三大框架数据库的接口手机端看时间初级会计师的
        </span>
      </div>
      <div slot="footer">
        <span>没有更多了~</span>
      </div>
    </vui-loadmore>
  </div>
</template>
