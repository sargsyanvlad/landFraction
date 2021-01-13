const {
  Tenant, User, UnitTenant
} = require('../../data/models');

const { TENANT, USER } = require('../../data/lcp/resources');

/**
* Abstract Class UnitTenantService
  this is just a coolection of functions
*/
class UnitTenantService {
  /**
 *
* @param {String} email - email of the tenant
* @param {String} unitId - id of the unit
* @returns {Promise<Any>} - unit tenant instance or empty
*/
  static async getUnitCurrentTenantByEmail(email, unitId) {
    return UnitTenant.findOne({
      where: { unitId, current: true },
      include: [
        {
          required: true,
          model: Tenant,
          as: TENANT.ALIAS.SINGULAR,
          include: [
            {
              model: User,
              as: USER.ALIAS.SINGULAR,
              required: true,
              where: { email }
            }
          ]
        }
      ]
    });
  }
}

module.exports = UnitTenantService;
