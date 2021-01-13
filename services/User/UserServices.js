/* eslint-disable no-console */
const bcrypt = require('bcrypt');

const jwt = require('../../utils/jwt');
const exceptions = require('../../modules/exceptions/index');
const { generateResetToken } = require('../../utils/helpers');
const { mailerService } = require('../Mailer');
const {
  User, UserToken, ResetToken
} = require('../../data/models');

exports.login = async (params) => {
  const { email, password } = params;

  const user = await User.findOne({ where: { email } });
  const validatedUser = user ? user.validatePassword(password) : false;

  if (user && validatedUser) {
    const token = await jwt.generate({
      data: { _id: user.id, firstName: user.firstName, role: user.role }
    });

    const userToken = await UserToken.create({
      userId: user.id,
      token
    }, { returning: true, raw: true });

    return {
      data: {
        user,
        token: userToken.token,
        type: user.role
      }
    };
  }
  throw new exceptions.InvalidUserCredentials({ message: 'Invalid User Credentials' });
};


exports.logOut = async (user, token) => {
  console.log('UserService logOut');
  await UserToken.destroy({
    where: {
      userId: user.id,
      token
    }
  });
  return {
    status: 401
  };
};


exports.forgotPassword = async (params) => {
  console.log('UserService forgotPassword');
  const { email } = params;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase()
    },
    raw: true
  });

  if (!user) throw new exceptions.InvalidUserInput({ message: 'Incorrect Email' });

  const resetToken = await generateResetToken();

  await ResetToken.upsert({ resetToken, userId: user.id });

  mailerService.sendForgotPasswordEmail(email, resetToken, user);

  return { };
};

exports.resetPassword = async (user, params) => {
  const { password, resetToken } = params;
  const hashedPassword = await bcrypt.hashSync(password.trim(), 10);

  const updated = await User.update(
    { password: hashedPassword },
    {
      where: { id: user.id },
      returning: true,
      raw: true
    },
  );

  if (updated[0]) {
    await ResetToken.destroy({
      where: { userId: user.id, resetToken }
    });
    return { };
  }
  throw new exceptions.SomethingWentWrong({ message: 'SomeThing went Wrong ' });
};

exports.changePassword = async (user, params) => {
  const { password, oldPassword } = params;
  const existingUser = await User.findOne({
    where: {
      id: user.id
    }
  });

  const validatedPassword = existingUser.validatePassword(oldPassword) || false;

  if (!validatedPassword) throw new exceptions.InvalidUserCredentials({ message: 'Invalid Password' });

  const hashedPassword = await bcrypt.hashSync(password.trim(), 10);

  const changed = await User.update({ password: hashedPassword }, {
    where: {
      id: user.id
    }
  });

  if (!changed || !changed.length || !changed[0]) {
    throw new exceptions.SomethingWentWrong({ message: 'Password Was not changed' });
  }

  return {
    meta: { }
  };
};
