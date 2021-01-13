/* eslint-disable no-return-assign */
const { PropertyService, UnitService } = require('../../services');

const { ResourceNotFoundError } = require('../../modules/exceptions');
const { PROPERTY_NOT_FOUND, UNIT_NOT_FOUND } = require('../../utils/errorDetails');

/**
 * Class PropertyController
 */
class UnitController {
  /**
 * static function create
 * @param {Array<Object>} units - property's name
 * @param {String} propertyId - id of the property
 * @param {Sequelize.Model} landLord - user.landLord, for ex. for whom this function should create unit
 * @returns {Promise<Any>} - Promise
 */
  static async create({
    units, landLord, propertyId
  }) {
    const property = await PropertyService.getLandLordsPropertyById(propertyId, landLord.id);
    if (!property) throw new ResourceNotFoundError({ message: PROPERTY_NOT_FOUND });

    // eslint-disable-next-line no-return-assign
    // eslint-disable-next-line no-param-reassign
    units.forEach(item => item.propertyId = property.id);

    return UnitService.addNewUnits(units, property);
  }

  /**
 * static function create
 *  call addNewProperty service function for the landLord
 * @param {String} params - property's name
 * @param {Number} id - property's id
 * @param {Sequelize.Model} landLord - user, for ex. for whom this function should create property
 * @returns {Promise<Any>} - Promise
 */
  static async createOrUpdate(params, id, landLord) {
    const property = await UnitService.getLandLordsPropertyById(id, landLord.id);
    if (!property) throw new ResourceNotFoundError({ message: PROPERTY_NOT_FOUND });

    return UnitService.createOrUpdate(params, property);
  }

  /**
 * static function delete
 * @param {String} unitId - unit id
 * @param {Sequelize.Model} landLord - user, for ex. for whom this function should create property
 * @returns {Null} - null
 */
  static async getUnit({ unitId, landLord }) {
    const unit = await UnitService.getLandLordsUnitById(unitId, landLord.id);
    if (!unit) throw new ResourceNotFoundError({ message: UNIT_NOT_FOUND });

    return unit;
  }

  /**
 * static function delete
 * @param {String} id - unit id
 * @param {Sequelize.Model} landLord - user, for ex. for whom this function should create property
 * @param {Object} params - updated params
 * @returns {Promise<Any> | unit} - promise
 */
  static async updateUnit({ id, landLord, params }) {
    const unit = await UnitService.getLandLordsUnitById(id, landLord.id);
    if (!unit) throw new ResourceNotFoundError({ message: UNIT_NOT_FOUND });
    if (!params) return unit;

    return UnitService.updateUnit(unit, params);
  }

  /**
 * static function delete
 * @param {String} unitId - unit id
 * @param {String} propertyId - unit id
 * @param {Sequelize.Model} landLord - user, for ex. for whom this function should create property
 * @returns {Null} - null
 */
  static async delete({ unitId, landLord }) {
    const unit = await UnitService.getLandLordsUnitById(unitId, landLord.id);
    if (!unit) throw new ResourceNotFoundError({ message: UNIT_NOT_FOUND });

    await unit.destroy();

    return null;
  }
}

module.exports = UnitController;
