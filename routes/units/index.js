const Router = require('koa-router');

const UnitController = require('../../controllers/unit/UnitController');
const validator = require('../../modules/validator/index');
const { globalAuth: auth } = require('../../middlewares/Auth');

const { USER_ROLES } = require('../../utils/constants');
const {
  addUnitsRequestBodySchema,
  // upsertUnitsRequestBodySchema,
  updateUnitRequestSchema
} = require('../../modules/validator/validationSchemas');

const unitLeaseRoutes = require('./lease');
const unitTenantRoutes = require('./invitations');

const router = new Router({
  prefix: '/units'
});

router.post('/', auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  await validator.customValidation(ctx.request.body, addUnitsRequestBodySchema);
  const { landLord } = ctx.state.user;
  const { propertyId } = ctx.request.body;

  const units = await UnitController.create({ ...ctx.request.body, landLord, propertyId });

  return ctx.created({ data: units });
});

/*
router.put('/', auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  await validator.customValidation(ctx.request.body, upsertUnitsRequestBodySchema);
  const { landLord } = ctx.state.user;
  const { propertyId } = ctx.request.body;

  const units = await UnitController.createOrUpdate({ ...ctx.request.body, landLord, propertyId });

  return ctx.created({ data: units });
}); */


router.get('/:id', auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  const { landLord } = ctx.state.user;
  const { id: unitId } = ctx.params;
  const unit = await UnitController.getUnit({ unitId, landLord });

  return ctx.ok({ data: unit });
});

router.patch('/:id', auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  await validator.customValidation(ctx.request.body, updateUnitRequestSchema);

  const { landLord } = ctx.state.user;
  const { id } = ctx.params;

  const unit = await UnitController.updateUnit({ id, landLord, params: { ...ctx.request.body } });

  return ctx.accepted({ data: unit });
});

/**
 * @question => what happens when unit has tenants
 */
router.delete('/:id', auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  const { landLord } = ctx.state.user;
  const { id: unitId } = ctx.params;

  await UnitController.delete({ unitId, landLord });

  return ctx.noContent();
});

router.use(unitTenantRoutes.routes());
router.use(unitLeaseRoutes.routes());

module.exports = router;
