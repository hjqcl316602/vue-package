/**
 * created by 41587 on 2019/11/1
 */
// 数组去重
const distinct = function(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
};

const baseNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 获取直选
let getCompose = function() {
  let result = [];
  for (let n = 0; n < baseNumber.length; n++) {
    let firstNumber = baseNumber[n];
    for (let m = 0; m < baseNumber.length; m++) {
      let secondNumber = baseNumber[m];
      for (let l = 0; l < baseNumber.length; l++) {
        let thirdNumber = baseNumber[l];
        result.push(firstNumber + "" + secondNumber + "" + thirdNumber);
      }
    }
  }
  return result;
};

// 获取豹子
let getComposeLeopard = function() {
  let result = [];
  for (let l = 0; l < baseNumber.length; l++) {
    result.push(baseNumber[l] + "" + baseNumber[l] + "" + baseNumber[l]);
  }
  return result;
};

// 获取组三

let getCompose3 = function() {
  let result = [];
  for (let l = 0; l < baseNumber.length; l++) {
    for (let k = l + 1; k < baseNumber.length; k++) {
      let res = [
        baseNumber[l] + "" + baseNumber[l] + "" + baseNumber[k],
        baseNumber[l] + "" + baseNumber[k] + "" + baseNumber[k]
      ];
      result = result.concat(res);
    }
  }
  return result;
};

// 获取组六
let getCompose6 = function() {
  let result = [];
  for (let n = 0; n < baseNumber.length; n++) {
    for (let m = n + 1; m < baseNumber.length; m++) {
      for (let k = m + 1; k < baseNumber.length; k++) {
        result.push(baseNumber[n] + "" + baseNumber[m] + "" + baseNumber[k]);
      }
    }
  }
  return result;
};

let D6 = function() {
  this.compose6 = getCompose6();
};

// 设置胆码
D6.prototype.setGall = function(gall = []) {
  let result = [];
  for (let n = 0; n < gall.length; n++) {
    for (let m = n + 1; m < gall.length; m++) {
      for (let k = m + 1; k < gall.length; k++) {
        result.push(gall[n] + "" + gall[m] + "" + gall[k]);
      }
    }
  }
  this.compose6 = result;
  return this;
};

// 设置组合胆

D6.prototype.setComposeGall = function(gall = []) {
  let comspose = this.compose6;
  let resCompose = [];
  gall.forEach(ele => {
    let newCompose = comspose.filter(el => {
      return el.indexOf(ele) > -1;
    });
    resCompose = resCompose.concat(newCompose);
  });
  this.compose6 = distinct(resCompose);
  return this;
};

// 设置独胆
D6.prototype.setALoneGall = function(gall) {
  this.compose6 = this.compose6.filter(ele => {
    return ele.split("").includes(gall + "");
  });
  return this;
};

// 清除胆
D6.prototype.clearGall = function(gall = []) {
  gall.forEach(e => {
    this.compose6 = this.compose6.filter(ele => {
      return ele.indexOf(e) === -1;
    });
  });
  return this;
};

// 设置两个奇数
D6.prototype.setTwoOdd = function() {
  this.compose6 = this.compose6.filter(ele => {
    let split = ele.split("").map(ele => Number(ele));
    let bool1 = split[0] % 2 === 1 && split[1] % 2 === 1 && split[2] % 2 === 0;
    let bool2 = split[0] % 2 === 1 && split[1] % 2 === 0 && split[2] % 2 === 1;
    let bool3 = split[0] % 2 === 0 && split[1] % 2 === 1 && split[2] % 2 === 1;
    return bool1 || bool2 || bool3;
  });
  return this;
};

// 设置两个偶数
D6.prototype.setTwoEven = function() {
  this.compose6 = this.compose6.filter(ele => {
    let split = ele.split("").map(ele => Number(ele));
    let bool1 = split[0] % 2 === 0 && split[1] % 2 === 0 && split[2] % 2 === 1;
    let bool2 = split[0] % 2 === 0 && split[1] % 2 === 1 && split[2] % 2 === 0;
    let bool3 = split[0] % 2 === 1 && split[1] % 2 === 0 && split[2] % 2 === 0;
    return bool1 || bool2 || bool3;
  });
  return this;
};

// 设置奇偶性
D6.prototype.setParity = function(type = "odd") {
  this.compose6 = this.compose6.filter(ele => {
    let split = ele.split("").map(ele => Number(ele));
    let sumSplit = split[0] + split[1] + split[2];
    return type === "odd" ? sumSplit % 2 === 1 : sumSplit % 2 === 0;
  });
  return this;
};

// 设置大小性
D6.prototype.setBigOrSmall = function(type = "small") {
  this.compose6 = this.compose6.filter(ele => {
    let split = ele.split("").map(ele => Number(ele));
    let sumSplit = split[0] + split[1] + split[2];
    return type === "small" ? sumSplit <= 13 : sumSplit > 13;
  });
  return this;
};

// 清除和值
D6.prototype.clearSum = function(sum) {
  this.compose6 = this.compose6.filter(ele => {
    let split = ele.split("").map(ele => Number(ele));
    let sumSplit = split[0] + split[1] + split[2];
    return sumSplit !== sum;
  });
  return this;
};

// 清除顺子
D6.prototype.clearAlong = function() {
  let along = ["012", "123", "234", "345", "456", "567", "678", "789"];
  this.compose6 = this.compose6.filter(ele => {
    return !along.includes(ele);
  });
  return this;
};

// 清除全部是奇数
D6.prototype.clearOdd = function() {
  this.compose6 = this.compose6.filter(ele => {
    let split = ele.split("").map(ele => Number(ele));
    return !(split[0] % 2 === 1 && split[1] % 2 === 1 && split[2] % 2 === 1);
  });
  return this;
};

// 清除全部是偶数
D6.prototype.clearEven = function() {
  this.compose6 = this.compose6.filter(ele => {
    let split = ele.split("").map(ele => Number(ele));
    return !(split[0] % 2 === 0 && split[1] % 2 === 0 && split[2] % 2 === 0);
  });
  return this;
};

// 清除同时出现的两个数
D6.prototype.clearDoubleNumber = function(double = []) {
  double.forEach(dou => {
    dou = dou.split("").map(ele => Number(ele));
    this.compose6 = this.compose6
      .map(ele => ele.split("").map(ele => Number(ele)))
      .filter(ele => {
        return !(ele.indexOf(dou[0]) > -1 && ele.indexOf(dou[1]) > -1);
      })
      .map(ele => ele.join(""));
  });
  return this;
};

// 清除同时出现的两个数
D6.prototype.clearCompose = function(compose) {
  this.compose6 = this.compose6.filter(ele => {
    return !compose.includes(ele);
  });
  return this;
};
let prize = [
  "068",
  "238",
  "236",
  "578",
  "157",
  "239",
  "159",
  "256",
  "089",
  "016",
  "248"
];
let test = [
  "579",
  "235",
  "579",
  "014",
  "049",
  "146",
  "467",
  "128",
  "469",
  "016",
  "136",
  "137",
  "139",
  "348"
];
let double = ["63", "57", "59", "69", "09"];
let d6 = new D6()
  .clearGall([6, 4])
  .clearAlong()
  .clearEven()
  .clearOdd()
  .setBigOrSmall("small")
  .clearCompose([...prize, ...test])
  .clearDoubleNumber(double);

let compose6 = d6.compose6;
console.log(compose6.length, compose6.join("  "));
