/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { TOKEN_TYPE: { RELATION } } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');
const { TOKEN_TYPES } = require('../../utils/constants');

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
      }, // TO DO meta_schema in higher releases
      meta: {
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

    await queryInterface.addConstraint(`${FRACTION_CORE}.${RELATION}`,
      ['name'],
      {
        type: 'unique',
        name: 'unique_token-type-name'
      });
    await queryInterface.bulkInsert(
      {
        tableName: RELATION,
        schema: FRACTION_CORE
      },
      Object.entries(TOKEN_TYPES).map(([value, key]) => ({
        id: key, name: value, createdAt: new Date(), updatedAt: new Date()
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
