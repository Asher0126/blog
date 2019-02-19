'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;
  // console.log(app.model.define);

  const Type = app.model.define('type', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(30),
    parent_id: INTEGER,
    active: TINYINT,
    created_at: DATE,
    updated_at: DATE,
  });

  return Type;
};
