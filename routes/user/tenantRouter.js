const Router = require('koa-router');
const validator = require('../../modules/validator/index');
const { globalAuth } = require('../../middlewares/Auth');
const { TenantController } = require('../../controllers/user');
const parseQueryParams = require('../../utils/queryParams');
const { onBoardSchema, idSchema } = require('../../modules/validator/validationSchemas');
const { USER_ROLES } = require('../../utils/constants');

const router = new Router({
  prefix: '/tenants'
});

router.post('/sign-up', globalAuth.asInvitation, async (ctx) => {
  await validator.asSignUp(ctx.request.body);
  const { invitation } = ctx.state;
  const result = await TenantController.signUp(ctx.request.body, invitation);
  return ctx.created(result);
});

router.get('/:id', globalAuth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  const { user } = ctx.state;
  const { params } = ctx;
  validator.customValidation(ctx.params, idSchema);
  const result = await TenantController.getTenantById(user, params);
  return ctx.ok(result);
});

router.get('/list/mine', globalAuth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  const queryParams = parseQueryParams(ctx.request.query);
  const { user } = ctx.state;
  const result = await TenantController.getMyTenants(user, queryParams);
  return ctx.ok(result);
});

router.get('/list/all', globalAuth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  const queryParams = parseQueryParams(ctx.request.query);
  const { user } = ctx.state;
  const result = await TenantController.getAllTenants(user, queryParams);
  return ctx.ok(result);
});

router.put('/on-board', globalAuth.asRole([USER_ROLES.TENANT]), async (ctx) => {
  console.log(ctx.request.body);
  await validator.customValidation(ctx.request.body, onBoardSchema);
  const { user } = ctx.state;
  const result = await TenantController.onBoard(user, ctx.request.body);
  return ctx.accepted(result);
});

module.exports = router;
