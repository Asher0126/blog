'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    // 获取总条数
    const total = await this.ctx.service.manager.count();
    // 获取所有的数据
    const data = await this.ctx.service.manager.findAll();

    // 拼装返回结果
    this.ctx.body = { errcode: 0, errmsg: '', data: { total, data } };
  }
  async create() {
    await this.ctx.service.manager.create();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async show() {
    const data = await this.ctx.service.manager.find();
    this.ctx.body = { errcode: 0, errmsg: 'ok', data };
  }
  async update() {
    await this.ctx.service.manager.update();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async active() {
    await this.ctx.service.manager.active();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
}

module.exports = ManagerController;
