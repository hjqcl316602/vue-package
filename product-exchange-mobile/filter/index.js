import Vue from "vue";
import shousand from "@package/es/stringer/shousand";
const filters = {
  strMoney(value) {
    return value + "";
  },
  toShousand(string) {
    return string == null ? "" : shousand(string);
  }
};
Object.keys(filters).forEach((key, i) => {
  Vue.filter(key, filters[key]);
});
