/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

const { MAILER_LOG } = require('../lcp/resources');
const { FRACTION_LOGS } = require('../lcp/schemas');

module.exports = (sequelize, DataTypes) => {
  const EmailLog = sequelize.define(
    MAILER_LOG.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      type: {
        allowNull: false,
        required: true,
        type: DataTypes.INTEGER
      },
      senderEmail: {
        type: DataTypes.STRING,
        allowNull: true
      },
      recieverEmail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.JSONB,
        allowNull: true
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
      freezeTableName: true,
      schema: FRACTION_LOGS,
      timestamps: true
    }
  );

  return EmailLog;
};
