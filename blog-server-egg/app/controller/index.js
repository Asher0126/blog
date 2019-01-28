'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async upload() {
    const result = await this.ctx.service.file.upload();
    this.ctx.body = result;
  }
}

module.exports = IndexController;
