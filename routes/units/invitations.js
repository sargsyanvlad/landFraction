const Router = require('koa-router');

const validator = require('../../modules/validator/index');

const UnitInvitationController = require('../../controllers/unit/UnitInvitationController');
const UnitController = require('../../controllers/unit/UnitController');

const { globalAuth: auth } = require('../../middlewares/Auth');

const { USER_ROLES } = require('../../utils/constants');
const { tenantInvitationSchema } = require('../../modules/validator/validationSchemas');

const TENANTS = 'tenants';

const router = new Router({
  prefix: '/:unitId/invitations'
});

router.post(`/${TENANTS}`, auth.asRole([USER_ROLES.LANDLORD]), async (ctx) => {
  await validator.customValidation(ctx.params, { unitId: { type: 'string', optional: false, empty: false } });
  await validator.customValidation(ctx.request.body, tenantInvitationSchema);
  const { user, user: { landLord } } = ctx.state;

  const unit = await UnitController.getUnit({ unitId: ctx.params.unitId, landLord });

  const tenant = ctx.request.body;
  const { invitation, email } = await UnitInvitationController.addTenant({ tenant, unit, user });

  return ctx.created({ data: invitation, meta: email });
});

router.post(`/${TENANTS}/accept`, auth.asInvitation, async (ctx) => {
  const { invitation } = ctx.state;
  const data = await UnitInvitationController.acceptInvitation(invitation);

  return ctx.accepted({ data });
});

router.delete(`/${TENANTS}/cancel`, auth.asInvitation, async (ctx) => {
  const { invitation } = ctx.state;

  await UnitInvitationController.cancelInvitation(invitation);

  return ctx.noContent();
});

module.exports = router;
