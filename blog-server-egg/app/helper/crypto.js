'use strict';

const crypto = require('crypto');

// md5加密
exports.md5 = function(password) {
  return crypto.createHash('md5').update(password).digest('hex');
};

// 比较密码是否相同
exports.compare = function(newPass, oldPass) {
  // 给新密码加密
  const pass = crypto.createHash('md5').update(newPass).digest('hex');

  // 比较新旧密码
  return pass === oldPass;
};

