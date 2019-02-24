'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;
  // console.log(app.model.define);

  const Tag = app.model.define('tag', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(30),
    active: TINYINT,
    created_at: DATE,
    updated_at: DATE,
  });

  Tag.associate = function() {
    app.model.Tag.belongsToMany(app.model.Post, { through: 'post_tag' });
  };

  return Tag;
};
