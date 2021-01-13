
const { LANDLORD, PROPERTY, USER } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = (sequelize, DataTypes) => {
  const LandLord = sequelize.define(
    LANDLORD.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        required: true,
        allowNull: false,
        type: DataTypes.UUID,
        unique: true,
        references: {
          model: {
            tableName: USER.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        },
        onDelete: 'cascade'
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
    },
  );

  LandLord.associate = (models) => {
    LandLord.hasMany(models.Property, {
      as: PROPERTY.ALIAS.PLURAL,
      foreignKey: 'landLordId'
    });
    LandLord.belongsTo(models.User, {
      as: USER.ALIAS.SINGULAR,
      foreignKey: 'userId'
    });
  };

  return LandLord;
};
