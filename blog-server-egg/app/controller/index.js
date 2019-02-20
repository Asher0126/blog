'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async upload() {
    const result = await this.ctx.service.file.upload();
    // this.ctx.body = result.url;
    this.ctx.body = { errcode: 0, errmsg: '', data: result.url };
  }
}

module.exports = IndexController;
