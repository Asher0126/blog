'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    const data = await this.ctx.service.manager.findAll();
    this.ctx.body = { errcode: 0, errmsg: '', data };
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
