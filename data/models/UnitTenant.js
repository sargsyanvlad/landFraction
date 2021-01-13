/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

const { UNIT_TENANT: { RELATION }, TENANT } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

// const { UNIT_NAME_ALREADY_EXISTS } = require('../../utils/errorDetails');

module.exports = (sequelize, DataTypes) => {
  const UnitTenant = sequelize.define(
    RELATION,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      current: {
        allowNull: false,
        required: true,
        type: DataTypes.BOOLEAN
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

  UnitTenant.associate = (models) => {
    UnitTenant.belongsTo(models.Tenant, {
      as: TENANT.ALIAS.SINGULAR,
      foreignKey: 'tenantId'
    });
  };

  return UnitTenant;
};
