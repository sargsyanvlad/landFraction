const Router = require('koa-router');

const EmailController = require('../../controllers/emails/EmailController');

const validator = require('../../modules/validator');

const { ServiceNotAvailableError } = require('../../modules/exceptions');
const { suggestionToAddPropertyRequestSchema } = require('../../modules/validator/validationSchemas');

const router = new Router({
  prefix: '/emails'
});

/**
 * suggest landlord to add property to platform
 */
router.post('/suggest-to-add-property', async (ctx) => {
  await validator.customValidation(ctx.request.body, suggestionToAddPropertyRequestSchema);
  const { reciever, sender, address } = ctx.request.body;

  const { emailSended } = await EmailController.actionSuggesttoAddProperty(reciever, sender, address);
  if (!emailSended) throw new ServiceNotAvailableError({ message: 'Try Again' });

  return ctx.accepted();
});

module.exports = router;
