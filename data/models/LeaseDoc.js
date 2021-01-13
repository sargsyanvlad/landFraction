/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

const { LEASE_DOC } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = (sequelize, DataTypes) => {
  const LeaseDoc = sequelize.define(
    LEASE_DOC.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      document: {
        allowNull: false,
        required: true,
        type: DataTypes.STRING
      },
      current: {
        allowNull: false,
        required: true,
        type: DataTypes.BOOLEAN
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

  /*
    LeaseDoc.associate = (models) => {
      LeaseDoc.belongsTo(models.Lease, {
        as: LEASE_DOC.ALIAS.SINGULAR,
        foreignKey: 'leaseId'
      });
    };
  */

  return LeaseDoc;
};
