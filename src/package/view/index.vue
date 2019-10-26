<script>
import routes from "../router/routes";
console.log(routes);
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {};
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
    <div class="vui-background-color--white">
      <vui-border
        bottom
        color="#aaa"
        :size="1 / 3"
        v-for="(item, index) in routes"
        :key="index"
      >
        <div class="vui-padding--large">
          <div @click="changeRoute(item)">
            <vui-grid>
              <vui-grid-child flex-grow="1">
                <span class="">
                  {{ item["meta"]["title"] }}
                </span>
              </vui-grid-child>
              <vui-grid-child flex-grow="0" class="vui-center--vertical">
                <span class="vui-margin-right vui-text--light">
                  {{ item["meta"]["en"] }}
                </span>
                <vui-icon name="right" color="light"></vui-icon>
              </vui-grid-child>
            </vui-grid>
          </div>
        </div>
      </vui-border>
    </div>
  </div>
</template>

<style scoped></style>
