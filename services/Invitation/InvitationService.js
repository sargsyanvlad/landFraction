const { Invitation } = require('../../data/models');
const { INVITATION_TYPES, INVITATION_STATUSES } = require('../../utils/constants');

const { findInvitationMeta, generatInvitationToken } = require('../../utils/helpers');

class InvitationService {
  /**
  * @param {String} token - token
  * @returns {Sequelize.Model} -
  */
  static async getAcceptedInvitation(token) {
    return Invitation.findOne({
      token,
      status: INVITATION_STATUSES.ACCEPTED
    });
  }

  /**
   * @param {String} inviterId invitation id
   * @param {String} type invitation type name
   * @param {Object} meta meta object according to invitation type meta schema
   * @returns {Promise<Any>} resolve is instanceof Sequelize.Model
   */
  static async getInvitation(inviterId, type, meta) {
    const typeId = INVITATION_TYPES[type].KEY;
    const META_JSON = findInvitationMeta(type, meta);

    return Invitation.findOne({
      where: {
        inviterId,
        typeId,
        meta_data: META_JSON
      }
    });
  }

  /**
   * createInvitation
   * @param {String} inviterId invitation id
   * @param {String} type invitation type name
   * @param {Object} meta meta object according to invitation type meta schema
   * @returns {Promise<Any>} resolve is instanceof Sequelize.Model
   */
  static async createInvitation(inviterId, type, meta) {
    const typeId = INVITATION_TYPES[type].KEY;
    const META_JSON = findInvitationMeta(type, meta);

    /** this is not a valid token, encrypton is not happening */
    const token = generatInvitationToken();

    return Invitation.create({
      typeId, inviterId, token, meta_data: META_JSON, status: INVITATION_STATUSES.PENDING
    });
  }

  /**
   * delete Invitation
   * @param {Sequelize.Model} invitation -  invitation instance
   * @returns {Promise<Any>} resolve is instanceof Sequelize.Model
   */
  static async deleteInvitation(invitation) {
    return invitation.update({ status: INVITATION_STATUSES.CANCELED });
  }

  /**
   * update Invitation Token
   * generate new token, set new status PENDING
   * @param {Sequelize.Model} invitation - instance of invitation
   * @returns {Promise<Any>} resolve is instanceof Sequelize.Model
   */
  static async resetInvitationToken(invitation) {
    const token = generatInvitationToken();

    return invitation.update({ token, status: INVITATION_STATUSES.PENDING });
  }

  /**
   * @param {String} token - token
   * @returns {Promise<Any>} - resolves Sequelize.Model
   */
  static async getInvitationByToken(token) {
    return Invitation.findOne({ where: { token } });
  }

  /**
   * static async function setInvitationToAccepted
   * set invitation status to accepted
   * @param {Sequelize.Model} invitation - invitaiton instance
   * @returns {Promise<Any>} - resolved value is accepted invitation
   */
  static async setInvitationToAccepted(invitation) {
    return invitation.update({ status: INVITATION_STATUSES.ACCEPTED });
  }
}

module.exports = InvitationService;
