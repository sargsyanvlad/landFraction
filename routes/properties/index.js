const Router = require('koa-router');

const PropertyController = require('../../controllers/property/PropertyController');
const validator = require('../../modules/validator/index');
const { globalAuth } = require('../../middlewares/Auth');

const { USER_ROLES } = require('../../utils/constants');
const { propertyEditableSchema, propertyAddRequestBodySchema } = require('../../modules/validator/validationSchemas');

const router = new Router({
  prefix: '/properties'
});

router.post('/', globalAuth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  await validator.customValidation(ctx.request.body, propertyAddRequestBodySchema);

  const property = await PropertyController.create({ ...ctx.request.body, user: ctx.state.user });
  return ctx.created(property);
});

router.patch('/:id', globalAuth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  const { landLord } = ctx.state.user;
  const { id } = ctx.params;
  await validator.customValidation(ctx.request.body, propertyEditableSchema);

  const edited = await PropertyController.edit({ ...ctx.request.body }, id, landLord);
  return ctx.ok(edited);
});

router.get('/address', async (ctx) => {
  const addressRequestQuerySchema = {
    s: { type: 'string', optional: false, empty: false },
    tenantEmail: { type: 'email', optional: false, empty: false }
  };
  await validator.customValidation(ctx.request.query, addressRequestQuerySchema);
  const { s: address, tenantEmail } = ctx.request.query;

  const property = await PropertyController.checkPropertyByAddress(address, tenantEmail);

  return ctx.ok(property);
});

router.get('/my', globalAuth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  const { properties, total } = await PropertyController.getPropertiesForCurrentUser(ctx.state);

  return ctx.ok({ data: properties, meta: { total, limit: 50, offset: 0 } });
});

module.exports = router;
