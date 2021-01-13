/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

const { FRACTION_CORE } = require('../lcp/schemas');
const { TENANT, USER } = require('../lcp/resources');

module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define(
    TENANT.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      dob: {
        type: DataTypes.DATE
      },
      onBoardedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null
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

  Tenant.associate = (models) => {
    Tenant.belongsTo(models.User, {
      as: USER.ALIAS.SINGULAR,
      foreignKey: 'userId'
    });

    Tenant.belongsToMany(models.Unit, {
      as: {
        singular: TENANT.ALIAS.SINGULAR,
        plural: TENANT.ALIAS.PLURAL
      },
      foreignKey: 'tenantId',
      through: models.UnitTenant
    });
  };

  return Tenant;
};
