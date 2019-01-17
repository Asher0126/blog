'use strict';

// app/service/tag.js
const Service = require('egg').Service;

class TagService extends Service {
  async find() {
    const { id } = this.ctx.params;
    const tag = this.ctx.model.Tag;
    return await tag.findById(id);
  }
  async findAll() {
    const tag = this.ctx.model.Tag;
    return await tag.findAll();
  }
  async create() {
    const tag = this.ctx.model.Tag;
    const { title } = this.ctx.request.body;

    return await tag.create({ title });
  }
  async update() {
    const tag = this.ctx.model.Tag;
    const { title } = this.ctx.request.body;
    const { id } = this.ctx.params;

    return await tag.update({ title }, { where: { id } });
  }
  async destroy() {
    const tag = this.ctx.model.Tag;
    const { id } = this.ctx.params;

    return await tag.destroy({ where: { id } });
  }
  async active() {
    const tag = this.ctx.model.Tag;
    const { id, active } = this.ctx.params;

    return await tag.update({ active }, { where: { id } });
  }
}

module.exports = TagService;
