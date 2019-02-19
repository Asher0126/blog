'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const data = await this.ctx.service.user.findAll();
    this.ctx.body = { errcode: 0, errmsg: '', data };
  }
  async create() {
    await this.ctx.service.user.create();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async show() {
    const data = await this.ctx.service.user.find();
    this.ctx.body = { errcode: 0, errmsg: 'ok', data };
  }
  async update() {
    await this.ctx.service.user.update();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async destroy() {
    await this.ctx.service.user.destroy();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
}

module.exports = UserController;
