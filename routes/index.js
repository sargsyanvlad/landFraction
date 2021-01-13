/* eslint-disable func-names */
const Router = require('koa-router');

// const apiAuth = require('../middlewares/apiAuth');

const router = new Router({
  prefix: '/v1'
});

const userRouter = require('./user/userRouter');
const s3Routes = require('./aws/aws'); // TO DO for uploading files

const propertyRoutes = require('./properties');
const emailRoutes = require('./emails');
const unitRoutes = require('./units');

router.use(userRouter.routes());
router.use(s3Routes.routes());

router.use(propertyRoutes.routes());
router.use(emailRoutes.routes());
router.use(unitRoutes.routes());

router.get('/ping', async ctx => ctx.ok('pong v1.0.0'));

module.exports = function (app) {
  // app.use(apiAuth);
  app.use(router.routes());
  app.use(router.allowedMethods());
};
