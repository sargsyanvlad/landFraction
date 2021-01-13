/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { TENANT, UNIT, UNIT_TENANT: { RELATION } } = require('../lcp/resources');
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
      tenantId: {
        required: true,
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'SET NULL',
        references: {
          model: {
            tableName: TENANT.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      },
      unitId: {
        required: true,
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'SET NULL',
        references: {
          model: {
            tableName: UNIT.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      },
      current: {
        allowNull: false,
        required: true,
        type: Sequelize.BOOLEAN
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
