'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async index() {
    const data = await this.ctx.service.tag.findAll();
    this.ctx.body = { errcode: 0, errmsg: '', data };
  }
  async create() {
    await this.ctx.service.tag.create();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async show() {
    const data = await this.ctx.service.tag.find();
    this.ctx.body = { errcode: 0, errmsg: 'ok', data };
  }
  async update() {
    await this.ctx.service.tag.update();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async active() {
    await this.ctx.service.tag.active();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
}

module.exports = TagController;
