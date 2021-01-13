/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const {
  UNIT,
  LEASE
} = require('../lcp/resources');

const { FRACTION_CORE } = require('../lcp/schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: UNIT.RELATION,
        schema: FRACTION_CORE
      },
      'leaseId',
      {
        allowNull: true,
        type: Sequelize.UUID,
        onDelete: 'SET NULL',
        references: {
          model: {
            tableName: LEASE.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      }
    );

    await queryInterface.addColumn(
      {
        tableName: LEASE.RELATION,
        schema: FRACTION_CORE
      },
      'unitId',
      {
        required: true,
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: UNIT.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn({ tableName: UNIT.RELATION, schema: FRACTION_CORE }, 'leaseId');
    await queryInterface.removeColumn({ tableName: LEASE.RELATION, schema: FRACTION_CORE }, 'unitId');
  }
};
