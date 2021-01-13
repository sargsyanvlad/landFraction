/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const {
  INVITATION: { RELATION },
  INVITATION_TYPES, USER
} = require('../lcp/resources');

const { FRACTION_CORE } = require('../lcp/schemas');

// const { INVITATION_STATUSES } = require('../../utils/constants');

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
      typeId: {
        required: true,
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: INVITATION_TYPES.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      },
      inviterId: {
        required: true,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: USER.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      },
      token: {
        required: true,
        allowNull: true,
        type: Sequelize.TEXT('tiny')
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      meta_data: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { schema: FRACTION_CORE });
  },

  async down(queryInterface) {
    return queryInterface.dropTable({
      tableName: RELATION,
      schema: FRACTION_CORE
    });
  }
};
