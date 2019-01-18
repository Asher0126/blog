'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    // 1. 查询用户信息
    const data = await this.ctx.service.manager.findByNamePass();

    // 2. 判断数据是否存在
    if (data) {
      const { id, name, password } = data;
      // 存在，保存到jwt
      const token = this.app.jwt.sign({ id, name, password }, this.app.config.jwt.secret, { expiresIn: '2h' });
      this.ctx.body = { errcode: 0, errmsg: '', data: { token } };
    } else {
      this.ctx.body = { errcode: 10001, errmsg: '用户名密码不正确/用户不存在' };
    }
  }
  async info() {
    // 1. 查询用户信息
    const data = await this.ctx.service.manager.findByJWT();

    if (data) {
      this.ctx.body = { errcode: 0, errmsg: '', data };
    } else {
      this.ctx.body = { errcode: 10001, errmsg: 'token错误/用户不存在' };
    }
  }
}

module.exports = LoginController;
