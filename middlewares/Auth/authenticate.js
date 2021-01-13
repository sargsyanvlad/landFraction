/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle, no-console */
const jwt = require('jsonwebtoken');
const _isEmpty = require('lodash/isEmpty');
const _includes = require('lodash/includes');

const {
  User, LandLord, UserToken, Tenant, ResetToken
} = require('../../data/models');
const { LANDLORD, RESETTOKEN, TENANT } = require('../../data/lcp/resources');

const { getInvitationByToken } = require('../../services/Invitation/InvitationService');

const { AuthenticationError, AccessDeniedError } = require('../../modules/exceptions');
const errorDetails = require('../../utils/errorDetails');
const config = require('../../config');

class GlobalAuthClass {
  static async authenticate(ctx) {
    console.log(' ====> authenticate');
    const token = await GlobalAuthClass.getToken(ctx.request.headers);

    if (!token) throw new AuthenticationError({ message: 'Can\'t get Token' });

    const verified = jwt.verify(token, config.AUTHORIZATION_TOKEN_SECRET);

    if (!verified) throw new AuthenticationError({ message: 'Invalid Token' });

    const user = await User.findOne({
      where: { id: verified._id },
      raw: true
    });

    if (!user) throw new AuthenticationError({ message: errorDetails.UNAUTHORIZED });

    const existingToken = await UserToken.findOne({
      where: {
        token
      },
      raw: true
    });

    if (existingToken) {
      const { firstName, role, _id } = verified;
      return { firstName, role, _id };
    }
    throw new AuthenticationError({ message: errorDetails.UNAUTHORIZED });
  }

  /**
   * implements role based authorization
   * roles param can be  null or empty array, this means that all roles are permmited
   * roles can have value or values, this means that only value or values are permitted
   * @param {Array | Null} roles - array of permitted roles
   * @returns {Function} - koa middleware
   */
  static asRole(roles) {
    return async (ctx, next) => {
      console.log('asRole');
      const { _id, role } = await GlobalAuthClass.authenticate(ctx);

      if (!_isEmpty(roles) && !_includes(roles, role)) throw new AccessDeniedError({ message: 'Unsupported User Role' });

      const user = await User.findOne({
        where: { id: _id },
        attributes: [
          'id',
          'type',
          'role',
          'email',
          'avatar',
          'lastName',
          'firstName'
        ],
        include: [
          {
            model: Tenant,
            as: TENANT.ALIAS.SINGULAR,
            plain: true
          },
          {
            model: LandLord,
            as: LANDLORD.ALIAS.SINGULAR
          }
        ]
      });

      ctx.state = { ...ctx.state, user };
      await next();
    };
  }

  static async asResetToken(ctx, next) {
    const { resetToken } = ctx.request.body;
    const user = await User.findOne({
      include: {
        model: ResetToken,
        as: RESETTOKEN.ALIAS.SINGULAR,
        where: {
          resetToken
        },
        raw: true
      }
    });

    if (!user) throw new AuthenticationError({ message: 'Incorrect ResetToken' });
    ctx.state.user = user;
    await next();
  }

  static async getToken(headers) {
    if (!headers || !headers.authorization) {
      return null;
    }
    const parted = headers.authorization.split(' ');
    if (parted[0] === 'Bearer') {
      return parted[1];
    }
    return null;
  }

  static async asInvitation(ctx, next) {
    const { x_token } = ctx.request.headers;
    if (!x_token) throw new AuthenticationError({ message: errorDetails.X_TOKEN_REQUIRED });

    const invitation = await getInvitationByToken(x_token);
    if (!invitation) throw new AuthenticationError({ message: errorDetails.INVALID_X_TOKEN });

    ctx.state.invitation = invitation;
    await next();
  }
}

module.exports = GlobalAuthClass;
