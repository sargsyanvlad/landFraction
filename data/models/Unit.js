/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

const {
  UNIT: { RELATION }, PROPERTY, LEASE, TENANT
} = require('../lcp/resources');

const { FRACTION_CORE } = require('../lcp/schemas');

const { UNIT_NAME_ALREADY_EXISTS } = require('../../utils/errorDetails');

module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    RELATION,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: {
          msg: UNIT_NAME_ALREADY_EXISTS
        }
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false
      },
      area: {
        type: DataTypes.DOUBLE,
        required: true,
        allowNull: false
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

  Unit.associate = (models) => {
    Unit.belongsTo(models.Property, {
      as: PROPERTY.ALIAS.SINGULAR,
      foreignKey: 'propertyId'
    });

    Unit.hasOne(models.Lease, {
      as: LEASE.ALIAS.SINGULAR,
      foreignKey: 'unitId'
    });

    Unit.belongsToMany(models.Tenant, {
      as: TENANT.ALIAS.PLURAL,
      foreignKey: 'unitId',
      through: models.UnitTenant
    });
  };

  return Unit;
};
