/* eslint-disable no-param-reassign */
const { UnitLeaseService } = require('../../services');

const {
  ResourceDuplicationError,
  InvalidUserInput,
  ResourceNotFoundError
} = require('../../modules/exceptions');

const {
  UNIT_HAS_NOT_LEASE,
  UNIT_ALREADY_HAS_LEASE,
  INVALID_START_END_DATES_INTERVAL
} = require('../../utils/errorDetails');

const { validateDatesInterval } = require('../../utils/helpers');

/**
 * Class UnitLeaseController
 */
class UnitLeaseController {
  /**
 *
 * @param {Sequelize.Model} unit - unit instance
 * @param {Object} params - leaseBaseSchema
 * @returns {Promise<Any>} promise
 */
  static async createUnitLease(unit, params) {
    const lease = await UnitLeaseService.getUnitLease(unit.id);
    if (lease) throw new ResourceDuplicationError({ message: UNIT_ALREADY_HAS_LEASE });

    const validDates = validateDatesInterval(params);
    if (!validDates) throw new InvalidUserInput({ message: INVALID_START_END_DATES_INTERVAL });
    const { dataValues } = await UnitLeaseService.createLease(unit, {
      ...params,
      startDate: new Date(params.startDate),
      endDate: params.endDate ? new Date(params.endDate) : null
    });

    return dataValues;
  }

  /**
 *
 * @param {Sequelize.Model} unit - unit instance
 * @param {Object} params - leaseUpdateSchema
 * @returns {Promise<Any>} Promise
 */
  static async updateUnitLease(unit, params) {
    const lease = await UnitLeaseService.getUnitLease(unit.id);
    if (!lease) throw new ResourceNotFoundError({ message: UNIT_HAS_NOT_LEASE });

    const validDates = validateDatesInterval(params);
    if (!validDates) throw new InvalidUserInput({ message: INVALID_START_END_DATES_INTERVAL });

    if (params.startDate) params.startDate = new Date(params.startDate);
    if (params.endDate) params.endDate = new Date(params.endDate);

    const { dataValues } = await UnitLeaseService.updateLease(lease, params);
    // TO DO update document, it is required field for this action , only for edit action

    return dataValues;
  }
}

module.exports = UnitLeaseController;
