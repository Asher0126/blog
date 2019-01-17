'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async index() {
    const data = await this.ctx.service.type.findAll();
    this.ctx.body = { errcode: 0, errmsg: '', data };
  }
  async create() {
    await this.ctx.service.type.create();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async show() {
    const data = await this.ctx.service.type.find();
    this.ctx.body = { errcode: 0, errmsg: 'ok', data };
  }
  async update() {
    await this.ctx.service.type.update();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async active() {
    await this.ctx.service.type.active();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
}

module.exports = TypeController;
