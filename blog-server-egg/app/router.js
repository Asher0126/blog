'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.backend.home.index);
  router.post('/api/login', controller.backend.login.index);
  router.get('/api/info', controller.backend.login.info);

  router.post('/upload', controller.index.upload);

  router.patch('/api/manager/:id/active/:active', controller.backend.manager.active);
  router.resources('managers', '/api/manager', controller.backend.manager);
  router.patch('/api/type/:id/active/:active', controller.backend.type.active);
  router.resources('types', '/api/type', controller.backend.type);
  router.patch('/api/tag/:id/active/:active', controller.backend.tag.active);
  router.resources('tags', '/api/tag', controller.backend.tag);
  router.patch('/api/post/:id/active/:active', controller.backend.post.active);
  router.resources('posts', '/api/post', controller.backend.post);
};
