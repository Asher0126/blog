'use strict';

// app/service/post_tag.js
const Service = require('egg').Service;

class PostTagService extends Service {
  async find() {
    const { id } = this.ctx.params;
    const post = this.ctx.model.PostTag;
    return await post.findById(id);
  }
  async count() {
    const post = this.ctx.model.PostTag;
    return await post.count();
  }
  async findAll() {
    const post = this.ctx.model.PostTag;
    return await post.findAll({
      include: [
        { model: this.ctx.model.Type, as: 'type' },
        { model: this.ctx.model.Tag, as: 'tags' },
      ],
    });
  }
  async create(data) {
    const post = this.ctx.model.PostTag;

    return await post.bulkCreate(data);
  }
  async update() {
    const post = this.ctx.model.PostTag;
    const { title, content, type_id } = this.ctx.request.body;
    const { id } = this.ctx.params;

    return await post.update({ title, content, type_id }, { where: { id } });
  }
  async destroy() {
    const post = this.ctx.model.PostTag;
    const { id } = this.ctx.params;

    return await post.destroy({ where: { id } });
  }
  async active() {
    const post = this.ctx.model.PostTag;
    const { id, active } = this.ctx.params;

    return await post.update({ active }, { where: { id } });
  }
}

module.exports = PostTagService;
