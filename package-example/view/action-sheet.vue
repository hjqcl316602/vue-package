<script>
export default {
  name: "",
  data() {
    return {
      options: [
        {
          text: "军事",
          value: 1
        },
        {
          text: "科技",
          value: 2
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "军事",
          value: 1
        },
        {
          text: "科技",
          value: 2
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "军事",
          value: 1
        },
        {
          text: "科技",
          value: 2
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "军事",
          value: 1
        },
        {
          text: "科技",
          value: 2
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "军事",
          value: 1
        },
        {
          text: "科技",
          value: 2
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "军事",
          value: 1
        },
        {
          text: "科技",
          value: 2
        },
        {
          text: "政治",
          value: 3
        },
        {
          text: "法制",
          value: 4
        }
      ]
    };
  },
  props: {},
  computed: {},
  methods: {
    selectAction() {
      this.$showActionSheet({
        options: this.options,
        select: function(item) {
          console.log(item);
        }
      });
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="">
    <div class="  vi-padding " style="height:1000px">
      <div class="vi-btn is-btn--pack is-btn--primary" @click="selectAction">
        选择
      </div>
    </div>
  </div>
</template>
