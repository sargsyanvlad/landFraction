const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define(
    'UserToken',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUIDV4
      },
      token: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      schema: FRACTION_CORE
    },
  );
  return UserToken;
};
