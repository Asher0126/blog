'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    // 1. 查询用户信息
    const data = await this.ctx.service.user.findByNamePass();

    // 2. 判断数据是否存在
    if (data.length === 1) {
      const { id, name, password } = data[0];
      // 存在，保存到jwt
      const token = this.app.jwt.sign({ id, name, password }, this.app.config.jwt.secret, { expiresIn: '2h' });
      this.ctx.body = { errcode: 0, errmsg: '', token };
    } else {
      this.ctx.body = { errcode: 10001, errmsg: '用户名密码不正确' };
    }
  }
}

module.exports = LoginController;
