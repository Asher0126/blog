'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
  async index() {
    const data = await this.ctx.service.post.findAll();
    this.ctx.body = { errcode: 0, errmsg: '', data };
  }
  async create() {
    await this.ctx.service.post.create();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async show() {
    const data = await this.ctx.service.post.find();
    this.ctx.body = { errcode: 0, errmsg: 'ok', data };
  }
  async update() {
    await this.ctx.service.post.update();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async active() {
    await this.ctx.service.post.active();
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
}

module.exports = PostController;
