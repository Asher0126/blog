'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING, TEXT, TINYINT } = Sequelize;
    await queryInterface.createTable('posts', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: {
        type: STRING(120),
        allowNull: false,
      },
      content: {
        type: TEXT,
        allowNull: false,
      },
      read_num: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      type_id: {
        type: INTEGER,
        allowNull: false,
      },
      active: {
        type: TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
          max: 2,
          min: 0,
        },
      },
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('posts', [ 'title' ], {
      type: 'unique',
      name: 'post_title',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('posts');
  },
};
