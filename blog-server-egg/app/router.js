'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/menu', controller.home.menu);

  router.post('/api/login', controller.login.index);
  router.get('/api/info', controller.login.info);

  router.post('/api/upload', controller.index.upload);

  router.patch('/api/manager/:id/active/:active', controller.manager.active);
  router.resources('managers', '/api/manager', controller.manager);
  router.patch('/api/type/:id/active/:active', controller.type.active);
  router.resources('types', '/api/type', controller.type);
  router.patch('/api/tag/:id/active/:active', controller.tag.active);
  router.resources('tags', '/api/tag', controller.tag);
  router.patch('/api/post/:id/active/:active', controller.post.active);
  router.resources('posts', '/api/post', controller.post);
};
