/* eslint-disable no-unused-vars */
// const { MailerLog } = require('../../data/models');
const Mailer = require('../../modules/mailer');

const { findEmailParams } = require('../../utils/helpers');

/**
 * Abstract Class MailerService
 */
class MailerService {
  /**
* @param {Number} type - email type
* @param {Object} content - content corresponded to email type meta_schema
* @param {Boolean<Any>} logging - log to emailLogs table, and in higher relaeses write it to elasticsearch
* @returns {Object} -
*/
  static async sendEmail(type, content, logging = false) {
    // const { NODE_ENV } = process.env;

    const params = findEmailParams(type, content);
    const result = {};

    try {
      await Mailer.sendEmail(params);
      result.emailSended = true;
    } catch (e) {
      result.emailSended = false;
      /*
      if (logging) {
        if (NODE_ENV === 'production') {
          // create log for cron
          MailerLog.create({
            type, recieverEmail, senderEmail, content
          }).then().catch();
        }
      } */
    }

    return result;
  }
}

module.exports = MailerService;
