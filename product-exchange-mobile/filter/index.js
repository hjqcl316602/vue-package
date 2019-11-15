import Vue from "vue";
import shousand from "@package/es/stringer/shousand";
const filters = {
  strMoney(value) {
    return value + "";
  },
  toShousand(string) {
    return string == null ? "" : shousand(string);
  },
  toCeil(value) {
    return Number(value) ? Number(value).toFixed(0) : 0;
  },
  toAmount(value, price) {
    price = String(price);
    let len = price.length - price.indexOf(".");
  }
};
Object.keys(filters).forEach((key, i) => {
  Vue.filter(key, filters[key]);
});
