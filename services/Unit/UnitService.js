const {
  Unit,
  Property
} = require('../../data/models');

const { PROPERTY } = require('../../data/lcp/resources');

/**
 * Abstract Class UnitService
 */
class UnitService {
  /**
 * static function addNewUnits
 *  create multiple units
 * @param {Array<Object>} units - array of units
 * @returns {Promise<Any>} - Promise
 */
  static async addNewUnits(units) {
    return Unit.bulkCreate(units);
  }

  /**
 * get unit by id
 * @param {Number} id - id of the unit
 * @returns {Promise<Any>} - Promise
 */
  static async getUnitById(id) {
    return UnitService.findByPk(id);
  }

  /**
 * get LandLords UnitBy Id
 * @param {String} id - id of the unit
 * @param {String} landLordId - id of landLord
 * @returns {Promise<Any>} - Promise
 */
  static async getLandLordsUnitById(id, landLordId) {
    return Unit.findOne({
      where: { id },
      attributes: { exclude: ['propertyId'] },
      include: [
        {
          required: true,
          model: Property,
          as: PROPERTY.ALIAS.SINGULAR,
          where: { landLordId },
          attributes: ['id', 'address']
        }
      ]
    });
  }

  /**
 * @param {Sequelize.Model} unit - updatable unit
 * @param {Object} params - updated fields
 * @returns {Promise<Any>} - any promise
 */
  static async updateUnit(unit, params) {
    return unit.update(params);
  }
}

module.exports = UnitService;
