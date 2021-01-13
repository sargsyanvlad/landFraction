const Router = require('koa-router');

const UnitLeaseController = require('../../controllers/unit/UnitLeaseController');
const UnitController = require('../../controllers/unit/UnitController');

const validator = require('../../modules/validator/index');

const { globalAuth: auth } = require('../../middlewares/Auth');

const { USER_ROLES } = require('../../utils/constants');
const { leaseBaseSchema, leaseUpdateSchema } = require('../../modules/validator/validationSchemas');

const router = new Router({
  prefix: '/:unitId/lease'
});

router.post('/', auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  await validator.customValidation(ctx.params, { unitId: { type: 'string', optional: false, empty: false } });
  await validator.customValidation(ctx.request.body, leaseBaseSchema);

  const { unitId } = ctx.params;
  const { landLord } = ctx.state.user;

  const unit = await UnitController.getUnit({ unitId, landLord });
  const lease = await UnitLeaseController.createUnitLease(unit, ctx.request.body);

  return ctx.created(lease);
});

router.patch('/', auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  await validator.customValidation(ctx.params, { unitId: { type: 'string', optional: false, empty: false } });
  await validator.customValidation(ctx.request.body, leaseUpdateSchema);

  const { unitId } = ctx.params;
  const { landLord } = ctx.state.user;

  const unit = await UnitController.getUnit({ unitId, landLord });
  const lease = await UnitLeaseController.updateUnitLease(unit, ctx.request.body);

  return ctx.created(lease);
});

module.exports = router;
