/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { USER_ROLE: { RELATION } } = require('../lcp/resources');
const { FRACTION_CORE } = require('../lcp/schemas');
const USER_ROLES = require('../lcp/user_roles');


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
        name: 'unique_role_name'
      });
    await queryInterface.bulkInsert(
      {
        tableName: RELATION,
        schema: FRACTION_CORE
      },
      Object.entries(USER_ROLES).map(item => ({
        id: item[1], name: item[0], createdAt: new Date(), updatedAt: new Date()
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
