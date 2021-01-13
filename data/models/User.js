/* eslint-disable func-names */
const bcrypt = require('bcrypt');
const omit = require('lodash/omit');

const {
  LANDLORD, USER, RESETTOKEN, TENANT, TENANTUNITS, UNIT, INVITATION
} = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    USER.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      avatar: {
        type: DataTypes.STRING,
        required: false,
        allowNull: true
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      password: {
        type: DataTypes.STRING,
        required: true
      },
      type: {
        type: DataTypes.STRING
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(50),
        validate: {
          len: [6, 30]
        }
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
  /**  Sequelize Associations's documentation
* @see http://docs.sequelizejs.com/manual/tutorial/associations.html
* */

  User.associate = (models) => {
    User.hasOne(models.LandLord, {
      as: LANDLORD.ALIAS.SINGULAR,
      foreignKey: 'userId'
    });

    User.hasOne(models.Tenant, {
      as: TENANT.ALIAS.SINGULAR,
      foreignKey: 'userId'
    });

    User.hasOne(models.ResetToken, {
      as: RESETTOKEN.ALIAS.SINGULAR,
      foreignKey: 'userId'
    });

    User.belongsToMany(models.Unit, {
      through: TENANTUNITS.RELATION,
      as: UNIT.ALIAS.SINGULAR
    });

    User.hasMany(models.Invitation, {
      as: INVITATION.ALIAS.PLURAL,
      foreignKey: 'inviterId'
    });
  };

  User.prototype.validatePassword = function (candidate = '') {
    return bcrypt.compareSync(candidate, this.password);
  };

  User.prototype.toJSON = function () {
    const model = this.get();
    const hiddenFields = ['password'];

    return omit(model, hiddenFields);
  };

  return User;
};
