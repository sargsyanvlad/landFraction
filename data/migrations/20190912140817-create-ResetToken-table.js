const { FRACTION_CORE } = require('../lcp/schemas');
const { RESETTOKEN: { RELATION } } = require('../lcp/resources');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(RELATION, {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        unique: true,
        references: {
          model: {
            tableName: 'User',
            schema: FRACTION_CORE
          },
          key: 'id'
        },
        onDelete: 'cascade'
      },
      resetToken: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
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
