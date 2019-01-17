'use strict';

// app/service/manager.js
const Service = require('egg').Service;
const crypto = require('../helper/crypto');

class ManagerService extends Service {
  async find() {
    const { id } = this.ctx.params;
    const manager = this.ctx.model.Manager;
    return await manager.findById(id);
  }
  async findAll() {
    const manager = this.ctx.model.Manager;
    return await manager.findAll();
  }
  async create() {
    const manager = this.ctx.model.Manager;
    let { name, password } = this.ctx.request.body;

    // 加密
    password = crypto.md5(password);
    console.log(password);

    return await manager.create({ name, password });
  }
  async update() {
    const manager = this.ctx.model.Manager;
    const { name } = this.ctx.request.body;
    const { id } = this.ctx.params;

    return await manager.update({ name }, { where: { id } });
  }
  async destroy() {
    const manager = this.ctx.model.Manager;
    const { id } = this.ctx.params;

    return await manager.destroy({ where: { id } });
  }
  async active() {
    const manager = this.ctx.model.Manager;
    const { id, active } = this.ctx.params;

    return await manager.update({ active }, { where: { id } });
  }
}

module.exports = ManagerService;
