'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, TINYINT } = app.Sequelize;
  console.log(app.model.define);

  const Post = app.model.define('post', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(120),
    content: TEXT,
    type_id: INTEGER,
    read_num: INTEGER,
    active: TINYINT,
    created_at: DATE,
    updated_at: DATE,
  });

  return Post;
};
