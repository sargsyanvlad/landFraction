/** Sequelize Migration's documentation
 * @see https://sequelize.org/master/manual/migrations.html
 * */

const { EMAIL_LOGS: { RELATION }, EMAIL_TYPES } = require('../lcp/resources');
const { FRACTION_LOGS, FRACTION_CORE } = require('../lcp/schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(RELATION, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recieverEmail: {
        required: true,
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      senderEmail: {
        required: true,
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      typeId: {
        required: true,
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: EMAIL_TYPES.RELATION,
            schema: FRACTION_CORE
          },
          key: 'id'
        }
      },
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
    }, { schema: FRACTION_LOGS });
  },

  async down(queryInterface) {
    return queryInterface.dropTable({
      tableName: RELATION,
      schema: FRACTION_LOGS
    });
  }
};
