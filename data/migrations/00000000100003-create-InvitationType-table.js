/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { INVITATION_TYPES: { RELATION } } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');
const { INVITATION_TYPES } = require('../../utils/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(RELATION, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        required: true,
        type: Sequelize.STRING(30)
      },
      meta_schema: {
        type: Sequelize.ARRAY(Sequelize.STRING)
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
      ['name'],
      {
        type: 'unique',
        name: 'unique_invitation-type-name'
      });
    await queryInterface.bulkInsert(
      {
        tableName: RELATION,
        schema: FRACTION_CORE
      },
      Object.entries(INVITATION_TYPES).map(([value]) => ({
        id: INVITATION_TYPES[value].KEY,
        name: INVITATION_TYPES[value].NAME,
        meta_schema: INVITATION_TYPES[value].META_SCHEMA,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  async down(queryInterface) {
    return queryInterface.dropTable({
      tableName: RELATION,
      schema: FRACTION_CORE
    });
  }
};
