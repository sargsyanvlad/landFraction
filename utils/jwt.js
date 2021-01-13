const jwt = require('jsonwebtoken');
const config = require('../config');

const generate = async ({ data }) => jwt.sign(data, config.AUTHORIZATION_TOKEN_SECRET, { expiresIn: '7d' });

module.exports = {
  generate
};
