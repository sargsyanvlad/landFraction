/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { LEASE_DOC: { RELATION }, LEASE } = require('../lcp/resources');
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
      leaseId: {
        required: true,
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: LEASE.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      },
      docment: {
        required: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      current: {
        required: true,
        allowNull: false,
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
