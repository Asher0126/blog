'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
  async index() {
    // 获取总条数
    const total = await this.ctx.service.post.count();
    // 获取总数据
    const data = await this.ctx.service.post.findWithTagAndType();
    this.ctx.body = { errcode: 0, errmsg: '', data: { total, data } };
  }
  async create() {
    // 数据库有该标签，则关联，数据库没有该标签，则新增
    const result = await this.ctx.service.post.create();
    // console.log(result.id);

    // 组装 文章标签数据
    const data = [];
    const { tag_id } = this.ctx.request.body;
    tag_id.forEach(v => {
      data.push({
        post_id: result.id,
        tag_id: v,
      });
    });
    // console.log(this.ctx.service);
    await this.ctx.service.postTag.create(data);

    // 返回数据
    this.ctx.body = { errcode: 0, errmsg: 'ok' };
  }
  async show() {
    const data = await this.ctx.service.post.findWithTag();
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
