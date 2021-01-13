/* eslint-disable no-console */
const { UserServices } = require('../../../services');

class UserController {
  static async login(params) {
    try {
      return await UserServices.login(params);
    } catch (err) {
      console.log('UserController Login Error ==> ', err);
      throw err;
    }
  }

  static async logOut(user, authHeader) {
    try {
      const token = authHeader.split(' ');
      return await UserServices.logOut(user, token[1]);
    } catch (err) {
      console.log('UserController Error logOut => ', err);
      throw err;
    }
  }

  static async forgotPassword(body) {
    try {
      return await UserServices.forgotPassword(body);
    } catch (err) {
      console.log('UserController Error forgotPassword => ', err);
      throw err;
    }
  }

  static async resetPassword(user, body) {
    try {
      return await UserServices.resetPassword(user, body);
    } catch (err) {
      console.log('UserController Error resetPassword => ', err);
      throw err;
    }
  }

  static async changePassword(user, body) {
    try {
      return await UserServices.changePassword(user, body);
    } catch (err) {
      console.log('UserController Error changePassword => ', err);
      throw err;
    }
  }
}

module.exports = UserController;
