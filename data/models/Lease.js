/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

const { LEASE, LEASE_DOC, UNIT } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = (sequelize, DataTypes) => {
  const Lease = sequelize.define(
    LEASE.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      startDate: {
        required: true,
        allowNull: false,
        type: DataTypes.DATE
      },
      endDate: {
        allowNull: true,
        type: DataTypes.DATE
      },
      monthlyRent: {
        required: true,
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      deposit: {
        required: true,
        allowNull: false,
        type: DataTypes.DOUBLE
      }
    },
    {
      freezeTableName: true,
      schema: FRACTION_CORE,
      timestamps: true
    }
  );

  /**  Sequelize Associations's documentation
   * @see http://docs.sequelizejs.com/manual/tutorial/associations.html
   * */

  Lease.associate = (models) => {
    Lease.hasMany(models.LeaseDoc, {
      as: LEASE_DOC.ALIAS.PLURAL,
      foreignKey: 'leaseId'
    });
    Lease.hasOne(models.Unit, {
      as: UNIT.ALIAS.SINGULAR,
      foreignKey: 'leaseId'
    });
  };

  return Lease;
};
