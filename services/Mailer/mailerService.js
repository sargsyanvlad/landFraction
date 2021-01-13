/* eslint-disable no-console */
const handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require('nodemailer-promise');
const appRootPath = require('app-root-path');
const exceptions = require('../../modules/exceptions');

const mailer = nodemailer.config({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL || 'brainstormtechtest@gmail.com',
    pass: process.env.EMAILPASS || 'P12345678'
  }
});

exports.sendForgotPasswordEmail = async (toEmail, resetCode, user) => {
  try {
    const htmlTemplate = fs.readFileSync(`${appRootPath.path}/utils/templates/forgotPassword/forgotPassword.html`, 'utf8');

    const mailTemplate = handlebars.compile(htmlTemplate);
    const mailOptions = {
      from: process.env.EMAIL || 'brainstormtechtest@gmail.com',
      to: toEmail,
      subject: 'Password Reset',
      html: mailTemplate({ reseturl: `http://54.145.229.75:4000/${user.role.toLowerCase()}s/resetPassword?token=${resetCode}` })
    };
    mailer(mailOptions);
  } catch (err) {
    console.error({ sendForgotPasswordMail: err });
    throw new exceptions.SomethingWentWrong('Cant Send Email');
  }
};
