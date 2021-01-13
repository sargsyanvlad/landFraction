/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { PROPERTY: { RELATION }, LANDLORD } = require('../lcp/resources');
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
      landLordId: {
        required: true,
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: LANDLORD.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        required: true,
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      image: {
        type: Sequelize.STRING
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

    await queryInterface.addConstraint(`${FRACTION_CORE}.${RELATION}`,
      ['name', 'landLordId'],
      {
        type: 'unique',
        name: 'unique_property_name'
      });

    await queryInterface.addConstraint(`${FRACTION_CORE}.${RELATION}`,
      ['address'],
      {
        type: 'unique',
        name: 'unique-address'
      });
  },

  async down(queryInterface) {
    return queryInterface.dropTable({
      tableName: RELATION,
      schema: FRACTION_CORE
    });
  }
};
