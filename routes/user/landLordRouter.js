const Router = require('koa-router');
const validator = require('../../modules/validator/index');
const { LandLordController } = require('../../controllers/user');

const router = new Router({
  prefix: '/landLord'
});

router.post('/signUp', async (ctx) => {
  await validator.asSignUp(ctx.request.body);
  const result = await LandLordController.signUp(ctx);
  return ctx.created(result);
});

module.exports = router;
