/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { UNIT: { RELATION }, PROPERTY } = require('../lcp/resources');
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
      name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      },
      area: {
        type: Sequelize.DOUBLE,
        required: true,
        allowNull: false
      },
      propertyId: {
        required: true,
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: PROPERTY.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
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

    await queryInterface.addConstraint(`${FRACTION_CORE}.${RELATION}`,
      ['name', 'propertyId'],
      {
        type: 'unique',
        name: 'unique_unit_name'
      });
  },

  async down(queryInterface) {
    await queryInterface.dropTable({
      tableName: RELATION,
      schema: FRACTION_CORE
    });
  }
};
