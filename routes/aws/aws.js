const Router = require('koa-router');
const S3Controller = require('../../controllers/aws/S3Controller');
const { globalAuth } = require('../../middlewares/Auth');

const router = new Router({
  prefix: '/s3'
});

router.get('/putUrl', globalAuth.asRole(), async (ctx) => {
  const result = await S3Controller.getSignedUrl(ctx.request.query);

  return ctx.created(result);
});

router.get('/objects', globalAuth.asRole(), async (ctx) => {
  const result = await S3Controller.getObjects(ctx.request.query);

  return ctx.ok(result);
});

router.delete('/objects', globalAuth.asRole(), async (ctx) => {
  const { key } = ctx.request.query;

  await S3Controller.deleteObject(key);

  return ctx.noContent();
});

module.exports = router;
