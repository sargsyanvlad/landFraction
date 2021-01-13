const moment = require('moment');
const crypto = require('crypto');

const { EMAIL_TEMPLATES } = require('../public/constants');
const { INVITATION_TYPES } = require('../utils/constants');

exports.getDate = () => {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

exports.getDateDiff = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  const diff = moment.duration(end.diff(start));
  return diff.asYears();
};


exports.generateResetToken = async ({ stringBase = 'hex', byteLength = 35 } = {}) => new Promise((resolve, reject) => {
  crypto.randomBytes(byteLength, (err, buffer) => {
    if (err) {
      reject(err);
    } else {
      resolve(buffer.toString(stringBase));
    }
  });
});

/**
 * find params for the specific typed template
 * @param {String} type - email type
 * @param {Object} content - email content
 * @returns {Object} params
 */
exports.findEmailParams = (type, content) => {
  const TEMPLATE_CONFIG = EMAIL_TEMPLATES[type];
  const template = TEMPLATE_CONFIG.TEMPLATE;
  const subject = TEMPLATE_CONFIG.SUBJECT;
  const schema = TEMPLATE_CONFIG.CONTENT_SCHEMA;
  let from = TEMPLATE_CONFIG.FROM;
  const params = {};

  if (!TEMPLATE_CONFIG) throw new Error('Unsupported email type');
  if (!from) from = content.sender;

  schema.forEach((item) => {
    if (!content[item]) throw new Error(`Content has not required field "${item}"`);
    params[item] = content[item];
  });

  return {
    type,
    from,
    to: params.reciever,
    subject,
    template,
    params
  };
};

/**
 * @param {String} endDate - endDate
 * @param {String} startDate - startDate
 * @returns {Boolean<Any>} -
 */
exports.validateDatesInterval = ({ endDate, startDate }) => {
  const now = (new Date()).getTime();

  if (!endDate && startDate) return true;
  if (!endDate && !startDate) return true;
  if (!startDate && endDate) return (new Date(endDate)).getTime() > now;

  const end = (new Date(endDate)).getTime();
  const start = (new Date(startDate)).getTime();

  return end > start && end > now;
};

/**
  * Generates invitation token
  * @param {Number} length - length of the token
  * @returns {String} - invitation token
  */
exports.generatInvitationToken = (length = 16) => crypto.randomBytes(length).toString('hex');

/**
 * find params for the specific type's invitation
 * @param {String} type - invitation type
 * @param {Object} meta - meta object according to invitation type's meta schema
 * @returns {Object | Null} params
 */
exports.findInvitationMeta = (type, meta) => {
  const schema = INVITATION_TYPES[type].META_SCHEMA;
  const params = {};

  if (!schema.length) return null;

  schema.forEach((item) => {
    if (!meta[item]) throw new Error(`Content has not required field "${item}"`);
    params[item] = meta[item];
  });

  return params;
};
