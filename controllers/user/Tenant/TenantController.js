/* eslint-disable no-console */
const TenantServices = require('../../../services/Tenant/TenantServices.js');
// const { INVITATION_STATUSES } = require('../../../utils//constants.js');
const exceptions = require('../../../modules//exceptions/');

/**
 * Class TenantController
 */
class TenantController {
  static async signUp(params, invitation) {
    if (!invitation) throw new exceptions.BadRequest({ message: 'INVITATION_IS_NOT_ACCEPTED' });

    const { user, token: accessToken, type } = await TenantServices.signUp(params);
    return {
      data: user,
      meta: {
        access_token: accessToken,
        type
      }
    };
  }

  static async getMyTenants(user, queryParams) {
    try {
      return await TenantServices.getMyTenants(user, queryParams);
    } catch (err) {
      throw err;
    }
  }

  static async getAllTenants(user, queryParams) {
    try {
      return await TenantServices.getAllTenants(user, queryParams);
    } catch (err) {
      throw err;
    }
  }

  static async getTenantById(user, params) {
    try {
      return await TenantServices.getTenantById(user, params);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {String} email - email of tenant
   * @returns {Promise<Any>} - Promise
   */
  static async getTenantByEmail({ email }) {
    const { dataValues } = await TenantServices.getTenantByEmail(email);

    return dataValues;
  }


  static async onBoard(user, { dob, phone }) {
    const { dataValues } = await TenantServices.updateForOnboarding(user.tenant, { dob, phone });

    return dataValues;
  }
}

module.exports = TenantController;
