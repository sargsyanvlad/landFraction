const UnitLeaseService = require('../../services/Unit/UnitLeaseService');
const UnitTenantService = require('../../services/Unit/UnitTenantService');
const UnitInvitationService = require('../../services/Invitation/InvitationService');
const TenantService = require('../../services/Tenant/TenantServices');

const EmailService = require('../../services/Email/MailerService');

// const jwt = require('../../utils/jwt');

const { UnavailableForLegalReasons, ResourceDuplicationError } = require('../../modules/exceptions');
const { UNIT_HAS_NOT_LEASE, TENANT_ALREADY_CONNECTED_TO_UNIT } = require('../../utils/errorDetails');

const { INVITATION_TYPES: { TENANT_INVITATION_TO_UNIT } } = require('../../utils/constants');

/**
 * Class UnitInvitationController
 */
class UnitInvitationController {
  /**
 * static function delete
 * @param {Object} tenant - tenantInvitationSchema
 * @param {String} unit - unit
 * @param {Sequelize.Model} user - user, ctx.state.user for ex. for whom this function should create invitation
 * @returns {Promise<Any> | unit} - promise
 */
  static async addTenant({ tenant: { email, fullName }, unit, user }) {
    const TYPE = TENANT_INVITATION_TO_UNIT.NAME;
    const unitId = unit.dataValues.id;
    /* fail case 1, when unit hasn't lease */
    const lease = await UnitLeaseService.getUnitLease(unitId);
    if (!lease) throw new UnavailableForLegalReasons({ message: UNIT_HAS_NOT_LEASE });

    /* fail case 2, when tenant already connected to unit */
    const unitTenant = await UnitTenantService.getUnitCurrentTenantByEmail(email, unitId);
    if (unitTenant) throw new ResourceDuplicationError({ message: TENANT_ALREADY_CONNECTED_TO_UNIT });

    /* third party case 1, when invitation already created for specified user and reciever and type then just update that invitation */
    const meta = {
      email, fullName, address: unit.property.address, unitId
    };
    let invitation = await UnitInvitationService.getInvitation(user.id, TYPE, meta);

    if (invitation) {
      invitation = await UnitInvitationService.resetInvitationToken(invitation);
    } else {
      /* success case 1 create invitation */
      invitation = await UnitInvitationService.createInvitation(user.id, TYPE, meta);
    }

    /* success case 2 send notification with type email and log if it will be fail */
    const content = { ...invitation.meta_data, reciever: invitation.meta_data.email, token: invitation.token };
    const result = await EmailService.sendEmail(TYPE, content, true);

    return {
      invitation: invitation.dataValues,
      email: result
    };
  }

  /**
   * @param {Sequelize.Model} invitation - invitation
   * @returns {Promise<Any>} - resolved value is null
   */
  static async cancelInvitation(invitation) {
    /* maybe will send message */
    return UnitInvitationService.deleteInvitation(invitation);
  }

  /**
   * @param {Sequelzie.Model} invitation - invitaion instance
   * @returns {Promise<Any>} - resolved value is ()
   */
  static async acceptInvitation(invitation) {
    const updated = await UnitInvitationService.setInvitationToAccepted(invitation);
    const { meta_data: { email } } = updated;
    // TO DO logic, if invitated email exists in system, and send resposne with corresponding meta data
    await TenantService.getTenantByEmail(email);
    // create unittenant if exists
    // const unitTenant = await UnitTenantService.changeTenantsUnit(unitId, tenant.id);

    return updated;
  }
}

module.exports = UnitInvitationController;
