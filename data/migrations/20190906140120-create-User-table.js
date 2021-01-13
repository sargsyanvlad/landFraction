const { USER: { RELATION } } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(RELATION, {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        default: {
          type: Sequelize.UUIDv4
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue('email', value.trim());
        }
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        set(value) {
          this.setDataValue('firstName', value.trim());
        }
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        set(value) {
          this.setDataValue('lastName', value.trim());
        }
      },
      avatar: {
        type: Sequelize.STRING,
        required: false,
        allowNull: true
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING,
        required: true
      },
      type: {
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING(50),
        validate: {
          len: [6, 30]
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, { schema: FRACTION_CORE });
  },

  async down(queryInterface) {
    await queryInterface.dropTable({
      tableName: RELATION,
      schema: FRACTION_CORE
    });
  }
};
