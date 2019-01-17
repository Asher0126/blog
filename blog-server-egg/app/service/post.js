'use strict';

// app/service/post.js
const Service = require('egg').Service;

class PostService extends Service {
  async find() {
    const { id } = this.ctx.params;
    const post = this.ctx.model.Post;
    return await post.findById(id);
  }
  async findAll() {
    const post = this.ctx.model.Post;
    return await post.findAll();
  }
  async create() {
    const post = this.ctx.model.Post;
    const { title, content, type_id } = this.ctx.request.body;

    return await post.create({ title, content, type_id });
  }
  async update() {
    const post = this.ctx.model.Post;
    const { title, content, type_id } = this.ctx.request.body;
    const { id } = this.ctx.params;

    return await post.update({ title, content, type_id }, { where: { id } });
  }
  async destroy() {
    const post = this.ctx.model.Post;
    const { id } = this.ctx.params;

    return await post.destroy({ where: { id } });
  }
  async active() {
    const post = this.ctx.model.Post;
    const { id, active } = this.ctx.params;

    return await post.update({ active }, { where: { id } });
  }
}

module.exports = PostService;
