/* eslint-disable func-names */
/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */
const omit = require('lodash/omit');

const { INVITATION, USER } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

const { INVITATION_STATUSES } = require('../../utils/constants');

module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define(
    INVITATION.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      typeId: {
        type: DataTypes.SMALLINT
      },
      token: {
        required: true,
        allowNull: true,
        type: DataTypes.TEXT('tiny')
      },
      status: {
        allowNull: false,
        required: true,
        type: DataTypes.STRING,
        defaultValue: INVITATION_STATUSES.PENDING
      },
      meta_data: {
        type: DataTypes.JSONB
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

  Invitation.associate = (models) => {
    Invitation.belongsTo(models.User, {
      as: USER.ALIAS.SINGULAR,
      foreignKey: 'inviterId'
    });
  };

  Invitation.prototype.toJSON = function () {
    const inv = this.get();

    return omit(inv, ['token']);
  };

  return Invitation;
};
