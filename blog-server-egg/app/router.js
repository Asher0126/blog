'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.backend.home.index);
  router.post('/api/login', controller.backend.login.index);
  router.post('/api/logout', controller.backend.login.logout);

  router.resources('users', '/api/user', controller.backend.user);
};
