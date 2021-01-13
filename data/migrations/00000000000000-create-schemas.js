const { FRACTION_CORE, FRACTION_LOGS } = require('../lcp/schemas');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createSchema(FRACTION_CORE);
    await queryInterface.createSchema(FRACTION_LOGS);
  },

  async down(queryInterface) {
    await queryInterface.dropSchema(FRACTION_CORE);
    await queryInterface.dropSchema(FRACTION_LOGS);
  }
};
