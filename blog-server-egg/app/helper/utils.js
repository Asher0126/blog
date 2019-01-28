'use strict';

// 获取随机数
function rand(m, n) {
  return Math.floor(Math.random() * (n - m + 1));
}

// 定义一个文件名：日期+原文件名
exports.getFilename = function() {
  const moment = require('moment');
  // 设置随机的文件名
  return moment().format('YYYYMMDDHHmmss') + rand(1000, 9999);
};
