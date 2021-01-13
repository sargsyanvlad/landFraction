/* eslint-disable no-console */
const Router = require('koa-router');
const validator = require('../../modules/validator/index');
const landLordRoutes = require('./landLordRouter');
const tenantRoutes = require('./tenantRouter');
const { UserController } = require('../../controllers/user');
const { globalAuth } = require('../../middlewares/Auth');

const router = new Router({
  prefix: '/users'
});

router.use(landLordRoutes.routes());
router.use(tenantRoutes.routes());

router.get('/me', globalAuth.asRole(), async ctx => ctx.ok({ data: ctx.state.user }));

router.post('/login', async (ctx) => {
  const schema = {
    email: {
      type: 'email',
      optional: false,
      convert: true,
      empty: false
    },
    password: {
      type: 'string',
      optional: false,
      convert: true,
      empty: false
    }
  };

  const { body } = ctx.request;
  validator.customValidation(body, schema);

  const result = await UserController.login(body);
  return ctx.ok(result);
});

router.delete('/logout', globalAuth.asRole([]), async (ctx) => {
  const { authorization } = ctx.request.headers;
  const { user } = ctx.state;
  await UserController.logOut(user, authorization);
  return ctx.noContent();
});

router.post('/forgot-password', async (ctx) => {
  const schema = {
    email: {
      type: 'email',
      optional: false,
      convert: true,
      empty: false
    }
  };
  const { body } = ctx.request;
  validator.customValidation(body, schema);

  const result = await UserController.forgotPassword(body);
  return ctx.ok(result);
});

router.patch('/reset-password', globalAuth.asResetToken, async (ctx) => {
  const schema = {
    password: {
      type: 'string',
      optional: false,
      empty: false,
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
    },
    resetToken: {
      type: 'string',
      optional: false,
      empty: false
    }
  };
  const { user } = ctx.state;
  const { body } = ctx.request;

  validator.customValidation(body, schema);
  await UserController.resetPassword(user, body);
  return ctx.noContent();
});

router.patch('/change-password', globalAuth.asRole([]), async (ctx) => {
  const schema = {
    password: {
      type: 'string',
      optional: false,
      empty: false,
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
    },
    oldPassword: {
      type: 'string',
      optional: false,
      empty: false
    }
  };
  const { body } = ctx.request;
  const { user } = ctx.state;
  validator.customValidation(body, schema);
  const result = await UserController.changePassword(user, body);
  return ctx.ok(result);
});

module.exports = router;
