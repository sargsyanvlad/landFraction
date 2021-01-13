const { FRACTION_CORE } = require('../lcp/schemas');
const { RESETTOKEN } = require('../lcp/resources');

module.exports = (sequelize, DataTypes) => {
  const ResetToken = sequelize.define(
    RESETTOKEN.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        unique: true
      },
      resetToken: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
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

  return ResetToken;
};
