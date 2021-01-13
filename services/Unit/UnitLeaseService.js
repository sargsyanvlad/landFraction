const { Lease, sequelize } = require('../../data/models');

/**
   * Abstract Class UnitLeaseService
   */
class UnitLeaseService {
  /**
   * static function createLease
   * crate lease and update unit's leaseId
   * @param {Sequelize.Model} unit - unit instance
   * @param {Object} params - leaseBaseSchema
   * @returns {Promise<Any>} - Promise
   */
  static async createLease(unit, params) {
    return sequelize.transaction(async (transaction) => {
      const lease = await Lease.create({ ...params, unitId: unit.id }, { transaction });
      await unit.update({ leaseId: lease.id }, { transaction });
      return lease;
    });
  }

  /**
   * static function updateLease
   * @param {Sequelize.Model} lease - lease instance
   * @param {Object} params - leaseUpdateSchema
   * @returns {Promise<Any>} - Promise
   */
  static async updateLease(lease, params) {
    return lease.update(params);
  }

  /**
   * get unitLease by id
   * @param {String} unitId - unitId
   * @returns {Promise<Any>} - Promise
   */
  static async getUnitLease(unitId) {
    return Lease.findOne({
      where: { unitId }
    });
  }
}

module.exports = UnitLeaseService;
