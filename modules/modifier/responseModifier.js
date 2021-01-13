const _set = require('lodash/set');

/**
 * Middleware for modify response
 * you can set response body for the following ways:
 *    1. ctx.ok(users)
 *    2. ctx.ok({ data: users })
 *    3. ctx.ok({ data: users, meta: { refreshToken } })
 *    4. ctx.ok({ meta: { refreshToken } })
 * In any case the actual response will be { data: {}, meta: {} } except for the
 *   following conditions:
 *    - when status code > = 204 and status code < 400 at the same time or status code = 405
 *    in this cases actual response will be undefined
 * @param {Koa.Context} ctx - koa context
 * @returns {undefined} undefined
 */
module.exports = (ctx) => {
  if ((ctx.status >= 204 && ctx.status < 400) || ctx.status === 405 || !ctx.body) return;

  const result = ctx.body;
  const response = {};
  const pagination = {};
  if (Array.isArray(result.data) && result.total) {
    _set(pagination, 'limit', parseInt(ctx.request.query.limit, 10));
    // if offset not provided , it should be null,
    // but offset of s3 request is not number  so I can't parse to the request offset
    _set(pagination, 'offset', ctx.request.query.offset);
    _set(pagination, 'total', result.total);
    _set(response, 'pagination', pagination);
  }

  if (result.status) {
    _set(ctx, 'status', result.status);
    delete result.status;
  }
  if (!result.data && !result.meta) result.data = { ...result };
  if (!result.meta && result.data) result.meta = {};

  _set(response, 'data', result.data);
  _set(response, 'meta', result.meta);

  ctx.body = response;
};
