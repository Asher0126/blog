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
  async count() {
    const manager = this.ctx.model.Manager;
    return await manager.count();
  }
  async findAll() {
    // page：当前页码， limit限制条数
    let { page = 1, limit = 20, name, active } = this.ctx.request.query;
    // offset：偏移条数
    const offset = (page - 1) * limit;
    // limit需要转换为数值类型
    limit = Number(limit);

    // 搜索条件
    const where = {};

    if (name) {
      where.name = {
        $like: `%${name}%`,
      };
    }
    if (active === '0' || active === '1') {
      where.active = active;
    }

    const manager = this.ctx.model.Manager;
    return await manager.findAll({ limit, offset, where });
  }
  async findByLogin() {
    const manager = this.ctx.model.Manager;
    let { name, password } = this.ctx.request.body;

    password = crypto.md5(password);
    return await manager.findByLogin({ name, password });
  }
  async findByJWT() {
    const manager = this.ctx.model.Manager;
    // console.log(this.ctx.request.headers.authorization);
    const { authorization } = this.ctx.request.headers;
    const token = authorization.split(' ')[1];

    const user = this.app.jwt.verify(token, this.app.config.secret);

    return await manager.findById(user.id);
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
