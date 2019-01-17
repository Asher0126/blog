'use strict';

// app/service/type.js
const Service = require('egg').Service;

class TypeService extends Service {
  async find() {
    const { id } = this.ctx.params;
    const type = this.ctx.model.Type;
    return await type.findById(id);
  }
  async findAll() {
    const type = this.ctx.model.Type;
    return await type.findAll();
  }
  async create() {
    const type = this.ctx.model.Type;
    const { title, parent_id } = this.ctx.request.body;

    return await type.create({ title, parent_id });
  }
  async update() {
    const type = this.ctx.model.Type;
    const { title, parent_id } = this.ctx.request.body;
    const { id } = this.ctx.params;

    return await type.update({ title, parent_id }, { where: { id } });
  }
  async destroy() {
    const type = this.ctx.model.Type;
    const { id } = this.ctx.params;

    return await type.destroy({ where: { id } });
  }
  async active() {
    const type = this.ctx.model.Type;
    const { id, active } = this.ctx.params;

    return await type.update({ active }, { where: { id } });
  }
}

module.exports = TypeService;
