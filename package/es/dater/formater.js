import checker from "./checker";
import zer from "./zer";
/**
 * @name 时间格式化
 * @param {date} [date] 需要格式化的时间
 * @param {fmt} [ string ] 格式化规则 yyyy-MM-dd HH:mm:ss
 * @example console.log(formater(new Date(), "yyyy-MM-dd HH:mm:ss ")); => 2019-06-28 18:19:16
 */
let formater = function(date, fmt = "yyyy-MM-dd HH:mm:ss") {
  let checkDate = new Date(date);
  if (!checker(date))
    throw new Error("The first argument must be a valid date.");
  if (typeof fmt !== "string")
    throw new Error("The second argument must be string.");
  date = checkDate;
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
formater.chinese = function(timestamp, type = "year") {
  if (typeof timestamp !== "number")
    throw new Error("The first argument must be number.");
  if (timestamp < 0)
    throw new Error("The first argument must be not less than 0.");
  if (!["year", "month", "day", "hour", "minute", "second"].includes(type))
    throw new Error(
      "The second argument must be in year,month,day,hour,minute,second"
    );
  let types = [
    { cn: "年", en: "year", value: 365 * 24 * 60 * 60 * 1000 },
    { cn: "月", en: "month", value: 30 * 24 * 60 * 60 * 1000 },
    { cn: "日", en: "day", value: 24 * 60 * 60 * 1000 },
    { cn: "时", en: "hour", value: 60 * 60 * 1000, isZero: true },
    { cn: "分", en: "minute", value: 60 * 1000, isZero: true },
    { cn: "秒", en: "second", value: 1000, isZero: true }
  ];
  let result = "";
  let findIndex = types.findIndex(item => item.en === type);
  types
    .filter((item, index) => index >= findIndex)
    .forEach((type, index) => {
      let value = Math.floor(timestamp / type.value);
      console.log(value);
      result += (type.isZero ? zer(value) : value) + type.cn;
      timestamp -= value * type.value;
    });
  return result;
};
export default formater;
//console.log(formater("new Date()", "yyyy-MM-dd HH:mm:ss "));
