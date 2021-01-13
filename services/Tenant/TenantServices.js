/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('../../utils/jwt.js');

const {
  Tenant, Unit, User, Sequelize, UserToken, sequelize
} = require('../../data/models/index');

const { USER } = require('../../data/lcp/resources');

const { PAGINATION } = require('../../utils/constants');
const exceptions = require('../../modules/exceptions/');

const { Op } = Sequelize;

exports.getMyTenants = async (user, queryParams) => {
  const { propertyId } = queryParams.filter;
  const where = {
    userId: user.id
  };

  if (propertyId) {
    where.propertyId = propertyId;
  }

  const users = await User.findAndCountAll({
    where: {
      [Op.or]: {
        firstName: { [Op.iLike]: `%${queryParams.search}%` },
        lastName: { [Op.iLike]: `%${queryParams.search}%` },
        email: { [Op.iLike]: `%${queryParams.search}%` }
      }
    },
    include: [
      {
        required: true,
        model: Unit,
        as: 'unit',
        where,
        through: { attributes: [] }
      },
      {
        required: true,
        model: Tenant,
        as: 'tenant',
        attributes: { exclude: ['userId'] }
      }
    ],
    attributes: { exclude: ['password', 'role', 'type'] },
    offset: queryParams.offset,
    order: [
      [Sequelize.literal(`"unit->TenantUnits"."${queryParams.order.key}" ${queryParams.order.bool ? PAGINATION.DESC : PAGINATION.ASC} LIMIT ${queryParams.limit}`)]
    ]
  });

  return {
    data: { users }
  };
};

exports.getAllTenants = async (user, queryParams) => {
  const users = await User.findAndCountAll({
    where: {
      [Op.or]: {
        firstName: { [Op.iLike]: `%${queryParams.search}%` },
        lastName: { [Op.iLike]: `%${queryParams.search}%` },
        email: { [Op.iLike]: `%${queryParams.search}%` }
      }
    },
    include: [
      {
        required: true,
        model: Unit,
        as: 'unit',
        through: { attributes: [] }
      },
      {
        required: true,
        model: Tenant,
        as: 'tenant',
        attributes: { exclude: ['userId'] }
      }
    ],
    attributes: { exclude: ['password', 'role', 'type'] },
    offset: queryParams.offset,
    order: [
      [Sequelize.literal(`"unit->TenantUnits"."${queryParams.order.key}" ${queryParams.order.bool ? PAGINATION.DESC : PAGINATION.ASC} LIMIT ${queryParams.limit}`)]
    ]
  });

  return {
    data: { users }
  };
};

exports.getTenantById = async (user, params) => {
  const { id } = params;
  const tenant = await User.findOne({
    where: {
      role: 'Tenant'
    },
    include: [
      {
        required: true,
        model: Unit,
        where: { userId: user.id },
        as: 'unit',
        through: { attributes: [] }
      },
      {
        required: true,
        model: Tenant,
        where: { id },
        as: 'tenant',
        attributes: ['birthDate', 'onBoarded']
      }
    ],
    attributes: ['email', 'firstName', 'lastName', 'avatar']
  });

  return {
    data: { tenant }
  };
};

/**
 * async function getTenantByEmail
 * @param {String} email - email
 * @returns {Promise<Any>} - Promise
 */
exports.getTenantByEmail = async email => Tenant.findOne({
  include: [
    {
      model: User,
      as: USER.ALIAS.SINGULAR,
      required: true,
      where: { email }
    }
  ]
});

exports.signUp = async (params) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      email, firstName, lastName, password
    } = params;

    const existingEmail = await User.findOne({ where: { email }, raw: true });

    if (existingEmail) {
      throw new exceptions.InvalidUserInput({ message: 'Email Already Exists' });
    }

    const user = await User.create({
      role: 'Tenant',
      email,
      firstName,
      lastName,
      type: 'owner',
      password: bcrypt.hashSync(password.trim(), 10)
    }, { returning: true, raw: true, transaction });

    user.tenant = await Tenant.create({
      userId: user.id
    }, { returning: true, raw: true, transaction });

    const token = await jwt.generate({
      data: { _id: user.id, firstName, role: 'LandLord' }
    });

    await UserToken.create({ token, userId: user.id }, { transaction });

    await transaction.commit();

    return {
      token,
      user,
      type: 'tenant'
    };
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

exports.updateForOnboarding = async (tenant, params) => {
  const onBoardedAt = Date.now();
  return tenant.update({
    ...params,
    onBoardedAt
  });
};
