const _set = require('lodash/set');

module.exports = (ctx, result, statusCode) => {
  console.log('====> SetResponse <====');

  _set(ctx.body, 'status', statusCode);
  ctx.body = result;
};
