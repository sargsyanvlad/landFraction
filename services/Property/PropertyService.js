const { Property, Unit, sequelize } = require('../../data/models');

/**
 * Abstract Class PropertyService
 */
class PropertyService {
  /**
 * static function addNewProperty
 *  create new property for the landLord, and inserts multiple units bulkly
 * @param {String} name - property's name
 * @param {String} image - property's image
 * @param {String} address - property's address
 * @param {Array<unitBaseSchema>} units - units array, should contains minimum 1 unit
 * @param {Sequelize.Model} landLord - landLord,for ex. for whom this function should create property
 * @returns {Promise<Any>} - Promise
 */
  static async addNewProperty({
    name, image, address, landLord, units
  }) {
    const { property } = await sequelize.transaction(async (transaction) => {
      const newProperty = await landLord.createProperty({
        name,
        image,
        address
      }, { transaction });

      units.forEach(item => item.propertyId = newProperty.get().id);
      const newUnits = await Unit.bulkCreate(units, { transaction });

      return { property: { ...newProperty.dataValues, units: newUnits } };
    });

    return property;
  }

  /**
   * @param {String} address - address
   * @returns {Promise<Any>} Promise
   */
  static async getPropertyByAddress(address) {
    return Property.findOne({
      where: {
        address
      }
    });
  }

  /**
 * get property by id
 * @param {Number} id - id of the property
 * @returns {Promise<Any>} - Promise
 */
  static async getPropertyById(id) {
    return PropertyService.findByPk(id);
  }

  /**
 * get landLord's property by id
 * @param {Number} id - id of the property
 * @param {Number} landLordId - id of the landLord
 * @returns {Promise<Any>} - Promise
 */
  static async getLandLordsPropertyById(id, landLordId) {
    return Property.findOne({
      where: {
        id,
        landLordId
      }
    });
  }

  /**
 * static function create
 *  update landLord's property
 * @param {Object} params - name, address, image
 * @param {Sequelize.Model} property - updateable property insta
 * @returns {Promise<Any>} - Promise
 */
  static async edit(params, property) {
    const { dataValues } = await property.update(params);
    return dataValues;
  }

  /**
 * static function getPropertiesByLandlordId
 * @param {String} landLordId - id of landLord
 * @returns {Promise<Any> | Object} - Promise
 */
  static async getPropertiesByLandlordId(landLordId) {
    const { rows, count } = await Property.findAndCountAll({
      where: { landLordId }
    });

    return {
      properties: rows,
      total: count
    };
  }
}

module.exports = PropertyService;
