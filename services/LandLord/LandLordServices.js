/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const {
  User, LandLord, UserToken, sequelize
} = require('../../data/models');

const jwt = require('../../utils/jwt');
const exceptions = require('../../modules/exceptions/index');


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
      role: 'LandLord',
      email,
      firstName,
      lastName,
      type: 'owner',
      password: bcrypt.hashSync(password.trim(), 10)
    }, { returning: true, raw: true, transaction });

    user.landLord = await LandLord.create({
      userId: user.id
    }, { returning: true, raw: true, transaction });

    const token = await jwt.generate({
      data: { _id: user.id, firstName, role: 'LandLord' }
    });
    user.dataValues.token = token;

    await UserToken.create({ token, userId: user.id }, { transaction });

    await transaction.commit();

    return {
      data: {
        user,
        type: 'LandLord'
      }
    };
  } catch (err) {
    console.log(' LandLordServices Error signUp => ', err);
    await transaction.rollback();
    throw err;
  }
};
