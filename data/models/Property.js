/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

const { PROPERTY, LANDLORD, UNIT } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

const {
  PROPERTY_NAME_ALREADY_EXISTS,
  PROPERTY_ADDRESS_ALREADY_EXISTS
} = require('../../utils/errorDetails');

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    PROPERTY.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: {
          msg: PROPERTY_NAME_ALREADY_EXISTS
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: {
          msg: PROPERTY_ADDRESS_ALREADY_EXISTS
        }
      },
      image: {
        type: DataTypes.STRING
      },
      landLordId: {
        type: DataTypes.UUID,
        required: true,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: true,
      schema: FRACTION_CORE,
      freezeTableName: true
    }
  );

  /**  Sequelize Associations's documentation
   * @see http://docs.sequelizejs.com/manual/tutorial/associations.html
   * */

  Property.associate = (models) => {
    Property.belongsTo(models.LandLord, {
      as: LANDLORD.ALIAS.SINGULAR,
      foreignKey: 'landLordId'
    });
    Property.hasMany(models.Unit, {
      as: UNIT.ALIAS.PLURAL,
      foreignKey: 'propertyId'
    });
  };

  return Property;
};
