'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1547592559453_1090';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'blog',
  };

  exports.security = {
    csrf: {
      enable: false,
    },
  };

  exports.jwt = {
    secret: 'blog',
    expire: 7200,
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      // password: 'auth',
      password: '',
      db: 0,
    },
  };

  return config;
};
