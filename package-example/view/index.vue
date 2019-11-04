<script>
import routes from "../router/routes";
//console.log(routes);
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    cssRouters: [
      {
        name: "text",
        text: "文本"
      },
      {
        name: "button",
        text: "按钮"
      },
      {
        name: "input",
        text: "输入框"
      },
      {
        name: "gird",
        text: "栅格布局"
      },
      {
        name: "flex",
        text: "flex布局"
      },
      {
        name: "border",
        text: "边框"
      }
    ]
  };
};
instance.methods = {
  changeRoute(item) {
    this.$router.push({ name: item.name });
  }
};
instance.created = function() {};
instance.mounted = function() {};
instance.computed = {
  routes() {
    return routes.filter(ele => {
      return ele["meta"] && !ele["meta"]["hide"];
    });
  }
};
export default instance;
</script>

<template>
  <div class="">
    <div class="vi-text is-height--medium vi-padding-ad">
      <span class="vi-text is-weight--bold">css库</span>
    </div>
    <div class="vi-background vi-margin-bottom">
      <div
        class="   vi-padding-ad vi-border is-border--bottom is-border--thiner  "
        style="line-height: 50px"
        v-for="(item, index) in cssRouters"
        @click="changeRoute(item)"
      >
        <div class="vi-flex">
          <div class="vi-flex-item is-flex--1">
            <span>
              {{ item.text }}
            </span>
          </div>
          <div class="vi-flex">
            <div>
              <span>
                {{ item.name }}
              </span>
            </div>
            <div class="vi-margin-left">
              <span class="vi-icon   ">&#xe735;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vi-text is-height--medium vi-padding-ad">
      <span class="vi-text is-weight--bold">ui库</span>
    </div>
    <div class="vi-background">
      <div
        class="  is-height--larger vi-padding-ad vi-border is-border--bottom is-border--thiner"
        style="line-height: 50px"
        v-for="(item, index) in routes"
        @click="changeRoute(item)"
      >
        <div class="vi-flex">
          <div class="vi-flex-item is-flex--1">
            <span>
              {{ item["meta"]["title"] }}
            </span>
          </div>
          <div class="vi-flex">
            <div>
              <span>
                {{ item["meta"]["en"] }}
              </span>
            </div>
            <div class="vi-margin-left">
              <span class="vi-icon   ">&#xe735;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
