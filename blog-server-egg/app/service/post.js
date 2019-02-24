'use strict';

// app/service/post.js
const Service = require('egg').Service;

class PostService extends Service {
  async find() {
    const { id } = this.ctx.params;
    const post = this.ctx.model.Post;
    return await post.findById(id);
  }
  // 查询文章信息，并包含tag信息
  async findWithTag() {
    const { id } = this.ctx.params;
    const post = this.ctx.model.Post;
    return await post.findOne({ where: { id }, include: { model: this.ctx.model.Tag, as: 'tags' } });
  }
  async findWithTagAndType() {
    const post = this.ctx.model.Post;
    return await post.findAll({
      include: [
        { model: this.ctx.model.Type, as: 'type' },
        { model: this.ctx.model.Tag, as: 'tags' },
      ],
    });
  }
  async count() {
    const { type_id } = this.ctx.request.query;

    // 搜索条件
    const where = {};
    // 有类型搜索
    if (type_id) {
      where.type_id = type_id;
    }

    const post = this.ctx.model.Post;
    return await post.count({ where });
  }
  async findAll() {
    // page：当前页码， limit限制条数
    let { page = 1, limit = 10, type_id, tag_id } = this.ctx.request.query;
    // offset：偏移条数
    const offset = (page - 1) * limit;
    // limit需要转换为数值类型
    limit = Number(limit);

    // 搜索条件
    const where = {};
    // 有类型搜索
    if (type_id) {
      where.type_id = type_id;
    }
    // if (tag_id) {
    //   where.tag_id = tag_id;
    // }

    const post = this.ctx.model.Post;
    return await post.findAll({
      limit,
      offset,
      where,
      include: [
        { model: this.ctx.model.Tag },
      ] });
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
