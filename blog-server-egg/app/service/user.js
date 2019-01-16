'use strict';

// app/service/user.js
const Service = require('egg').Service;
const crypto = require('../helper/crypto');

class UserService extends Service {
  async find() {
    const { id } = this.ctx.params;
    const user = this.ctx.model.User;
    return await user.findById(id);
  }
  async findByNamePass() {
    const user = this.ctx.model.User;
    let { name, password } = this.ctx.request.body;

    password = crypto.md5(password);
    return await user.findAll({ where: { name, password }, limit: 1 });
  }
  async findAll() {
    const user = this.ctx.model.User;
    return await user.findAll();
  }
  async create() {
    const user = this.ctx.model.User;
    let { name, age, password } = this.ctx.request.body;

    // 加密
    password = crypto.md5(password);
    console.log(password);

    return await user.create({ name, age, password });
  }
  async update() {
    const user = this.ctx.model.User;
    const { name } = this.ctx.request.body;
    const { id } = this.ctx.params;

    return await user.update({ name }, { where: { id } });
  }
  async destroy() {
    const user = this.ctx.model.User;
    const { id } = this.ctx.params;

    return await user.destroy({ where: { id } });
  }
}

module.exports = UserService;
