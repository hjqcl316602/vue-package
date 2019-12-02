import Vue from "vue";
const filters = {
  toTime(value) {
    if (typeof value !== "number") return 0;
    const MINUTE = 60 * 1000;
    let minutes = Math.floor(value / MINUTE);
    let seconds = Math.floor((value - minutes * MINUTE) / 1000);
    // console.log(minutes,seconds)
    return minutes === 0 && seconds === 0
      ? "已过期"
      : minutes === 0
      ? `${seconds}秒`
      : `${minutes}分 ${seconds}秒`;
  }
};
Object.keys(filters).forEach((key, i) => {
  Vue.filter(key, filters[key]);
});
