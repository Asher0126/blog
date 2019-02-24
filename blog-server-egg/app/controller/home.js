'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 获取总条数
    const total = await this.ctx.service.post.count();
    // 获取总数据
    const data = await this.ctx.service.post.findAll();
    this.ctx.body = { errcode: 0, errmsg: '', data: { total, data } };
  }

  async menu() {
    // 获取总条数
    const type = await this.ctx.service.type.findAll();
    // 获取总数据
    const tag = await this.ctx.service.tag.findAll();
    this.ctx.body = { errcode: 0, errmsg: '', data: { type, tag } };
  }
}

module.exports = HomeController;
