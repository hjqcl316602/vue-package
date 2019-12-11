let sum = function(array = []) {
  let result = 0;
  array.forEach(item => {
    result += item.money;
  });
  return result;
};

let Ball = function({ odds = 3, profit = 100, count = 5, step = 0.5 }) {
  this.odds = odds;
  this.profit = profit;
  this.count = count;
  this.step = step;
};
/**
 * 获取每次需要的金额
 * @returns {Array}
 */
Ball.prototype.getItems = function() {
  let result = [];
  for (let n = 0; n < this.count; n++) {
    let resultTotal = sum(result);
    let money = Math.ceil((this.profit + resultTotal) / (this.odds - 1));
    //money = String(money).slice(0, money.length - 1);
    money = String(money);
    money = money.substring(0, money.length - 1) + "9";
    money = Number(money);
    result.push({
      money,
      odds: this.odds,
      total: resultTotal + money
    });
  }
  return result;
};
/**
 * 获取总金额
 * @returns {Array}
 */
Ball.prototype.getTotal = function() {
  let result = [];
  for (let n = 0; n < this.count; n++) {
    let resultTotal = sum(result);
    let money = Math.ceil(
      (this.profit + resultTotal) / (this.odds + this.step * n - 1)
    );
    result.push({
      money,
      odds: this.odds + this.step * n
    });
  }
  return sum(result);
};

// 测试

let profit = 100; //每次获取的利润
let odds = 3.5; // 赔率
let count = 16; // 次数
let step = 0.4;
let ball = new Ball({ odds, profit, count, step });
console.log(ball.getItems());
