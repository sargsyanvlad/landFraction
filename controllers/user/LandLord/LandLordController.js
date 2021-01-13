/* eslint-disable no-console */
const { LandLordServices } = require('../../../services');

class LandLordController {
  static async signUp(ctx) {
    try {
      const params = ctx.request.body;
      return await LandLordServices.signUp(params);
    } catch (err) {
      console.log('LandLordController Error signUp==> ', err);
      throw err;
    }
  }
}

module.exports = LandLordController;
