/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { LEASE: { RELATION } } = require('../lcp/resources');
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
      startDate: {
        required: true,
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      monthlyRent: {
        type: Sequelize.DOUBLE
      },
      deposit: {
        required: true,
        allowNull: false,
        type: Sequelize.DOUBLE
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
