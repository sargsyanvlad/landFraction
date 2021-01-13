const Mailer = require('../../modules/mailer');
const Helpers = require('../../utils/helpers');

// const EmailService = require('../../services/Email/EmailService');

const { EMAIL_TYPES } = require('../../utils/constants');
/**
 * Class EmailController
 */
class EmailController {
  /**
 * static function actionSuggesttoAddProperty
 *  send suggestion email to add property
 * @param {String} reciever - reciever email
 * @param {String} sender - sender email
 * @param {string} address - address of the property
 * @param {Sequelize.Model} user - user, for ex. for whom this function should create property
 * @returns {Object<{mailSended: Boolean}>} -
 */
  static async actionSuggesttoAddProperty(reciever, sender, address) {
    const TYPE = EMAIL_TYPES.ADD_PROPERTY_SUGGESTION.NAME;
    const params = Helpers.findEmailParams(TYPE, { address, reciever, sender });
    const result = {};

    try {
      await Mailer.sendEmail(params);
      result.emailSended = true;
    } catch (e) {
      result.emailSended = false;
    }

    return result;
  }
}

module.exports = EmailController;
