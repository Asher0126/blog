'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;
  console.log(app.model.define);

  const Manager = app.model.define('manager', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(32),
    active: TINYINT,
    created_at: DATE,
    updated_at: DATE,
  });

  return Manager;
};
