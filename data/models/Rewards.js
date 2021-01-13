const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define(
    'Reward',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        required: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      imageUrl: {
        required: true,
        allowNull: false,
        type: DataTypes.STRING
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

  return Reward;
};
