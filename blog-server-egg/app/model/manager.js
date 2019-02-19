'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;
  // console.log(app.model.define);

  const Manager = app.model.define('manager', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(32),
    active: TINYINT,
    created_at: DATE,
    updated_at: DATE,
  });

  // 登录信息：通过用户名和密码
  Manager.findByLogin = async function(where) {
    return await this.findOne({
      where,
    });
  };

  // don't use arraw function
  Manager.prototype.logSignin = async function() {
    return await this.update({ last_sign_in_at: new Date() });
  };

  return Manager;
};
